# Glocks & Fried Chicken Site Update

Created: 2026-05-15
Target URL: https://trustchainservices.com/GAFC
Local route implemented: `/GAFC`

## What Was Built

The TrustChain web app now includes a dedicated Glocks & Fried Chicken landing page route at `/GAFC`.

The page uses:

- The real Glocks & Fried Chicken logo asset.
- All 16 catalog product renderings.
- A generated no-text, no-logo streetwear hero background.
- Waitlist-first local-drop positioning.
- A clear call to action linking to the Shopify waiting-list storefront.

## Page Strategy

The page is built as a campaign landing page, not a checkout replacement.

Core message:

> The first local merch drop is being built from demand. Join the waiting list, tell us what pieces and sizes you want, and get first access before the public local drop.

## Files Added Or Updated

- `apps/web/src/GlocksFriedChicken.jsx`
- `apps/web/src/main.jsx`
- `apps/web/src/styles.css`
- `apps/web/public/gafc/glocks-fried-chicken-logo.png`
- `apps/web/public/gafc/local-drop-hero-bg.png`
- `apps/web/public/gafc/mockups/*.png`
- `vercel.json`

## Build Status

`npm run build` completed successfully after adding the `/GAFC` route.

## Live Deployment Note

The live TrustChain page at `https://trustchainservices.com/GAFC` currently exists, but it appears to be managed outside this repo. This repo does not currently have an active `.vercel` project link, so the improved page is ready locally but may need to be copied into the actual TrustChain site repo or deployed through the existing Cloudflare/Vercel route that controls the live domain.

## Recommended Live Routing

If this repo is used as the `/GAFC` route provider, configure the active TrustChain deployment or Cloudflare Worker to serve this built app at:

- `https://trustchainservices.com/GAFC`
- `https://trustchainservices.com/GAFC/*`
- `https://trustchainservices.com/gafc/*`

## Selling Flow Recommendation

Use TrustChain for the branded campaign page and Shopify for the actual checkout/waiting-list operations until volume and workflow prove a custom checkout is worth it.
