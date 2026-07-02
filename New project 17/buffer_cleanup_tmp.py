import json

from buffer_agent import gql

ORG_ID = "69db994814a6f8c682966615"
CHANNEL_IDS = [
    "69db9b41031bfa423cf6d64e",
    "69db9bcf031bfa423cf6d86b",
    "69db9be6031bfa423cf6d8be",
]
KEEP = {
    "6a0cea7f6e4d51ef30af6239",
    "6a0ceab884f627d3062529e8",
    "6a0ceabb6e4d51ef30af6398",
}

query = """
query Posts($input: PostsInput!, $first: Int) {
  posts(input: $input, first: $first) {
    edges { node { id status text channelService channel { id name service } } }
  }
}
"""
data = gql(
    query,
    {
        "input": {
            "organizationId": ORG_ID,
            "filter": {"channelIds": CHANNEL_IDS, "status": ["scheduled", "draft", "needs_approval"]},
        },
        "first": 100,
    },
)
posts = [edge["node"] for edge in data.get("posts", {}).get("edges", [])]
to_delete = [p for p in posts if p["id"] not in KEEP]

mutation = """
mutation DeletePost($input: DeletePostInput!) {
  deletePost(input: $input) {
    ... on DeletePostSuccess { id }
    ... on VoidMutationError { message }
  }
}
"""

results = []
for post in to_delete:
    res = gql(mutation, {"input": {"id": post["id"]}})
    results.append({"id": post["id"], "text": post["text"][:80], "result": res})

print(json.dumps({"found": len(posts), "deleted": len(results), "kept": len(KEEP), "results": results}, indent=2)[:12000])
