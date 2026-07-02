#!/usr/bin/env python3
"""Vessel-only Buffer posting agent for Penelope."""
import hashlib
import json
import logging
import os
import random
import re
import time
from datetime import datetime
from pathlib import Path

import requests

try:
    from google import genai
except Exception:
    genai = None

ROOT = Path("/root/workspace/Penelope")
LOG = ROOT / "conductor_logs" / "buffer_agent.log"
LOG.parent.mkdir(parents=True, exist_ok=True)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [VESSEL_BUFFER] %(message)s",
    handlers=[logging.FileHandler(str(LOG)), logging.StreamHandler()],
)
log = logging.getLogger("vessel_buffer")

POSTED_FILE = ROOT / "buffer_posted.json"
CHANNEL_CACHE = ROOT / "buffer_channels_cache.json"
REPORT_FILE = Path("/root/CLAUDE.md")
IMG_DIR = Path("/var/www/html/generated/vessel")
IMG_DIR.mkdir(parents=True, exist_ok=True)
PUBLIC_IMG_BASE = "https://ctxaxm.com/generated/vessel"
FALLBACK_IMAGES = {
    "tiktok": "https://ctxaxm.com/generated/tiktok_5ad51ebe.jpg",
    "pinterest": "https://ctxaxm.com/generated/pinterest_a2f7c89a.jpg",
}
GQL_URL = "https://api.buffer.com/graphql"

ALLOWED = {
    "twitter": {"ProtocolVessel", "@ProtocolVessel"},
    "tiktok": {"vesselprotocol", "@vesselprotocol"},
    "pinterest": {"vessel0434", "@vessel0434", "Vessel Protocol"},
}

VIBE_BANK = [
    "identity over impulse",
    "one breath, one action, one evening reflection",
    "manifestation with receipts, not wishes",
    "the 66-day threshold where practice becomes identity",
    "CTxA=M: conscious thought multiplied by action",
    "the difference between wanting and becoming",
    "a daily protocol for people who are done drifting",
]

FALLBACK = {
    "twitter": "CTxA=M. One breath. One action. One check-in. Vessel turns manifestation into a daily protocol. https://ctxaxm.com",
    "tiktok": "Manifestation is not passive. Vessel turns CTxA=M into a daily practice: breathe, act, reflect. Start Day 1 -> ctxaxm.com #manifestation #selfgrowth #dailyritual #vesselprotocol",
    "pinterest": "Build a manifestation practice with daily breathwork, aligned action, and evening reflection. Vessel is a 365-day protocol for turning intention into movement. #manifestation #journaling #dailyritual #selfgrowth #habitformation #visionboard",
}

TEXT_PROMPTS = {
    "twitter": """Write one X post for Vessel Protocol at https://ctxaxm.com.
Vessel is a 365-day manifestation protocol built around CTxA=M: Conscious Thought x Action = Manifestation.
Make it specific, intriguing, and grounded in daily action. No hype, no fake claims, no income promises.
Max 240 characters. End with https://ctxaxm.com. Return only the post.""",
    "tiktok": """Write a TikTok caption for Vessel Protocol at ctxaxm.com.
Hook: manifestation is not passive. Mention CTxA=M, daily breath/action/evening check-in, and the 365-day protocol.
Keep it under 900 characters. End with: Start Day 1 -> ctxaxm.com
Add 4 hashtags. Return only the caption.""",
    "pinterest": """Write a Pinterest pin description for Vessel Protocol at ctxaxm.com.
Focus on daily manifestation ritual, habit formation, journaling, vision board, and 365-day protocol.
2 useful sentences + 6 keyword-rich hashtags. Return only the description.""",
}

IMAGE_PROMPTS = {
    "tiktok": """Create a premium vertical social visual for Vessel Protocol, a 365-day manifestation app.
Light airy palette: warm white, soft gold, pale sky, subtle botanical glow. Show a simple luminous vessel shape with orbiting dots representing daily breath, action, and evening reflection. Modern wellness app aesthetic. No readable text. Vertical 1024x1536.""",
    "pinterest": """Create a premium vertical Pinterest visual for Vessel Protocol.
Light airy manifestation dashboard mood: a luminous vessel, small journal page, gentle breath-circle motif, soft gold accents, clean modern wellness design. No readable text. Vertical 1024x1536.""",
}


