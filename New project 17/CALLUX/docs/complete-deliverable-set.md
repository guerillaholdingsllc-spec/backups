# CALLUX Complete Deliverable Set

## Executive Frame

CALLUX transforms Dignity Transport Group from a fleet operator into a certification-gated marketplace for dignified decedent transportation. The platform combines fast first-to-accept dispatch, paid specialty certification unlocks, proof-of-delivery evidence, vendor audit access, and compliance-first operating controls.

### Authoritative Rules

| Rule | Implementation |
|---|---|
| Layer 1 - Dispatch Platform | First-to-accept wins with 24/7 multi-city coverage. |
| Layer 2 - Certification Tier System | Paid certifications gate specialty calls. Locked calls become education-driven upsells. |
| Layer 3 - Revenue Split | Company 65%, driver 35% on all calls. |

### Certification Economics

| Tier | Driver Pays | Unlocks | Driver Earnings | Company Earnings |
|---|---:|---|---:|---:|
| Level 1 Base | Free | Standard removals | $105-$140 | $245-$260 |
| Level 2 Bariatric | $299 | >=300 lb/reinforced cot | $157, +$52 bonus | $293 |
| Level 3 Trauma | $399 | Accident/unattended deaths | $227, +$70 | $420 |
| Level 4 Biohazard | $499 | Decomposition/infectious/OSHA-level | $314, +$87 | $582 |
| Level 5 Government | $599 | Coroner/VA/federal | $409, +$95 | $759 |
| Level 6 Elite | $799 | Interstate/VIP/all calls/priority | $490, +$140 | $910 |
| Full Access Bundle | $2,595 | All specialty access | $490 on specialty calls | Specialty-dependent |

Formula: `Gross_Call_Rate = Driver_Earnings / 0.35 = Company_Earnings / 0.65`.

Assumption flagged: the supplied driver/company figures are rounded and do not always equal a perfect 35/65 split. Product displays the supplied dollar amounts; finance reconciles using the legal split formula.

### Dignity Ranks

| Rank | Color | Requirements | Benefits |
|---|---|---|---|
| Rookie | Blue | L1; 0-50 calls | Standard access |
| Professional | Green | 2+ certs; 51-200 calls; >=4.5 stars | Standard priority; $250 quarterly bonus |
| Specialist | Gold | 3+ certs; 201-500 calls; >=4.7 stars | Specialty access; $500 equipment allowance; uniform |
| Senior | Orange | 4+ certs; 501-1,000 calls; >=4.8 stars | Government calls; $1,000 annual; premium gear |
| Elite | Star | All 6 certs; 1,000+ calls; >=4.9 stars | First-pick all calls; $2,500 annual; profit share; advisory seat |

## Phase 0 - Discovery & Risk

### 0.1 Regulatory Risk Register

| Risk | Jurisdiction | Severity | Product Control | Operating Control | Evidence |
|---|---|---:|---|---|---|
| Mishandled right-to-control consent under CA Health & Safety Code Section 7100 | CA | High | Consent fields, requester role, authority attestation | Vendor intake training; exception escalation | Consent audit event |
| Chain-of-custody gap | CA/interstate | High | Required timestamps, signatures, GPS, POD hash chain | Supervisor review for missing evidence | Audit timeline export |
| OSHA Bloodborne Pathogen exposure | US/CA | High | Certification gate, PPE checklist, incident workflow | Annual training, exposure plan, spill kit | BBP training record |
| Misclassification of independent contractors | US/CA | High | Contractor TOS, dispatch autonomy, no exclusivity language | Counsel review, IC operations policy | Accepted TOS version |
| HIPAA-adjacent overcollection | US | Medium | PHI minimization, structured non-medical notes | Vendor copy guidelines | Data retention log |
| Interstate transport paperwork gaps | Multi-state | High | Interstate flag, required document checklist | Dispatch review before departure | Document artifact hashes |
| Refrigeration log failure | CA/NV | Medium | Storage module with temp entries | Monthly log audit | Storage logs |
| Government procurement noncompliance | US/CA | Medium | Contract module, SAM.gov IDs, bid checklist | Procurement calendar | Bid packet records |
| Nevada/Washoe expansion licensing | NV | Medium | Market launch gate | Licensing verification before live dispatch | License artifact |
| Insurance lapse | US/CA/NV | High | Insurance expiration fields and lockouts | Monthly insurance review | Certificate upload |

