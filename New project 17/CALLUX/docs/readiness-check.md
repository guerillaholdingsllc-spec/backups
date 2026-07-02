# CALLUX Readiness Check

Date: 2026-05-19

## Summary

The CALLUX project pack is present and organized, but the current machine is not ready to complete a full deployable MVP build without freeing disk space and installing missing platform tools. The strategy/docs/brand/static website assets are immediately usable. The engineering folders are scaffolds and need package bootstraps, dependency installation, app entrypoints, and real test/build scripts before they can be considered build-complete.

## What Is Available Now

| Area | Status | Notes |
|---|---|---|
| CALLUX folder | Available | Project exists at `C:\Users\DGARM\Documents\New project 17\CALLUX`. |
| Deliverable document | Available | `docs/complete-deliverable-set.md` covers Phases 0-5, formulas, SOPs, policies, GTM, rollout, and exit pack. |
| API spec | Available | `docs/api-spec.yaml` exists. |
| Static website | Available | `website/index.html` and `website/styles.css` exist and contain the credibility site copy. |
| Brand assets | Available | SVG logo, van decal rendering, and uniform rendering exist under `brand/`. |
| Google Business Profile pack | Available | `docs/google-business-profile.md` exists. |
| Figma/Image prompts | Available | `docs/figma-pack-prompts.md` exists. |
| Service scaffolds | Partial | Auth, dispatch, POD, audit have package files and TypeScript shells. Certification, billing, notifications are code-only shells. |
| Infra scaffolds | Partial | Terraform/EKS/RDS/S3/IAM files exist, but local Terraform is not installed. |
| CI/CD scaffolds | Partial | GitHub Actions files exist, but not validated in GitHub. |
| Local Node/npm | Available | Node `v24.14.1`, npm `11.11.0`. |
| Python | Available | Python `3.14.4`. |

## Missing Or Blocked Locally

| Need | Current Status | Impact |
|---|---|---|
| Free disk space | Blocked | C: reached 0 bytes free during dependency install; after cleanup only about 67 MB free remained. Full project needs several GB free. |
| Git | Missing from shell | Cannot inspect repo status, branch, commit, or push from this environment. |
| Docker | Missing from shell | Cannot run Postgres/Redis/S3-compatible local stack via `docker-compose`. |
| Terraform | Missing from shell | Cannot validate or apply AWS infrastructure locally. |
| kubectl | Missing from shell | Cannot validate/apply Kubernetes manifests locally. |
| AWS CLI | Missing from shell | Cannot verify AWS identity, EKS access, S3, or Secrets Manager from shell. |
| pnpm/yarn | Missing | npm is available, so this is not critical. |
| Next.js/React Native deps | Not installed | UI app builds cannot run yet. Install attempt failed because disk is full. |
| Browser verification | Blocked | In-app browser blocked direct `file://` and `localhost:4177` access. Static files were verified by file/content checks instead. |

## Checks Run

| Check | Result |
|---|---|
| File count | 70+ CALLUX files present. |
| npm install root dependencies | Initially succeeded for the small service dependency set, then larger UI install failed due to disk space. |
| npm audit | 3 moderate advisories in NestJS-related dependencies. Non-breaking `npm audit fix` did not clear all; force upgrade would move Nest to a breaking version. |
| Root build before changes | Was placeholder only. |
| TypeScript config | Added `tsconfig.json` and changed root `build` to run `typecheck`. |
| TypeScript check | Fails until React, React DOM, Next.js, React Native, and related types are installable. |
| Static website content | Confirmed key strings exist in `website/index.html`. |

## Immediate Completion Requirements

1. Free at least 8-12 GB on C: before installing full dependencies.
2. Install Git, Docker Desktop, Terraform, kubectl, and AWS CLI.
3. Run `npm install` in `CALLUX` after disk cleanup.
4. Add package manifests and app configs for:
   - `web/admin`
   - `portal/partner`
   - `mobile/driver`
   - `services/certification`
   - `services/billing`
   - `services/notifications`
   - `packages/types`
   - `packages/common`
5. Add NestJS `main.ts`, `nest-cli.json`, and real service bootstrap files.
6. Add Next.js `layout.tsx`, package files, and build scripts for admin and partner apps.
7. Add React Native/Expo app config, navigation, and package scripts for driver mobile.
8. Replace placeholder lint/test scripts with ESLint/Vitest/Jest or repo-standard tools.
9. Add integration tests for dispatch acceptance locks, certification gates, POD hash storage, and audit chain.
10. Validate Terraform after Terraform is installed.
11. Validate Docker Compose after Docker is installed.
12. Configure AWS account, GitHub OIDC role, secrets, and deployment registry.

## Practical Next Step

The fastest path is to convert the current scaffold into a minimal buildable npm workspace after disk cleanup. Start with backend services and static/Next web first, then mobile, then AWS deployment.

