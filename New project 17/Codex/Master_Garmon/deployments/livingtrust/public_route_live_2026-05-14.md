# LivingTrust Public Route Live - 2026-05-14

## Result

`https://trustchainservices.com/livingtrust/` is now reaching the LivingTrust app through Cloudflare.

## Fix Applied

- Stored the working Cloudflare key in Master Garmon vaults.
- Confirmed Cloudflare zone access for `trustchainservices.com`.
- Found a stale apex A record pointing `trustchainservices.com` to `138.68.14.192`.
- Verified that stale origin served the old Guerilla Holdings holding page.
- Deleted the stale apex A record.
- Left the proxied apex A record pointing to P1 `206.81.5.241`.
- Purged Cloudflare cache.

## Verified

- `https://trustchainservices.com/livingtrust/` returns `Living Trust Platform`.
- `https://trustchainservices.com/livingtrust/assets/index-CW9DsHDA.js` returns the app JavaScript bundle.
- `https://trustchainservices.com/livingtrust/api/health` returns `{"ok":true,"stateRules":50}`.

## Current Cloudflare Apex DNS

- `trustchainservices.com` -> `206.81.5.241`, proxied.
