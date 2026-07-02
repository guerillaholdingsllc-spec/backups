# Production Environment Checklist

## Required For Launch

- `NODE_ENV=production`
- `PORT`
- `WEB_ORIGIN`
- `DATABASE_URL`
- `OPENAI_API_KEY`
- `OPENAI_MODEL`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_AMOUNT`
- `SENDGRID_API_KEY`
- `SENDGRID_FROM`

## Required For Attorney Review Automation

- `ATTORNEY_REVIEW_WEBHOOK_URL`
- `ATTORNEY_REVIEW_SHARED_SECRET`

If no attorney review webhook is configured, paid trusts are queued for internal dashboard review and must not be delivered until a reviewer approves them through `/webhooks/attorney-review`.

## Frontend

- `VITE_API_BASE_URL`

For the preferred TrustChain route, set:

`VITE_API_BASE_URL=https://api.trustchainservices.com`

## Database

Apply:

`apps/api/db/schema.sql`

The API also runs `initDb()` at startup, but production should still keep the schema file as the deployment source of truth.

## Verification

Run:

```powershell
npm run check
npm run smoke -w apps/api
```

Then call the deployed backend:

```text
GET /health
GET /readiness
GET /operations-brief
```
