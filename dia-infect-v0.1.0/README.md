# DiaInfect — V0.1.0

**Research prototype only — not for clinical use.** This release establishes the repository foundation; it does not produce diagnoses or infection-risk predictions.

## Structure
- `frontend/`: React + TypeScript + Vite starter UI.
- `backend/`: Express + TypeScript API with `GET /api/health`.
- `database/migrations/`: reserved; no database schema yet.
- `ml-service/`: integration notes only; no model or inference endpoint.
- `docs/`: architecture and security notes.
- `.github/workflows/ci.yml`: frontend/backend build checks.

## Requirements
Node.js 20+ and npm.

## Run locally
Terminal 1:
```bash
cd backend
npm install
npm run dev
```
Health endpoint: http://localhost:4000/api/health

Terminal 2:
```bash
cd frontend
npm install
npm run dev
```
Open the Vite URL shown in the terminal (normally http://localhost:5173).

## V0.1.0 limitations
No authentication, database, patient-data storage, AI model, risk score, diagnosis, or treatment recommendations. Do not enter real or identifiable patient data.

## Versioning
Commit this foundation, then create a Git tag `v0.1.0`. Build future work in new commits/tags so earlier versions remain available.