### Consent And Chain-of-Custody Map

```text
Vendor creates pickup
  -> authority/relationship captured
  -> CALL_CREATED audit event
  -> dispatch verifies certification gate
  -> OFFER_SENT audit events
  -> first driver accepts
  -> OFFER_ACCEPTED + lock
  -> driver arrives, verifies ID band
  -> ARRIVED + ID_PHOTO_CAPTURED
  -> facility signature
  -> PICKED_UP
  -> transport GPS milestones
  -> DELIVERED
  -> POD_SUBMITTED with photo/signature/geo/time hashes
  -> invoice generated
```

Privacy stance: CALLUX is HIPAA-adjacent, not a clinical record system. The platform stores the minimum identifiers needed for consent, chain-of-custody, delivery, audit, billing, and dispute handling. Avoid diagnosis, treatment history, clinical notes, and family medical details unless legally required by a government or facility workflow.

### 0.2 Stakeholder Map

| Stakeholder | Need | CALLUX Promise | Risk To Manage |
|---|---|---|---|
| Drivers | Earn more, know expectations, access specialty calls | Learn more, earn more, transparent payouts | Safety, misclassification, overwork |
| Funeral homes | Fast, respectful, documented pickups | Reliable response and audit-ready POD | SLA misses, billing disputes |
| Hospitals | Low-friction handoff | Standardized chain-of-custody | PHI leakage |
| Coroners/VA/federal | Contract-grade documentation | Government gate, SLA evidence | Procurement and custody standards |
| Families | Dignity and privacy | Indirect protection through partner quality | Tone, privacy, respectful handling |
| Admin/dispatch | Operational control | Live queue, escalation, audit | Manual overrides without evidence |

### RACI

| Workstream | Responsible | Accountable | Consulted | Informed |
|---|---|---|---|---|
| Driver onboarding | Ops Lead | COO | Compliance Counsel | Dispatch |
| Certification content | Training Lead | COO | OSHA consultant | Drivers |
| Dispatch rules | Product/Engineering | CTO | Ops Lead | Drivers/vendors |
| CA Section 7100 workflow | Compliance Counsel | CEO | Funeral partners | Admin |
| Government bids | Procurement Lead | CEO | Counsel, finance | Ops |
| Incident response | Trust & Safety | COO | Counsel | Vendor/client |
| Financial close | Finance Lead | CEO | Accountant | Investors |

## Phase 1 - Product & Architecture

### 1.1 PRD

#### Driver App

| Area | Requirement |
|---|---|
| Roles | Driver, trainee driver, suspended driver |
| Core screens | Login, Certifications, Available Calls, Call Details, Route, On-Scene Checklist, POD, Incident Report, Earnings, Ranks, Settings |
| Permissions | View open eligible calls, view locked upsell cards, accept/decline, submit status/POD, see own earnings and audits |
| SLA | Offer push target <2 seconds; accept target <90 seconds; POD upload within 30 minutes of delivery |
| Incident workflow | Driver can file injury, spill, equipment issue, custody discrepancy, family interaction, police scene delay |
| Audit trail | Every status update writes actor, timestamp, GPS if available, payload hash, previous hash |

#### Partner Portal