def load_env():
    env = {}
    for path in (Path("/root/penelope_vault.env"), ROOT / ".env"):
        if not path.exists():
            continue
        for line in path.read_text().splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            k, v = line.split("=", 1)
            env[k.strip()] = v.strip().strip('"').strip("'")
    return env


ENV = load_env()
BUFFER_TOKEN = ENV.get("BUFFER_API_TOKEN", "")
GOOGLE_API_KEY = ENV.get("GOOGLE_API_KEY", "")
WAVESPEED_API_KEY = ENV.get("WAVESPEED_API_KEY", "")
TEXT_MODEL = ENV.get("GEMINI_TEXT_MODEL", "gemini-2.5-flash")
HEADERS = {"Authorization": f"Bearer {BUFFER_TOKEN}", "Content-Type": "application/json"}
genai_client = genai.Client(api_key=GOOGLE_API_KEY) if genai and GOOGLE_API_KEY else None


def append_report(title, lines):
    ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    block = ["\n## " + title + " - " + ts, *["- " + x for x in lines], ""]
    with REPORT_FILE.open("a", encoding="utf-8") as f:
        f.write("\n".join(block))


def safe_error(err):
    text = str(err)
    text = re.sub(r"api_key:[A-Za-z0-9_\-]+", "api_key:[redacted]", text)
    text = re.sub(r"AIza[0-9A-Za-z_\-]+", "[redacted_google_key]", text)
    text = re.sub(r"sk-[A-Za-z0-9_\-]+", "[redacted_openai_key]", text)
    return text[:300]


def gql(query, variables=None):
    if not BUFFER_TOKEN:
        raise RuntimeError("BUFFER_API_TOKEN missing")
    body = {"query": query}
    if variables:
        body["variables"] = variables
    r = requests.post(GQL_URL, headers=HEADERS, json=body, timeout=30)
    if r.status_code != 200:
        raise RuntimeError(f"Buffer GraphQL HTTP {r.status_code}: {r.text[:300]}")
    data = r.json()
    if data.get("errors"):
        raise RuntimeError("Buffer GraphQL errors: " + json.dumps(data["errors"])[:500])
    return data.get("data") or {}


def get_channels():
    data = gql("{ account { organizations { channels { id service name } } } }")
    channels = []
    for org in data.get("account", {}).get("organizations", []):
        for ch in org.get("channels", []):
            service = (ch.get("service") or "").lower()
            name = ch.get("name") or ""
            if service in ALLOWED and name in ALLOWED[service]:
                channels.append({"id": ch["id"], "service": service, "name": name})
            else:
                log.info("Skipping non-Vessel Buffer channel: %s/%s", service, name)
    CHANNEL_CACHE.write_text(
        json.dumps({c["service"]: c["id"] for c in channels} | {"cached_at": datetime.now().isoformat()}, indent=2)
    )
    return channels


def generate_text(service):
    if not genai_client:
        return FALLBACK[service]
    prompt = TEXT_PROMPTS[service] + f"\nTheme seed: {random.choice(VIBE_BANK)}"
    try:
        resp = genai_client.models.generate_content(model=TEXT_MODEL, contents=prompt)
        text = (getattr(resp, "text", "") or "").strip()
        return text or FALLBACK[service]
    except Exception as e:
        log.warning("Gemini text failed for %s, using fallback: %s", service, safe_error(e))
        return FALLBACK[service]


def generate_image(service):
    if service not in IMAGE_PROMPTS:
        return None
    if not WAVESPEED_API_KEY:
        raise RuntimeError("WAVESPEED_API_KEY missing; cannot render image")
    prompt = IMAGE_PROMPTS[service]
    r = requests.post(
        "https://api.wavespeed.ai/api/v3/google/nano-banana-2/text-to-image",
        headers={"Authorization": f"Bearer {WAVESPEED_API_KEY}", "Content-Type": "application/json"},
        json={"prompt": prompt, "size": "1024x1536", "num_images": 1},
        timeout=60,
    )
    d = r.json()
    url = None
    outputs = d.get("data", {}).get("outputs", [])
    if outputs:
        url = outputs[0].get("url")
    task_id = d.get("id")
    start = time.time()
    while not url and task_id and time.time() - start < 300:
        time.sleep(8)
        pr = requests.get(
            f"https://api.wavespeed.ai/api/v3/predictions/{task_id}",
            headers={"Authorization": f"Bearer {WAVESPEED_API_KEY}"},
            timeout=20,
        )
        pd = pr.json()
        if pd.get("status") == "failed":
            raise RuntimeError("image rendering failed")
        if pd.get("status") == "succeeded":
            outputs = pd.get("data", {}).get("outputs", [])
            url = outputs[0].get("url") if outputs else pd.get("data", {}).get("url")
    if not url:
        raise RuntimeError(f"image rendering returned no URL: {str(d)[:220]}")
    img = requests.get(url, timeout=90).content
    fname = f"{service}_{hashlib.sha256((prompt + str(time.time())).encode()).hexdigest()[:12]}.png"
    path = IMG_DIR / fname
    path.write_bytes(img)
    os.chmod(path, 0o644)
    return f"{PUBLIC_IMG_BASE}/{fname}"


