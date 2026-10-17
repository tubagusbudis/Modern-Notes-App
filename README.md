# ✦ MyNotes App

<p align="center">
  <img src="frontend/public/images/notesappicon2.png" alt="MyNotes Logo" width="100" />
</p>

<p align="center">
  <strong>A bold, fast, and feature-rich fullstack notes app built with a vibrant Neo-Brutalism design aesthetic.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-Ready-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TailwindCSS-v4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white" alt="Node.js & Express" />
  <img src="https://img.shields.io/badge/PostgreSQL-Database-4169E1?logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/TipTap-Rich%20Editor-black" alt="TipTap" />
</p>

---

## 🎨 Design Philosophy: Neo-Brutalism

MyNotes combines modern note-taking productivity with a tactile, retro-modern **Neo-Brutalism** design:
- **Bold 2px–3px solid black borders** with hard drop shadows (`shadow-[4px_4px_0px_#000]`).
- **Warm cream paper background** (`#FAF4EB`) with playful geometric decorations.
- **Vibrant pastel color schemes** (Yellow, Mint, Blue, Pink, Lavender) for visual hierarchy.
- **First-class Dark Mode** preserving crisp borders, contrast, and brutalist accents.
- **Tactile micro-animations** powered by GSAP for buttons, cards, and modal interactions.

---

## ✨ Features

### 📝 Note Authoring & Organization
- **Rich Text Editor (TipTap):** Format notes with Bold, Italic, Strikethrough, Underline, Bullet Lists, Numbered Lists, Task Checklists, Blockquotes, and Text Highlighting.
- **Smart Plain-Text Previews:** Backend automatically strips HTML tags and entities so cards display clean, readable previews.
- **Pin & Favorite:** Pin high-priority notes to the top or mark key ideas as favorites for one-click access.
- **Custom Color Variants:** Assign distinct pastel themes to notes (Yellow, Mint, Blue, Pink, Lavender) for effortless categorization.
- **Tagging System:** Organize notes with custom tags, including real-time note counts per tag.
- **File & Image Attachments:** Upload cover images (displayed on cards and editor) and attach documents (PDF, DOCX, TXT) with secure local storage via Multer.
- **Soft Delete & Trash Bin:** Accidentally deleted a note? Restore it from Trash or permanently remove it with a single click.

### 🔐 Authentication & Account Management
- **JWT-Based Authentication:** Secure registration and login backed by bcrypt password hashing.
- **Password Reset / Forgot Password:** Reset account password directly with username verification.
- **Profile & Security Settings:**
  - Update username with duplicate check.
  - Change password with old-password verification.
  - Delete account with cascading clean-up of notes and tags.

### ⚙️ Preferences & Internationalization
- **Dual Language Support:** Easily switch between **English** and **Bahasa Indonesia**.
- **Dark / Light Theme Toggle:** Instant theme toggling saved to local storage with anti-flash script.
- **Global Quick Search:** Fast search by title or content with `Ctrl + K` / `Cmd + K` keyboard shortcut.

---

## 🚀 Tech Stack

