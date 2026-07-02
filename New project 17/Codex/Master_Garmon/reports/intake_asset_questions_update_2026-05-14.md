# Intake Asset Questions Update

Updated: 2026-05-14

## Purpose

Before deployment to `https://trustchainservices.com/livingtrust`, the intake was expanded so customers are prompted for assets and transfer issues that quick forms or rushed consultations can miss.

## Added Intake Areas

- Real estate
- Bank and cash accounts
- Stocks, bonds, brokerage accounts, mutual funds, ETFs, Treasury holdings
- Retirement accounts
- Life insurance
- Cars, boats, RVs, trailers, aircraft, and titled vehicles
- Business interests
- Firearms and regulated property
- Jewelry, collectibles, heirlooms, precious metals, art, and valuables
- Digital assets, crypto, domains, monetized accounts, and password manager location
- Debts, liens, guarantees, and liabilities
- Safe deposit boxes, storage units, and original document locations
- Beneficiary-designation check
- Assets to exclude or handle separately
- Special family, fiduciary, or asset instructions

## Backend Update

The frontend now sends the detailed asset schedule into `assets`. The backend local drafting and intake guidance now:

- Includes typed asset schedule details in the trust and funding instructions.
- Prompts for more asset categories when too few are answered.
- Flags beneficiary-designation review.
- Flags firearms, business interests, retirement accounts, and life insurance as attorney-review issues.
- Adds attorney review prompts for assets that may need separate funding or transfer steps.

## Verification

`npm run check` passed.
