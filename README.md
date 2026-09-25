# ✦ MyNotes App

A modern, fast, and personal fullstack notes application built to keep your thoughts, ideas, and knowledge organized.

## 🚀 Tech Stack

**Frontend:**
- React (Vite)
- TypeScript
- Tailwind CSS v4
- GSAP (for smooth animations)
- React Router
- Lucide React (Icons)

**Backend:**
- Node.js & Express
- TypeScript
- PostgreSQL (Raw SQL via `pg`)
- Multer (File & Image Upload handling)

## ✨ Features

- **CRUD Notes:** Create, read, update, and delete personal notes.
- **Rich Organization:** Pin important notes, mark favorites, and organize with custom tags.
- **Soft Delete (Trash):** Deleted notes go to a Trash bin before permanent deletion.
- **File Attachments:** Upload and attach images (displays as a cover) or files to your notes.
- **Dark/Light Mode:** Seamless theme switching with smooth UI transitions.
- **Responsive & Animated:** Clean UI with GSAP-powered micro-interactions and page transitions.

## 🛠️ Local Development Setup

### Prerequisites
- Node.js (v18+)
- PostgreSQL (Make sure it's running locally)
- DBeaver (or any SQL client)

### 1. Database Setup
1. Open DBeaver and create a new PostgreSQL database named `notes_app`.
2. Create a `notes` table with the following schema:
   - `id` (UUID, Primary Key)
   - `user_id` (INT)
   - `title` (TEXT)
   - `content` (TEXT)
   - `preview` (TEXT)
   - `tags` (JSON/TEXT array)
   - `is_pinned` (BOOLEAN)
   - `is_favorite` (BOOLEAN)
   - `color_variant` (VARCHAR)
   - `image_url` (VARCHAR, Nullable)
   - `file_url` (VARCHAR, Nullable)
   - `created_at` (TIMESTAMP)
   - `updated_at` (TIMESTAMP)
   - `deleted_at` (TIMESTAMP, Nullable)

### 2. Backend Setup
1. Open a terminal and navigate to the `backend/` directory:
   ```bash
   cd backend