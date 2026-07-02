# Observability Alerts

| Alert | Threshold | Action |
|---|---:|---|
| Dispatch fill failure | Open call unaccepted for >4 minutes | Escalate preferred vendors, then company fleet |
| POD overdue | Delivered call without POD for >30 minutes | Notify driver and dispatcher |
| Incident severity 1 | Any new severity 1 incident | Page ops lead |
| Auth anomaly | 10 failed logins per user/IP in 10 minutes | Rate limit and review |
| RDS storage | >80% allocated | Increase storage or archive |

