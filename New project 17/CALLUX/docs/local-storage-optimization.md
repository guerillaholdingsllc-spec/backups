# Local Storage Optimization

Date: 2026-05-19

## What Was Changed

| Change | Result |
|---|---|
| Created external dev area | `E:\CalluxDev` |
| Moved npm cache target | npm now uses `E:\CalluxDev\npm-cache` |
| Created external temp folder | `E:\CalluxDev\tmp` |
| Cleaned old npm cache on C: | Freed local space |
| Cleaned user temp leftovers | Freed local space where files were not locked |
| Copied CALLUX to external workspace | `E:\CalluxDev\projects\CALLUX` |
| Installed heavy JS dependencies externally | External copy has React, Next.js, React Native, Nest, TypeScript, and related packages |
| Added project `.npmrc` | Keeps npm cache on E: and disables workspace symlinks for exFAT compatibility |

## Current Working Locations

Primary source pack:

`C:\Users\DGARM\Documents\New project 17\CALLUX`

External build workspace:

`E:\CalluxDev\projects\CALLUX`

Npm cache:

`E:\CalluxDev\npm-cache`

Temp folder for big installs:

`E:\CalluxDev\tmp`

## Important Note About The External Drive

The external drives are formatted as exFAT. exFAT is fine for storage and package cache, but npm workspaces normally create symlinks, and those failed on this drive. To compensate, the CALLUX `.npmrc` sets:

```text
workspaces=false
```

This lets the external copy install root dependencies without workspace symlink failures. For a full production-grade monorepo install, the best long-term fix is an NTFS-formatted external dev volume or a VHDX file stored on the external drive and formatted as NTFS.

## How To Use The External Workspace

Open a PowerShell window and run:

```powershell
$env:TEMP='E:\CalluxDev\tmp'
$env:TMP='E:\CalluxDev\tmp'
cd 'E:\CalluxDev\projects\CALLUX'
npm run typecheck
```

## Current Result

`npm run typecheck` passes in the external workspace.

## Space Result

C: improved from 0 bytes free during the failed install to roughly 1.2 GB free after cache/temp cleanup and moving the active dependency work to E:.

This is enough to keep working cautiously, but not enough for healthy Windows operation. Recommended target: keep at least 20-30 GB free on C:.

## Next Storage Improvements

1. Move large personal downloads from `C:\Users\DGARM\Downloads` to `E:\Archive\Downloads`.
2. Move old project folders from `C:\Users\DGARM\Documents` to `E:\Archive\Projects`.
3. Keep active build work under `E:\CalluxDev\projects`.
4. Consider creating an NTFS VHDX on E: for Node/npm workspaces.
5. Install Git, Docker, Terraform, kubectl, and AWS CLI after C: has more free space.