def create_post(channel_id, service, text, image_url=None, dry_run=False):
    if dry_run:
        log.info("DRY RUN [%s]: %s %s", service, text[:80], image_url or "")
        return True
    mutation = """
    mutation CreatePost($input: CreatePostInput!) {
      createPost(input: $input) {
        ... on PostActionSuccess { post { id status dueAt } }
        ... on InvalidInputError { message }
        ... on LimitReachedError { message }
        ... on UnauthorizedError { message }
        ... on UnexpectedError { message }
      }
    }"""
    inp = {"channelId": channel_id, "text": text, "schedulingType": "automatic", "mode": "addToQueue"}
    if image_url:
        inp["assets"] = {"images": [{"url": image_url}]}
    data = gql(mutation, {"input": inp})
    result = data.get("createPost") or {}
    post = result.get("post")
    if post and post.get("id"):
        log.info("Queued %s post %s", service, post["id"])
        return True
    raise RuntimeError(f"Buffer rejected {service}: {result.get('message') or result}")


def load_posted():
    if POSTED_FILE.exists():
        try:
            return json.loads(POSTED_FILE.read_text())
        except Exception:
            return {}
    return {}


def save_posted(posted):
    tmp = POSTED_FILE.with_suffix(".tmp")
    tmp.write_text(json.dumps(posted, indent=2))
    tmp.rename(POSTED_FILE)


def run(dry_run=False, force=False):
    log.info("Vessel Buffer agent start dry_run=%s force=%s", dry_run, force)
    results = []
    try:
        channels = get_channels()
        if not channels:
            raise RuntimeError("No allowed Vessel channels connected in Buffer")
        posted = load_posted()
        today = datetime.now().strftime("%Y-%m-%d")
        cycle = datetime.now().hour // 4
        for ch in channels:
            service = ch["service"]
            key = f"{ch['id']}_{today}_{cycle}_vessel"
            if key in posted and not force:
                results.append(f"skipped {service}: already queued this cycle")
                continue
            text = generate_text(service)
            image_url = None
            if service in IMAGE_PROMPTS:
                try:
                    image_url = generate_image(service)
                except Exception as img_err:
                    image_url = FALLBACK_IMAGES.get(service)
                    log.warning(
                        "Using fallback image for %s because fresh render failed: %s",
                        service,
                        safe_error(img_err),
                    )
            try:
                create_post(ch["id"], service, text, image_url=image_url, dry_run=dry_run)
            except Exception as post_err:
                results.append(f"failed {service}: {safe_error(post_err)}")
                log.warning("Post failed for %s: %s", service, safe_error(post_err))
                continue
            if not dry_run:
                posted[key] = {
                    "service": service,
                    "name": ch["name"],
                    "text": text[:120],
                    "image": image_url,
                    "ts": datetime.now().isoformat(),
                }
                save_posted(posted)
            results.append(f"queued {service}/{ch['name']}")
            time.sleep(2)
        append_report("Vessel Buffer Marketing", results or ["no channels processed"])
        log.info("Done: %s", results)
        return 0
    except Exception as e:
        msg = f"ERROR: {e}"
        log.exception(msg)
        append_report("Vessel Buffer Marketing Failure", [msg])
        return 1


if __name__ == "__main__":
    import argparse

    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--force", action="store_true")
    args = ap.parse_args()
    raise SystemExit(run(dry_run=args.dry_run, force=args.force))
