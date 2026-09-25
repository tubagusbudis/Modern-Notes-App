# AGENTS.md: Backend Execution & Fullstack Integration Guide for MyNotes

## 🤖 Agent Persona & Core Directive
You are now an Expert Fullstack Engineer. The Frontend MVP UI/UX is completed using mock data. 
Your new primary objective is to build the **Backend MVP** inside the `backend/` folder and integrate it with the existing frontend, following the architecture in `docs/prd.md`.

**CRITICAL RULES:**
1. **Preserve Frontend UI:** Do NOT change the visual design, animations, or styling of the frontend. Only modify the data-fetching layer (replace mock API with real API calls).
2. **Backend Scope:** Build the backend using Node.js, Express, TypeScript, Prisma ORM, and PostgreSQL.
3. **Data Consistency:** Ensure the database schema matches all the features added during frontend development (e.g., tags array/relations, color variants for notes, isPinned, isFavorite, and soft-delete/deletedAt for the Trash feature).

## 📂 Context & References
Always refer to:
1. `docs/prd.md`: For backend architecture, database schema, API design, and security baselines.
2. The existing `frontend/src/lib/mockApi.ts`: To understand the exact data structure the frontend currently expects.

## 🚀 Execution Phases (Backend & Integration)

Please execute these phases step-by-step. Ask for user approval after each phase.

### Phase 6: Backend Initialization & Prisma Setup
* Navigate to the `backend/` directory.
* Initialize a Node.js + TypeScript project.
* Install required dependencies (Express, Prisma, PostgreSQL client, Zod, CORS, dotenv, etc.).
* Initialize Prisma (`npx prisma init`) and configure the `.env` file for a local PostgreSQL connection.

### Phase 7: Database Schema Design
* Define the Prisma schema (`schema.prisma`) for `User`, `Session`, `Note`, and `Tag` models as outlined in `prd.md`.
* **Crucial:** Ensure the `Note` model includes fields for the new frontend features: `colorVariant` (String), `isPinned` (Boolean), `isFavorite` (Boolean), and `deletedAt` (DateTime, for Trash functionality).
* Generate and run the initial Prisma migration (`npx prisma migrate dev`).

### Phase 8: REST API Development
* Build the Express server with proper modular routing (e.g., `/api/notes`, `/api/tags`).
* Implement CRUD endpoints for Notes (including restore and permanent delete for Trash).
* Implement endpoints for Tags and updating Note colors/pins/favorites.
* Add centralized error handling and input validation using Zod.

### Phase 9: Frontend Integration
* In the `frontend/` folder, replace the logic inside `mockApi.ts` (or create a new API client) to fetch and mutate data from the real Express API (e.g., `http://localhost:5000/api`).
* Configure CORS in the backend to allow requests from the Vite frontend port.
* Ensure all features (Create, Edit, Delete to Trash, Add Tags, Change Color) work seamlessly with the PostgreSQL database.

---
**Agent Prompting Instruction:** Reply with "I have read the updated AGENTS.md. I am ready to start Phase 6 in the backend/ folder." to acknowledge these instructions.