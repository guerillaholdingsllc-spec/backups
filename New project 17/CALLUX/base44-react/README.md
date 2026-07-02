# CALLUX Base44 React App

This is a Base44-ready React/Vite app for CALLUX. It packages the credibility site, partner intake dashboard, driver certification funnel, and admin/audit views into a frontend structure that can be connected to a Base44 backend.

## Local Run

Use the external workspace for installs and builds:

```powershell
$env:TEMP='E:\CalluxDev\tmp'
$env:TMP='E:\CalluxDev\tmp'
cd 'E:\CalluxDev\projects\CALLUX\base44-react'
npm install
npm run dev
```

## Base44 Setup

After Base44 CLI authentication:

```powershell
npm install -g base44@latest
base44 login
base44 create
base44 entities push
npm run build
base44 deploy
```

If linking to an existing Base44 app, use `base44 link` and replace the placeholder app ID in `src/api/base44Client.js`.

## Included Entities

- Call
- Driver
- Certification
- PODArtifact
- AuditEvent
- Invoice