| Area | Requirement |
|---|---|
| Roles | Funeral home, hospital, coroner, VA/federal, billing user, audit user |
| Core screens | Dashboard, Log Pickup, Live Tracking, Call Detail, POD Retrieval, Invoices, Audit, Settings |
| Permissions | Create calls, view own calls, download POD/audit exports, view invoices |
| SLA | New pickup confirmation <15 seconds; live status changes <10 seconds |
| Incident workflow | Partners can flag disputed POD, late arrival, conduct concern, billing issue |
| Audit trail | Per-call timeline export as PDF/JSON |

#### Admin Console

| Area | Requirement |
|---|---|
| Roles | Super admin, dispatcher, compliance, finance, training, support |
| Core screens | Ops Dashboard, Calls, Drivers, Certifications, Pricing, Lock Rules, Incidents, Billing/AR, Contracts, Audit |
| Permissions | Role-based access; lock override limited to dispatcher/admin with reason |
| SLA | Queue refresh <5 seconds; escalation when unfilled >4 minutes |
| Incident workflow | Open, triage, investigate, resolve, archive |
| Audit trail | Immutable event chain, admin exports, override reasons |

### 1.2 System Architecture

Cloud recommendation: AWS, because the requested stack already assumes AWS, S3, EKS, GitHub Actions OIDC, and West Coast regional proximity. Use `us-west-1` for Northern California proximity and `us-west-2` as resilience/DR target.

```text
Driver App / Partner Portal / Admin Console
  -> API Gateway / ALB / WAF
  -> Auth Service (OIDC/JWT)
  -> Dispatch Service (Redis offers, Postgres calls)
  -> Certification Service (tiers, LMS-lite, unlocks)
  -> POD Service (S3 artifacts, SHA-256 metadata)
  -> Audit Service (append-only Postgres chain)
  -> Billing Service (65/35 split, invoices, AR)
  -> Notification Service (SMS/email/push)
  -> Observability (logs, metrics, traces, alerts)
```

Security posture:

| Control | Implementation |
|---|---|
| Multi-tenant isolation | `org_id` on partner-owned records; row-level authorization in services |
| Regional shards | Market key on calls/drivers; future shard by `region_id` |
| Encryption at rest | RDS encryption, S3 SSE-KMS, Secrets Manager |
| Encryption in transit | TLS 1.2+, HSTS on web |
| KMS rotation | Annual CMK rotation; emergency key disable runbook |
| Audit logs | Append-only hash chain: `hash = sha256(canonical_json(payload) + prevHash)` |
| Tamper-evident POD | S3 object metadata SHA-256 + audit event chain |
| Rate limiting | WAF and service-level throttles |
| Backups | RDS PITR, daily snapshots, S3 versioning/object lock option |

RPO/RTO targets: MVP RPO 15 minutes, RTO 4 hours; month-12 RPO 5 minutes, RTO 1 hour.

### 1.3 Sequence Diagram

```text
Partner Portal -> Dispatch API: create call
Dispatch API -> Certification Service: required tier by call type
Certification Service -> Dispatch API: eligible driver cohort
Dispatch API -> Redis: create offer race TTL
Notification Service -> Driver App: push offer
Driver App -> Dispatch API: accept offer
Dispatch API -> Redis/Postgres: atomic first-accept lock
Dispatch API -> Partner Portal/Admin: accepted + ETA
Driver App -> Dispatch API: arrived/on-scene/picked-up/departed
Driver App -> POD Service: upload photos/signature
POD Service -> S3: store artifacts with hashes
POD Service -> Audit Service: POD_SUBMITTED event
Billing Service -> Partner Portal: invoice + statement
```

### 1.4 Data Model

