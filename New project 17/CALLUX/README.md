# CALLUX Operating System

CALLUX is a cadaver transportation marketplace build pack for Dignity Transport Group: dispatch, certifications, revenue split, vendor intake, proof of delivery, compliance workflows, and launch assets.

## What Is Included

- `docs/complete-deliverable-set.md` - full Phase 0-5 business, product, compliance, GTM, finance, and exit pack.
- `docs/figma-pack-prompts.md` - Images 2.0-ready prompts for driver, partner, admin, van decal, and uniform renderings.
- `docs/google-business-profile.md` - Google Business Profile launch copy and operating setup.
- `brand/` - deterministic SVG logo, van decal, and uniform renderings.
- `website/` - credibility website landing page for CALLUX.
- `services/` - NestJS-oriented service scaffolds for auth, dispatch, pod, audit, certification, billing, and notifications.
- `web/admin`, `portal/partner`, `mobile/driver` - UI scaffolds.
- `infra/terraform` and `ops/k8s` - AWS/EKS starter infrastructure and Kubernetes manifests.

## Assumptions

- Markets: Sacramento, Bay Area, Reno, and Stockton.
- Cloud: AWS, with primary region `us-west-1` and option for `us-west-2`.
- Language: TypeScript services, Next.js web, React Native mobile.
- Data: Postgres, Redis queues, S3 proof-of-delivery artifacts.
- CI/CD: GitHub Actions to AWS.
- Starting driver cohort: 25; month-12 target: 100.
- Pilot clients by day 90: 5 funeral homes and 1 coroner office.

## First Local Review

Open `CALLUX/website/index.html` in a browser to view the credibility site. Review `docs/complete-deliverable-set.md` as the source-of-truth operating plan.
