# Secret Vault Notes

Date: 2026-05-19

## Stored Secret

The Base44 API key was stored in Windows Credential Manager.

Credential target:

```text
CALLUX_BASE44_API_KEY
```

Credential username:

```text
BASE44
```

No secret value is stored in this repository.

## Verify The Credential Exists

```powershell
cmdkey /list:CALLUX_BASE44_API_KEY
```

## Use With Base44 CLI Later

After the Base44 CLI is authenticated and the app is linked, use a temporary env file or a short-lived environment variable to push the secret into the Base44 project vault. Delete any temporary file immediately after use.

Preferred cloud vault target name:

```text
BASE44_API_KEY
```

## Security Note

Because the key was shared in chat, rotate it after the project is connected and the new key has been stored in the target vault.