| Table | Key Fields |
|---|---|
| `calls` | `id`, `org_id`, `call_type`, `market`, `origin`, `destination`, `weight_class_lb`, `ppe_level`, `status`, `sla_due_at`, `assigned_driver_id` |
| `drivers` | `id`, `name`, `rank`, `rating`, `market`, `status`, `background_check_status`, `insurance_expires_at` |
| `certifications` | `id`, `driver_id`, `level`, `price_paid`, `status`, `completed_at`, `expires_at` |
| `equipment_rentals` | `id`, `driver_id`, `item_type`, `price`, `cogs`, `billing_period`, `status` |
| `contracts` | `id`, `org_id`, `type`, `county`, `sla_minutes`, `rate_card`, `effective_at`, `expires_at` |
| `pod_artifacts` | `id`, `call_id`, `artifact_type`, `s3_key`, `sha256`, `gps`, `captured_at` |
| `ratings` | `id`, `call_id`, `driver_id`, `score`, `notes`, `created_by` |
| `invoices` | `id`, `org_id`, `call_id`, `gross`, `company_share`, `driver_share`, `status`, `due_at` |
| `storage_logs` | `id`, `call_id`, `facility_id`, `temperature_f`, `logged_at`, `logged_by` |
| `audit_events` | `id`, `call_id`, `actor_type`, `actor_id`, `event`, `payload`, `hash`, `prev_hash`, `timestamp` |

### 1.5 Minimal Viable API Spec

| Endpoint | Method | Auth | Purpose |
|---|---|---|---|
| `/v1/auth/login` | POST | Public | OIDC/JWT login |
| `/v1/calls` | POST | Vendor/Admin | Create call |
| `/v1/dispatch/offers` | GET | Driver | List eligible and locked offers |
| `/v1/dispatch/offers/{id}/accept` | POST | Driver | Atomic first accept |
| `/v1/calls/{id}/status` | POST | Driver/Admin | Status update |
| `/v1/pod/{callId}/artifacts` | POST | Driver | POD upload |
| `/v1/billing/invoices` | GET | Vendor/Admin | Invoices and AR |

Example `POST /v1/calls` request:

```json
{
  "origin": { "facilityId": "kaiser_sac_er", "unit": "ER Bay 3" },
  "destination": { "type": "MORTUARY", "name": "Greenhaven Mortuary" },
  "callType": "TRAUMA",
  "market": "SACRAMENTO",
  "weightClassLb": 210,
  "ppeLevel": "BBP_STANDARD",
  "preferredWindow": "ASAP",
  "consent": { "authority": "facility_release", "attestedBy": "vendor_user_123" }
}
```

Example response:

```json
{
  "callId": "call_84273",
  "status": "OPEN",
  "requiredCertification": "TRAUMA",
  "trackingUrl": "https://partner.calluxos.com/calls/call_84273"
}
```

Common errors: `400 VALIDATION_FAILED`, `401 UNAUTHORIZED`, `403 ROLE_DENIED`, `409 OFFER_ALREADY_ACCEPTED`, `422 CERTIFICATION_LOCKED`, `429 RATE_LIMITED`, `500 INTERNAL_ERROR`.

## Phase 2 - Engineering Build

### 2.1 Repo Tree

```text
CALLUX/
  services/auth services/dispatch services/certification services/billing services/pod services/notifications services/audit
  web/admin
  portal/partner
  mobile/driver
  infra/terraform
  ops/k8s
  ops/observability
  docs
```

### 2.2 Baseline Code

The scaffold includes NestJS-style modules, Dockerfiles, docker-compose, K8s manifests, TypeORM migrations, Redis dispatch queue assumptions, S3 POD artifact storage, and GitHub Actions workflows.

### 2.3 Dispatch Algorithm

```text
eligible_drivers = online drivers in market/neighbor market
  where driver has required certification
  and driver has required equipment
  and driver is not on safety/cancel cooldown

score = (0.30 * proximity_score)
      + (0.15 * availability_score)
      + (0.15 * rank_bonus)
      + (0.10 * rating_score)
      + (0.10 * equipment_match)
      + (0.10 * market_experience)
      - (0.10 * fairness_penalty)

send first-wave offer to top 10 for 120 seconds
first accepted offer wins using atomic Redis/Postgres lock
if no accept, send second wave to next 20
if still unfilled, escalate preferred vendors
if still unfilled, dispatch company fleet
```

