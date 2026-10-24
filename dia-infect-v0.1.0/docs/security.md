# Security notes — V0.1.0
- Do not enter real or identifiable patient data.
- Never commit `.env`, credentials, tokens, or data exports.
- API uses Helmet, one configured CORS origin, and a 100 KB JSON request limit.
- Authentication, authorization, rate limiting, database security, audit logging, privacy review, and production hardening are not implemented.
- Not ready for production or clinical use.
