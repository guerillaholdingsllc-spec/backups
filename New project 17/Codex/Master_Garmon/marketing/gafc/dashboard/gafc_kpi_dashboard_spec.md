# Glocks & Fried Chicken KPI Dashboard Spec

Created: 2026-05-15
Owner: Master Garmon
Campaign: Glocks & Fried Chicken Local Drop Waiting List
Dashboard file: `gafc_kpi_dashboard.html`

## Purpose

This dashboard is the interactive command center for the Glocks & Fried Chicken waitlist-first local drop campaign. It is designed to be visually polished, updatable from monitored outcomes, auditable, CSV-exportable, and accurate to the data entered or imported.

## What It Does

- Tracks waiting-list signups, Shopify clicks, product votes, content output, and local drop readiness.
- Lets agents or operators add campaign outcomes through a form.
- Imports KPI CSV files.
- Exports KPI CSV files.
- Exports an audit log CSV.
- Generates the next execution packet from current data.
- Stores browser-local data until exported.
- Keeps an audit trail for data mutations, imports, exports, resets, and packet generations.

## Accuracy Rules

- The dashboard must not invent live platform metrics.
- Metrics are accurate only to imported or manually entered records.
- Live posting and live metric pulls require connected platform/API permissions.
- Agent responses should be entered or imported as structured rows.
- All exported CSVs should be attached to Paperclip records.

## KPI Fields

- Date
- Agent slot
- Platform
- Asset ID
- Hook
- Product featured
- CTA
- Views or reach
- Clicks
- Signups
- Comments
- Saves
- Shares
- Product requests
- Size requests
- Objections
- Next action

## One-Button Execution Model

The dashboard includes a "Generate Execution Packet" button. It reads current records and outputs next-step orders for the 25-agent army.

This button generates execution instructions. It does not publish posts, spend money, scrape platforms, send messages, or contact customers unless approved integrations are added later.

## CSV Workflow

1. Agents or monitoring tools produce a CSV with the required KPI fields.
2. Import the CSV into the dashboard.
3. Dashboard recalculates KPIs and demand charts.
4. Export KPI CSV for archive.
5. Export audit CSV for Paperclip.
6. Generate the next execution packet.

## Visual Asset

Brand assets:

- Active dashboard logo: `assets/glocks_fried_chicken_logo.png`
- Obsolete generic visual mockup: `assets/gafc_kpi_dashboard_visual_2026-05-15.png`

## Brand Accuracy Correction

The first generated visual mockup used generic GAFC shorthand and should not be treated as the brand source of truth. The interactive dashboard must use the full Glocks & Fried Chicken name and the actual local logo asset.