Anti-gaming:

| Pattern | Control |
|---|---|
| Rapid accept/cancel | 30-minute cooldown after cancellation inside lock; 3 in 24 hours reduces priority |
| Multi-accounting | Device ID, background check uniqueness, payout identity match |
| Location spoofing | GPS sanity checks, route plausibility, admin review |
| Cherry-picking | Fairness penalty by recent accepted call volume |

### 2.4-2.6 App Scaffolds

Driver app screens: Login, Certifications, Available Calls, Call Details, Route, On-Scene Checklist, POD, Incident Report, Earnings, Ranks.

Partner Portal screens: Create Call, Priority Flags, SLA, Live Tracking, POD Retrieval, Billing.

Admin screens: Driver Vetting, Certification Sales/Delivery, Pricing/Rates, Lock Rules, Disputes, Bonus Payouts, AR Aging.

### 2.7 Observability And Security

| Need | Tooling |
|---|---|
| Logs | JSON structured logs shipped to CloudWatch |
| Metrics | Prometheus-compatible service metrics |
| Tracing | OpenTelemetry traces with call ID correlation |
| WAF | AWS WAF managed rules + rate limits |
| Secrets | AWS Secrets Manager mounted to pods |
| Backups | RDS PITR, S3 versioning, tested restore runbooks |
| Alerts | Fill failure, POD overdue, incident severity, auth anomaly |

## Phase 3 - Compliance, Trust & Safety

### 3.1 Compliance Matrix

| Requirement | Feature | Data Fields | Workflow |
|---|---|---|---|
| OSHA BBP | Training/cert gate | `bbp_completed_at`, `ppe_level` | Driver cannot accept biohazard without active training |
| CA Section 7100 | Consent attestation | `authority`, `attested_by`, `timestamp` | Vendor must attest before dispatch |
| Chain-of-custody | Audit timeline | status events, GPS, signatures | Required on all calls |
| Refrigeration logs | Storage module | temperature, facility, logged_by | Monthly review |
| Biohazard SOP | Specialty gate | cert level, PPE checklist | Incident escalation on exposure |
| Background checks | Driver vetting | status, provider, date | Lock driver if expired/failed |
| Insurance certs | Document vault | policy number, expiration | Lock driver/vendor if expired |

### 3.2 SOP Library

#### Standard Removal SOP

Purpose: complete a respectful, documented transfer from origin to destination.

Steps: confirm call assignment; inspect PPE; arrive and identify facility contact; verify identity band or release identifier; capture required photo if permitted; obtain release signature; secure remains; update `PICKED_UP`; transport directly unless approved; deliver; obtain signature; submit POD.

#### Bariatric SOP

Use reinforced cot and two-person lift plan when weight class >=300 lb or facility flags bariatric handling. Confirm equipment before accepting. If required equipment is missing, decline or request dispatch support. Document lift-assist participants and any facility equipment used.

#### Trauma SOP

Use Trauma certification gate. Wear BBP PPE. Avoid scene commentary in notes. Capture only operationally required evidence. Escalate law enforcement/coroner conflict to dispatch. Do not transport until release authority is confirmed.

#### Biohazard SOP

Use Biohazard certification gate. Required: gloves, gown/coverall, mask/respirator as indicated, eye protection, body bag, spill kit. If leakage or exposure occurs, stop, contain, notify dispatch, file incident, and follow exposure control plan.

#### Government Chain-of-Custody SOP

Use Government certification gate. Confirm contract/case number, receiving agency, custody recipient, and required documents. Every handoff requires timestamp, signer name/title, and artifact hash. No lock override without admin reason.

#### Incident Escalation SOP

Severity 1: injury, exposure, custody discrepancy, vehicle accident, law enforcement issue. Immediate dispatch call and written incident within 30 minutes.

Severity 2: delay, equipment issue, facility dispute. Dispatch note within 15 minutes.