### Frontend
- **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with custom Neo-Brutalism design tokens
- **Rich Text:** [@tiptap/react](https://tiptap.dev/) (StarterKit, Highlight, Underline, TaskList)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **State & Data Fetching:** [TanStack React Query](https://tanstack.com/query/latest)
- **Icons & Animations:** [Lucide React](https://lucide.dev/) & [GSAP](https://gsap.com/)

### Backend
- **Runtime:** [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/)
- **Language:** TypeScript (`tsx` for dev watch mode)
- **Database:** [PostgreSQL](https://www.postgresql.org/) with `pg` connection pool
- **Authentication:** [JSON Web Token (JWT)](https://jwt.io/) & [bcrypt](https://www.npmjs.com/package/bcrypt)
- **Uploads:** [Multer](https://github.com/expressjs/multer) for multi-part file & image storage

---

## 📁 Project Structure

```text
personal-notes-app/
├── backend/
│   ├── src/
│   │   ├── controllers/       # Auth, notes, and tags route handlers
│   │   │   ├── authController.ts
│   │   │   ├── notesController.ts
│   │   │   └── tagsController.ts
│   │   ├── db/
│   │   │   └── index.ts       # PostgreSQL connection pool (pg)
│   │   ├── middlewares/       # JWT auth & Multer file upload
│   │   │   ├── authMiddleware.ts
│   │   │   └── upload.ts
│   │   ├── routes/            # Express routers
│   │   │   ├── authRoutes.ts
│   │   │   ├── notesRoutes.ts
│   │   │   └── tagsRoutes.ts
│   │   └── index.ts           # Server entry point
│   ├── uploads/               # Uploaded images and attachments
│   ├── schema.sql             # PostgreSQL schema creation script
│   ├── .env.example           # Backend environment template
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── public/                # Static assets & app icons
│   ├── src/
│   │   ├── components/        # Reusable UI & layout elements
│   │   │   ├── layout/        # AppShell, Sidebar, TopBar
│   │   │   └── ui/            # Brutalist Button, Dialog, Badge, Editor, Toast
│   │   ├── context/           # App-wide context providers (Language, Preferences)
│   │   ├── features/          # Domain-driven feature modules
│   │   │   ├── auth/          # Login, Register, Forgot Password
│   │   │   ├── notes/         # Dashboard, NoteEditor, NoteDetail, Pinned, Trash
│   │   │   ├── settings/      # SettingsDashboard (Account, Preferences)
│   │   │   └── tags/          # TagsDashboard
│   │   ├── hooks/             # Custom hooks (useAuth, useTheme, useLanguage)
│   │   ├── lib/               # API clients and utilities
│   │   ├── App.tsx            # Main router
│   │   ├── index.css          # Neo-Brutalist design tokens & dark mode classes
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

---

## 🛠️ Local Development Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [PostgreSQL](https://www.postgresql.org/) running locally
- Git

---

### 1. Database Setup

1. Open your PostgreSQL terminal (psql) or SQL client (e.g., DBeaver, pgAdmin).
2. Create a database named `notes_app`:
   ```sql
   CREATE DATABASE notes_app;
   ```
3. Run the initialization script provided in [`backend/schema.sql`](backend/schema.sql):
   ```sql
   \c notes_app;
   \i backend/schema.sql;
   ```
   Or execute the table definitions directly:
   ```sql
   -- Users
   CREATE TABLE IF NOT EXISTS users (
       id SERIAL PRIMARY KEY,
       username VARCHAR(255) UNIQUE NOT NULL,
       password VARCHAR(255) NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   -- Tags
   CREATE TABLE IF NOT EXISTS tags (
       id SERIAL PRIMARY KEY,
       user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
       name VARCHAR(255) NOT NULL,
       slug VARCHAR(255) NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   -- Notes
   CREATE TABLE IF NOT EXISTS notes (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
       title TEXT,
       content TEXT,
       preview TEXT,
       tags TEXT[] DEFAULT '{}',
       is_pinned BOOLEAN DEFAULT false,
       is_favorite BOOLEAN DEFAULT false,
       color_variant VARCHAR(50) DEFAULT 'yellow',
       image_url VARCHAR(255),
       file_url VARCHAR(255),
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       deleted_at TIMESTAMP
   );
   ```

---

### 2. Backend Setup

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Adjust your database credentials and secret key:
   ```env
   PORT=5000
   DATABASE_URL="postgresql://postgres:your_password@localhost:5432/notes_app"
   JWT_SECRET="your_jwt_secret_key_here"
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   The backend API will run at `http://localhost:5000`.

---

### 3. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📡 API Reference Overview

### Auth Endpoints (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|:---:|
| `POST` | `/api/auth/register` | Register new user account | No |
| `POST` | `/api/auth/login` | Login with username and password | No |
| `POST` | `/api/auth/forgot-password` | Reset password using username | No |
| `GET` | `/api/auth/me` | Get current authenticated profile | Yes |
| `PUT` | `/api/auth/username` | Update username | Yes |
| `PUT` | `/api/auth/password` | Change user password | Yes |
| `DELETE` | `/api/auth/account` | Permanently delete account and all data | Yes |

### Notes Endpoints (`/api/notes`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|:---:|
| `GET` | `/api/notes` | List notes (supports `?q=` search and `?filter=`) | Yes |
| `POST` | `/api/notes` | Create a note (multipart form for attachments) | Yes |
| `GET` | `/api/notes/:id` | Get note detail by ID | Yes |
| `PATCH` | `/api/notes/:id` | Update note content, tags, color, or files | Yes |
| `DELETE` | `/api/notes/:id` | Move note to Trash (soft delete) | Yes |
| `POST` | `/api/notes/:id/restore` | Restore note from Trash | Yes |
| `DELETE` | `/api/notes/:id/permanent` | Permanently delete note from database | Yes |
| `PATCH` | `/api/notes/:id/pin` | Toggle note pinned status | Yes |
| `PATCH` | `/api/notes/:id/favorite` | Toggle note favorite status | Yes |

### Tags Endpoints (`/api/tags`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|:---:|
| `GET` | `/api/tags` | List all tags with active note count | Yes |
| `POST` | `/api/tags` | Create a new tag | Yes |
| `PATCH` | `/api/tags/:id` | Rename tag | Yes |
| `DELETE` | `/api/tags/:id` | Delete tag | Yes |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues tab.

---

## 📄 License

This project is licensed under the MIT License.