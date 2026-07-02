# Data Collection Schema

Owner agent: Master Garmon
Child agent: Autonomous Sales & Marketing Funnel Agent
Created: 2026-05-15

## Purpose

This schema defines the marketing and sales data the agent continuously collects, filters, and stores for later funnel use. All records must be timestamped, versioned, retrievable, and attached to a Paperclip record.

## Core Data Categories

### Campaign Data

- Campaign ID
- Campaign name
- Platform
- Objective
- Funnel stage: awareness, lead capture, offer, sales call, purchase, upsell, retention
- ICP segment
- Offer
- Lead magnet
- Hook
- CTA
- Creative asset IDs
- Landing page IDs
- Nurture sequence IDs
- Start date
- End date
- Status
- Budget, if approved and available
- Owner
- Compliance notes

### Channel Data

- Platform
- Content type
- Posting cadence
- Post URL or asset ID
- Publish timestamp
- Hook
- CTA
- Hashtags or keywords
- Audience segment
- Reach
- Impressions
- Views
- Watch time
- Saves
- Shares
- Comments
- Engagement rate
- Clicks
- Cost per click, if paid
- Leads
- Cost per lead, if paid
- Conversion rate

### Funnel Data

- Traffic source
- Landing page
- Visitor count
- Opt-in count
- Opt-in rate
- Offer page views
- VSL views
- VSL completion rate
- Call booking count
- Purchase count
- Offer conversion rate
- Upsell views
- Upsell purchases
- Upsell conversion rate
- Refund count
- Refund rate
- Revenue by core offer
- Revenue by upsell
- Total revenue
- ROI by channel

### Nurture Data

- Sequence ID
- Channel: email, SMS, DM, retargeting, CRM
- Message ID
- Send timestamp
- Open rate
- Click rate
- Reply rate
- Opt-out rate
- Complaint rate
- Booking rate
- Purchase rate
- Follow-up delay
- Personalization variables used

### Testing Data

- Test ID
- Hypothesis
- Variant A
- Variant B
- Traffic source
- Success metric
- Sample size
- Start timestamp
- End timestamp
- Result
- Confidence level, if available
- Winner
- Rationale
- Next action

### Risk And Compliance Data

- Risk ID
- Platform or system affected
- Issue type
- Severity
- Description
- Date detected
- Action taken
- Status
- Required human approval, if any
- Linked campaign or asset IDs

## Filtering Rules

Data must be filterable by:

- Date range
- Platform
- Funnel stage
- ICP segment
- Offer
- Campaign
- Content type
- CTA
- Lead magnet
- Conversion event
- KPI status
- Risk severity
- Test result

## Paperclip Requirements

Every data entry must include:

- Unique record ID
- Timestamp
- Source
- Linked campaign, asset, or test ID
- Version number
- Decision rationale
- Current status
- Audit notes