Severity 3: minor documentation correction. Resolve before invoice.

#### Spill Response SOP

Secure area, use PPE, contain spill, disinfect per BBP plan, dispose materials as regulated waste where applicable, document photos only when respectful and necessary, file incident, replace kit inventory.

#### PPE Checklist

Gloves, gown/coverall, mask/respirator if indicated, eye protection, shoe covers if indicated, body bag, absorbent pads, disinfectant, red bag or approved waste container, hand hygiene.

### 3.3 Marketplace Policies

Independent Contractor TOS: drivers control availability, may decline offers, provide their own qualifying business documents where required, must meet safety and documentation standards, and are paid per completed call according to the posted 35% driver share.

Earnings Claims Fair-Use: all earnings examples must state market, call type, assumptions, and that actual availability, certification, demand, rating, and acceptance behavior affect results.

Refunds/Cancellations: certification refunds allowed before course start; no refund after completion unless duplicate purchase or platform error. Vendor cancellation fees apply after driver acceptance or arrival.

Biohazard Fees: disclosed at intake and invoice; tied to PPE, handling, disposal, and certification requirements.

Dispute Resolution: evidence-first review using audit trail, POD, GPS, signatures, and support notes.

Deactivation: safety violations, fraud, falsified documents, repeated no-shows, harassment, privacy breach, or custody misconduct.

### 3.4 Data Protection

Privacy policy position: collect only business contact data, driver verification data, call logistics, custody evidence, billing data, and support records. Avoid medical details. Use role-based access, retention schedules, encryption, and audit logging.

Retention:

| Data | Retention |
|---|---:|
| Call/audit/POD | 7 years unless contract requires longer |
| Driver onboarding docs | Active + 7 years |
| Incident reports | 7 years |
| Marketing leads | 24 months inactive |
| Web analytics | 25 months |
| Support messages | 3 years |

Right-to-know/erasure: support export and deletion for ordinary account/marketing data; preserve legally required custody, billing, incident, and contract records.

## Phase 4 - Finance, Analytics & GTM

### 4.1 Five-Year Model

Formula:

`Revenue_month = (Calls * Rate * 65%) + CertRevenue_month + EquipmentRental_month + Storage + Interstate + Government`

| Stream | Y1 | Y2 | Y3 | Y4 | Y5 |
|---|---:|---:|---:|---:|---:|
| Platform % of calls | $403K | $1.12M | $2.19M | $3.65M | $5.20M |
| Certifications | $29K | $89K | $179K | $299K | $449K |
| Government | $0 | $200K | $475K | $800K | $1.4M |
| Storage | $23K | $80K | $160K | $280K | $430K |
| Interstate | $45K | $200K | $450K | $800K | $1.0M |
| Equipment rental | $120K | $201K | $396K | $571K | $721K |
| Total Platform Revenue | $620K | $1.89M | $3.85M | $6.40M | $9.20M |
| Advantage vs Original | +$73K | +$510K | +$1.365M | +$2.37M | +$3.37M |

Equipment example for 50 drivers:

`Monthly Equipment Revenue = Cot Revenue + Body Bag Margin + PPE Margin + Van Lift Access`

`= ($15 * calls_using_cot) + (($28 - $18) * body_bags) + (($18 - $8) * ppe_kits) + ($45 * drivers)`

Given supplied estimate: `$3,000 + $2,800 + $1,800 + $2,250 = $9,850/month`, or `$118,200/year`.

Unit economics:

| Call Type | Driver | Company | Gross Approx |
|---|---:|---:|---:|
| Standard | $105-$140 | $245-$260 | $350-$400 |
| Bariatric | $157 | $293 | $450 |
| Trauma | $227 | $420 | $647 |
| Biohazard | $314 | $582 | $896 |
| Government | $409 | $759 | $1,168 |
| Elite | $490 | $910 | $1,400 |

