# LivingTrust Public Route Status - 2026-05-14

## Completed on origin

- Built the LivingTrust frontend with the `/livingtrust/` base path.
- Deployed static files to P1 at `/var/www/html/livingtrust`.
- Added nginx routes for:
  - `/livingtrust/` -> static LivingTrust app
  - `/livingtrust/api/` -> local LivingTrust API service
- Deployed the LivingTrust API to `/opt/livingtrust-api`.
- Started the API under PM2 as `livingtrust-api`.

## Verified on P1 origin

- `https://127.0.0.1/livingtrust/` with `Host: trustchainservices.com` returns the LivingTrust app shell.
- `/livingtrust/assets/index-CW9DsHDA.js` returns the built JavaScript bundle.
- `/livingtrust/api/health` returns `{"ok":true,"stateRules":50}`.

## Public blocker

The public URL `https://trustchainservices.com/livingtrust/` is still intercepted by Cloudflare before it reaches nginx. Cloudflare returns the existing holding-company page for every tested public path, including:

- `/livingtrust/`
- `/livingtrust/api/health`
- `/livingtrust/assets/index-CW9DsHDA.js`
- `/LTG/`
- `/health`

Cloudflare response headers show `server: cloudflare` and `cf-cache-status: DYNAMIC`, so this is not a stale browser cache. It is a Cloudflare Worker/route rule returning the public holding page.

## Needed Cloudflare action

Update the active Cloudflare Worker/routing rule so `/livingtrust*` passes through to the P1 origin, or deploy a Worker branch that forwards:

- `/livingtrust/`
- `/livingtrust/assets/*`
- `/livingtrust/images/*`
- `/livingtrust/api/*`

The server has `wrangler` installed, but it is not authenticated and no `CLOUDFLARE_API_TOKEN` exists in the mirrored vault. The Cloudflare MCP URL is present, but it requires an access token and currently returns `invalid_token`.
