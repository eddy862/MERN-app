# MERN Apps (TypeScript) — Notes App + Expense Tracker

This repository contains **two full‑stack MERN applications** built to practice end‑to‑end product features: authentication, CRUD, protected APIs, and a React UI.

I built these projects to demonstrate full‑stack skills across **MongoDB + Express + React + Node**, with heavy TypeScript usage (repo is ~95% TypeScript).

## Projects

### 1) Notes App (CRUD + JWT Auth)
A note‑taking app focused on authenticated CRUD workflows.

**Key features**
- User authentication: **sign up / log in**
- Protected Notes API (JWT)
- Create, edit, delete notes
- Search notes by title/description
- Responsive UI
- User profile updates (username / email / password)

**API routes (backend)**
- `POST /auth/signup` — register
- `POST /auth/login` — login
- `GET /user` — get current user (protected)
- `PATCH /user` — update current user (protected)
- `GET /notes` — list notes (protected)
- `POST /notes` — create note (protected)
- `PATCH /notes/:id` — update note (protected)
- `DELETE /notes/:id` — delete note (protected)

**Tech highlights**
- Backend: Node + Express + MongoDB (Mongoose), JWT, bcrypt
- Frontend: React + TypeScript + Vite, React Router, axios, Tailwind CSS

**Run locally**
```bash
# from repo root
cd Notes-app

# backend
cd backend
npm install

# create .env in Notes-app/backend
# ACCESS_TOKEN_SECRET=...
# DB_CONNECTION_STRING=...

npm start

# frontend (in a new terminal)
cd ../frontend/notes-app
npm install
npm run dev
```
Frontend runs on `http://localhost:5173` and the backend runs on `http://localhost:8000`.

---

### 2) Expense Tracker (JWT + Google OAuth + Recurring Transactions)
A more advanced finance tracker that includes authentication, budgeting, categories, and automation.

**Key features**
- Auth flows:
  - Local email/password auth
  - **Google OAuth** login
  - JWT + refresh token endpoint
- Protected API under `/api/*`
- Transactions, categories, budgets, fixed items (recurring income/expenses)
- Scheduled job to process recurring transactions

**API routes (backend)**
- Public:
  - `POST /api/auth/login`
  - `POST /api/auth/register`
  - `POST /api/auth/refresh-token`
  - `GET /api/auth/google`
  - `GET /api/auth/google/callback`
- Protected (require auth middleware):
  - `/api/transactions`
  - `/api/categories`
  - `/api/budgets`
  - `/api/fixedItems`
  - `/api/user`
  - `/api/parentCategories`

**Tech highlights**
- Backend: TypeScript, Express, MongoDB (Mongoose), Passport (JWT + Google), validation, cron jobs
- Frontend: React + TypeScript + Vite, Material UI + Bootstrap, charts (Chart.js / Recharts), axios

**Run locally**
```bash
# from repo root
cd expense-tracker

# backend
cd backend
npm install

# create .env in expense-tracker/backend
# MONGO_URI=...
# plus auth secrets (JWT / refresh token) and Google OAuth credentials if enabled

npm run dev

# frontend (in a new terminal)
cd ../frontend/expense-tracker
npm install
npm run dev
```
Backend runs on port `5000`.

## Tech stack
- **Frontend:** React, TypeScript, Vite, React Router, axios
- **Backend:** Node.js, Express, TypeScript/JavaScript, Passport (JWT + Google OAuth)
- **Database:** MongoDB + Mongoose
- **Auth:** JWT, refresh tokens, bcrypt password hashing

## Notes on configuration
- This repo does **not** include a checked‑in `.env.example` file.
- You’ll need to create your own `.env` files as described above.

## Repo structure
- `Notes-app/`
  - `backend/` (Express API)
  - `frontend/notes-app/` (React UI)
- `expense-tracker/`
  - `backend/` (Express API)
  - `frontend/expense-tracker/` (React UI)

---