`Contribution Margin = Company Share + Fees - Driver Incentives - Support Cost - Payment Processing - Insurance Allocation - Equipment COGS`.

CAC/LTV:

`Driver_LTV = Avg_Monthly_Company_Margin_Per_Driver * Gross_Margin * Retention_Months + Cert_Revenue + Equipment_Margin`.

`Client_LTV = Avg_Calls_Per_Month * Avg_Company_Share * Gross_Margin * Retention_Months - Support_Cost`.

Sensitivity table:

| Variable | Downside | Base | Upside |
|---|---:|---:|---:|
| Cert conversion | 15% | 30% | 45% |
| Monthly driver churn | 8% | 5% | 3% |
| Calls/driver/month | 8 | 14 | 22 |
| After-hours premium | 5% | 12% | 20% |
| Partner churn/year | 20% | 10% | 5% |

### 4.2 Analytics Dashboards

| Metric | Query Definition |
|---|---|
| Fill rate | `accepted_calls / created_calls` |
| Time-to-accept | `accepted_at - created_at` median/p90 |
| Cert lock conversion | `cert_purchases / locked_call_views` |
| POD compliance | `complete_pod_calls / delivered_calls` |
| Incidents per 1,000 calls | `incidents * 1000 / completed_calls` |
| Gov SLA adherence | `gov_calls_on_time / gov_calls` |
| Earnings distribution | p25/p50/p75 driver earnings by market |
| Take rate | `company_share / gross_call_rate` |

Example SQL:

```sql
select market,
       count(*) filter (where status in ('ACCEPTED','IN_PROGRESS','DELIVERED'))::decimal / count(*) as fill_rate,
       percentile_cont(0.9) within group (order by extract(epoch from (accepted_at - created_at))) as p90_accept_seconds
from calls
where created_at >= now() - interval '30 days'
group by market;
```

### 4.3 GTM Plan

Recruiting headline: "The more you learn, the more you earn - and we built the school."

Channels: funeral home/coroner outreach, procurement bids, driver referrals, paid search/social, dignity-centered PR, community relations, VA/federal contracting research.

Sample ad copy:

| Audience | Copy |
|---|---|
| Driver | "Certified transport professionals earn more on CALLUX. Unlock Bariatric, Trauma, Biohazard, Government, and Elite calls." |
| Partner | "One pickup request. Real-time dispatch. Audit-ready proof of delivery." |
| Procurement | "A compliance-first decedent transport network with certified drivers, custody evidence, and SLA reporting." |

Lock icon CTA examples:

- `Unlock Trauma Specialist ($399) -> +$70/call`
- `Government calls require Level 5. Unlock ($599) -> +$95/call`
- `Biohazard locked for safety. Complete Level 4 ($499) -> +$87/call`

Safety banners:

- "Respectful handling starts with verification. Confirm identity before transfer."
- "Biohazard call: PPE checklist required before departure."
- "Government custody call: every handoff needs a timestamp and signature."

### 4.4 90-Day MVP And 12-Month Scale

Fourth market selected: Stockton, because it connects Sacramento, Bay Area overflow, Central Valley coverage, and future interstate routing.

90-day Gantt:

| Weeks | Engineering | Compliance | GTM/Ops |
|---|---|---|---|
| 1-2 | Repo, auth, data model, website | Counsel review, risk register | Brand, GBP, pilot list |
| 3-4 | Dispatch MVP, vendor intake | BBP training content | Driver recruiting starts |
| 5-6 | Driver app feed/status/POD | SOP training | Funeral home demos |
| 7-8 | Admin queue/audit | Insurance/doc lockouts | 25 drivers onboarded |
| 9-10 | Billing, invoices, exports | CA Section 7100 workflow validation | 5 funeral homes signed |
| 11-12 | Hardening, staging, QA | Incident drills | 1 coroner pilot, launch readiness |

Month-12 scale:

| Month | Target |
|---|---|
| 1-3 | Sacramento/Bay Area/Reno/Stockton MVP, 25 drivers |
| 4-6 | 50 drivers, equipment rental program, 10+ partners |
| 7-9 | Government bid pipeline, storage/interstate modules |
| 10-12 | 100 drivers, coroner/VA contracts, audited KPI packet |

## Phase 5 - Exit Readiness & Investor Pack

### 5.1 Data Room Checklist

Corporate: LLC/EIN, operating agreement, cap table, board/advisor approvals.

Compliance: licenses, DCA Cemetery & Funeral Bureau research, OSHA BBP records, insurance, workers' comp, surety bond, DMV GVWR registration where required, Nevada/Washoe files.

Commercial: customer contracts, government bids, pipeline, pricing, SLAs, churn.

Technology: architecture diagrams, repo access, IP assignment, security policies, disaster recovery, audit logs.

Finance: P&L, AR aging, revenue by stream, driver payouts, equipment leases, tax records, audited financial prep.

Operations: SOPs, training records, incidents, refrigeration logs, mileage logs, vendor scorecards.

Buyer list: funeral home consolidators, regional funeral groups, private equity platform buyers, logistics platforms, gov-tech/accreditation adjacent acquirers, death-care software acquirers.

### 5.2 One-Page Investor Memo

CALLUX is building the certification-gated dispatch layer for dignified decedent transportation. The moat is a trained driver network, specialty certification revenue, government-ready custody evidence, partner audit access, and marketplace liquidity across Sacramento, Bay Area, Reno, and Stockton.

Why now: death-care transportation remains fragmented, phone-based, and under-instrumented. Partners need faster response, cleaner proof, and compliant documentation.

Business model: 65% company share on all calls, paid driver certifications, equipment rentals, storage, interstate, and government contracts.

Scale: launch with 25 drivers and 6 pilot clients by day 90; grow to 100 drivers by month 12.

Exit: Year 5 platform revenue target $9.2M. Platform IP + certified network + government contracts can support 7-10x EBITDA multiples, compared with 4-5x for fleet-only operations. Preferred route is stock sale; asset sale is common; seller financing 10-20% and optional earn-out are acceptable negotiation levers.

## Website And Brand Footprint

Credibility requirement: launch `CALLUX Operating System` website with service explanation, compliance posture, partner CTA, driver CTA, markets, certifications, proof-of-delivery, and contact path.

Google Business Profile: see `docs/google-business-profile.md`.

Van decals/uniforms: see `brand/logo.svg`, `brand/van-decal-rendering.svg`, `brand/uniform-rendering.svg`, and `docs/figma-pack-prompts.md`.

## Tomorrow's Checklist

1. Confirm legal entity details, EIN, operating agreement, and trade name usage.
2. Assign one owner for CA DCA Cemetery & Funeral Bureau registration research.
3. Create SAM.gov account or verify existing entity status.
4. Register Sacramento County OpenGov vendor profile.
5. Confirm insurance broker requirements for commercial auto, liability, workers' comp, and surety.
6. Review the CALLUX website copy for tone and phone/email accuracy.
7. Choose the final logo variant and decal placement.
8. Start Google Business Profile setup with service areas.
9. Build the first pilot client list of 25 funeral homes/coroners/hospitals.
10. Draft the first 5 outreach emails using the partner CTA.
11. Identify 25 launch drivers and collect onboarding documents.
12. Review certification prices and payment/refund policy with counsel.
13. Approve OSHA BBP training provider or internal curriculum.
14. Configure AWS account, GitHub repo, and staging secrets.
15. Run local service scaffold and confirm Postgres/Redis startup.
16. Validate dispatch acceptance lock with a simulated race.
17. Run tabletop incident drill for biohazard spill and custody discrepancy.
18. Create first month KPI dashboard in a shared reporting doc.
19. Schedule weekly compliance/ops cadence.
20. Set a day-30 go/no-go review for MVP pilot readiness.
