# PRD — Personal Notes Web App

**Nama sementara:** `MyNotes`  
**Tipe:** Personal Fullstack Web Application  
**Status:** Planning / MVP  
**Target:** Personal use, tetapi menggunakan fondasi engineering yang siap dikembangkan lebih lanjut  
**Repository:** 1 GitHub repository untuk frontend + backend

---

## 1. Ringkasan Produk

`MyNotes` adalah aplikasi web Notes pribadi untuk menyimpan, mengelola, mencari, dan mengorganisasi catatan secara cepat melalui antarmuka modern, responsif, dan memiliki animasi yang halus.

MVP difokuskan pada pengalaman penggunaan pribadi sehingga tidak menyediakan fitur kolaborasi, multi-tenant, social sharing, komentar, atau real-time collaboration. Meskipun demikian, struktur kode dibuat modular agar fitur-fitur tersebut dapat ditambahkan pada fase berikutnya tanpa perlu merombak keseluruhan aplikasi.

### Prinsip utama

1. **Simple** — fitur inti mudah dipahami dan tidak terlalu banyak.
2. **Fast** — interaksi UI terasa cepat dengan optimistic update pada aksi tertentu.
3. **Private** — catatan hanya dapat diakses melalui akun pengguna.
4. **Maintainable** — frontend dan backend dipisahkan dengan jelas walaupun berada dalam satu repository.
5. **Scalable enough** — desain database dan API tidak mengunci pengembangan di masa depan.
6. **Beautiful but useful** — animasi mendukung UX, bukan sekadar dekorasi.

---

# 2. Tujuan dan Target Pengguna (Goal & Target Audience)

## 2.1 Goal Produk

Membangun aplikasi Notes pribadi yang dapat digunakan sebagai:

- buku catatan digital;
- tempat mencatat ide dan tugas;
- dokumentasi pembelajaran/programming;
- tempat menyimpan checklist sederhana;
- knowledge base pribadi;
- arsip catatan yang mudah dicari kembali.

## 2.2 Target User

### Primary User

**1 orang pengguna utama / owner aplikasi.**

Karena aplikasi pada tahap awal hanya digunakan pribadi, sistem tidak perlu memiliki fitur role kompleks seperti admin/editor/viewer.

### Karakteristik penggunaan

User kemungkinan menggunakan aplikasi untuk:

- membuat catatan kuliah;
- mencatat ide project;
- menyimpan snippet atau informasi teknis;
- membuat catatan harian;
- mencatat task atau checklist;
- mencari kembali catatan lama.

## 2.3 Success Metrics MVP

MVP dianggap berhasil apabila:

- user dapat login dan logout dengan aman;
- user dapat membuat, membaca, mengubah, dan menghapus note;
- user dapat mencari note berdasarkan judul/konten;
- user dapat mengelompokkan note menggunakan tag;
- user dapat pin/favorite note penting;
- note yang dihapus masuk Trash dan dapat dipulihkan;
- aplikasi responsive pada desktop dan mobile;
- animasi UI tetap halus tanpa mengganggu interaksi utama;
- API memiliki validasi input dan error handling yang konsisten;
- database menggunakan migration sehingga perubahan schema dapat dilacak.

---

# 3. Scope MVP

## 3.1 Fitur yang Masuk MVP

### Authentication

- Login.
- Logout.
- Session berbasis server-side session.
- Password disimpan sebagai hash, bukan plaintext.
- Protected API route.

### Notes

- Create note.
- Read note.
- Update note.
- Delete note.
- Restore note dari Trash.
- Permanent delete dari Trash.
- Pin/unpin note.
- Favorite/unfavorite note.
- Draft status sederhana.
- `createdAt` dan `updatedAt`.

### Organization

- Tag.
- Filter berdasarkan tag.
- Filter berdasarkan status:
  - all;
  - pinned;
  - favorite;
  - trash.
- Sorting berdasarkan updated date / created date.

### Search

- Search judul.
- Search isi note.
- Debounce input pencarian.
- Empty state ketika data tidak ditemukan.

### UI/UX

- Responsive layout.
- Dark/light mode.
- Sidebar navigation.
- Modal / drawer untuk aksi tertentu.
- Toast notification.
- Loading skeleton.
- Empty state.
- Error state.
- Confirmation dialog untuk destructive action.
- Keyboard shortcut dasar.
- GSAP animation untuk page transition, card/list reveal, modal, sidebar, dan micro-interaction tertentu.

## 3.2 Di luar Scope MVP

Fitur berikut disiapkan sebagai kemungkinan fase berikutnya tetapi **tidak dikerjakan pada MVP**:

- real-time collaboration;
- sharing note publik;
- komentar;
- multi-user workspace;
- role & permission kompleks;
- file storage besar;
- sinkronisasi offline-first penuh;
- mobile native app;
- AI summarization;
- AI auto-tagging;
- end-to-end encryption;
- version history lengkap seperti Git;
- realtime WebSocket collaboration.

---

# 4. Analisis Kebutuhan Sistem (Requirement Analysis)

## 4.1 Functional Requirements

| ID | Requirement | Prioritas |
|---|---|---|
| FR-01 | User dapat login | Must |
| FR-02 | User dapat logout | Must |
| FR-03 | User dapat melihat daftar note | Must |
| FR-04 | User dapat membuat note | Must |
| FR-05 | User dapat membaca detail note | Must |
| FR-06 | User dapat mengedit note | Must |
| FR-07 | User dapat menghapus note | Must |
| FR-08 | User dapat restore note | Must |
| FR-09 | User dapat permanent delete note | Should |
| FR-10 | User dapat pin/unpin note | Should |
| FR-11 | User dapat favorite/unfavorite note | Should |
| FR-12 | User dapat membuat dan memasang tag | Should |
| FR-13 | User dapat mencari note | Must |
| FR-14 | User dapat filter note | Must |
| FR-15 | User dapat sorting note | Should |
| FR-16 | User dapat mengganti tema light/dark | Should |
| FR-17 | Sistem menampilkan toast/error feedback | Must |
| FR-18 | Sistem memiliki loading, empty, dan error state | Must |
| FR-19 | API melakukan validasi input | Must |
| FR-20 | API menggunakan centralized error handling | Must |

---

## 4.2 Non-Functional Requirements

| Area | Requirement |
|---|---|
| Performance | UI utama terasa responsif; query list menggunakan pagination/limit agar tidak mengambil seluruh database sekaligus |
| Security | Password di-hash, session cookie `httpOnly`, HTTPS pada production, input divalidasi |
| Maintainability | Frontend dan backend menggunakan module/domain berdasarkan fitur |
| Reliability | Error dari database/API tidak langsung bocor ke client dalam bentuk stack trace |
| Accessibility | Keyboard navigation dasar, semantic HTML, focus state, kontras teks memadai |
| Responsive | Layout mendukung mobile, tablet, desktop |
| Observability | Logging request/error menggunakan logger terstruktur |
| Deployment | Environment variable dipisahkan dari source code |
| Database | Migration digunakan untuk perubahan schema |
| Testing | Minimal unit/service test + API integration test untuk fitur core |

Express sendiri merekomendasikan validasi input, penggunaan Helmet, cookie yang aman, TLS/HTTPS pada production, perlindungan endpoint login dari brute force, dan perhatian pada dependency security. citeturn328262search1

---

# 5. User Stories

## Authentication

- Sebagai user, saya ingin login agar hanya saya yang dapat mengakses catatan pribadi.
- Sebagai user, saya ingin logout agar session tidak tetap aktif pada perangkat yang saya gunakan bersama orang lain.

## Notes

- Sebagai user, saya ingin membuat note baru agar ide/informasi dapat segera dicatat.
- Sebagai user, saya ingin mengedit note agar isi catatan dapat diperbarui.
- Sebagai user, saya ingin menghapus note agar catatan yang tidak dibutuhkan dapat dipindahkan ke Trash.
- Sebagai user, saya ingin restore note agar catatan yang terhapus tidak langsung hilang permanen.

## Search & Organization

- Sebagai user, saya ingin mencari kata tertentu agar dapat menemukan note lama dengan cepat.
- Sebagai user, saya ingin menggunakan tag agar note dapat dikelompokkan.
- Sebagai user, saya ingin pin note penting agar mudah diakses.

---

# 6. Alur Kerja Sistem (System Flow)

## 6.1 High-Level Flow

```mermaid
flowchart TD
    A[User membuka aplikasi] --> B{Sudah login?}
    B -- Tidak --> C[Login Page]
    C --> D[POST /api/auth/login]
    D --> E{Credential valid?}
    E -- Tidak --> C
    E -- Ya --> F[Create/restore session]
    B -- Ya --> G[Dashboard]
    F --> G

    G --> H[Load Notes]
    H --> I[(PostgreSQL)]
    I --> H

    G --> J{Aksi User}
    J --> K[Buat Note]
    J --> L[Edit Note]
    J --> M[Search / Filter]
    J --> N[Pin / Favorite]
    J --> O[Trash / Restore]

    K --> P[Validate Request]
    L --> P
    N --> P
    O --> P
    P --> Q[Service Layer]
    Q --> I
    I --> R[API Response]
    R --> G

    M --> S[Query Notes]
    S --> I
    I --> R
```

## 6.2 Create Note Flow

```mermaid
flowchart LR
    A[Klik New Note] --> B[Editor dibuka]
    B --> C[User menulis]
    C --> D[Client State]
    D --> E{Save action}
    E -->|Manual Save| F[POST / PUT API]
    E -->|Auto Save opsional| F
    F --> G[Zod Validation]
    G --> H[Note Service]
    H --> I[Prisma ORM]
    I --> J[(PostgreSQL)]
    J --> K[Response]
    K --> L[Update UI + Toast]
```

## 6.3 Login Flow

```mermaid
sequenceDiagram
    participant U as User
    participant W as React Web
    participant A as Express API
    participant DB as PostgreSQL

    U->>W: Submit login form
    W->>A: POST /api/auth/login
    A->>A: Validate request
    A->>DB: Find user
    DB-->>A: User + password hash
    A->>A: Verify password
    A->>DB: Create session
    A-->>W: Set HttpOnly session cookie
    W->>A: GET /api/auth/me
    A->>DB: Verify session
    DB-->>A: Session valid
    A-->>W: Current user
    W-->>U: Redirect to Dashboard
```

---

# 7. Arsitektur Aplikasi

## 7.1 Arsitektur yang Dipilih

Model arsitektur:

**React SPA → REST API → Service Layer → ORM → PostgreSQL**

```text
┌───────────────────────────────┐
│           Browser             │
│   React + Vite + TypeScript   │
│   Tailwind + GSAP              │
└───────────────┬───────────────┘
                │ HTTPS / JSON
                ▼
┌───────────────────────────────┐
│          Express API          │
│ Routes → Controllers →        │
│ Services → Repositories/ORM   │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│        Prisma ORM             │
│   Schema + Migration + Query  │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│         PostgreSQL            │
│ Users / Sessions / Notes /    │
│ Tags / NoteTags                │
└───────────────────────────────┘
```

Vite menyediakan development server dengan HMR dan build production yang dioptimalkan, sehingga cocok untuk SPA React seperti aplikasi ini. citeturn415070search4

Tailwind CSS v4 menyediakan integrasi khusus Vite melalui `@tailwindcss/vite`; dokumentasi Tailwind saat ini merekomendasikan pendekatan Vite tersebut untuk pengalaman development yang lebih baik. citeturn415070search6turn415070search8

GSAP bersifat framework-agnostic dan dapat digunakan pada React melalui package npm. citeturn415070search1

---

# 8. Sitemaps / Struktur Halaman

```text
/
├── /login
└── /app
    ├── /notes
    ├── /notes/new
    ├── /notes/:id
    ├── /notes/:id/edit
    ├── /pinned
    ├── /favorites
    ├── /tags
    ├── /trash
    └── /settings
        ├── /appearance
        └── /account
```

## Halaman MVP

### `/login`

Form login sederhana.

### `/app/notes`

Dashboard utama:

- sidebar;
- search bar;
- filter;
- sorting;
- note card/list;
- button New Note;
- pinned section opsional;
- recent notes.

### `/app/notes/new`

Editor note baru.

### `/app/notes/:id`

Detail note.

### `/app/notes/:id/edit`

Editor note.

### `/app/trash`

Note yang telah dihapus secara soft-delete.

### `/app/settings`

Pengaturan sederhana:

- theme;
- account;
- logout.

---

# 9. UI/UX Direction

## 9.1 Visual Style

Arah desain:

- modern;
- clean;
- minimal;
- slightly futuristic;
- rounded cards;
- soft shadow / subtle border;
- whitespace cukup luas;
- typography jelas;
- fokus pada konten note.

## 9.2 Layout

```text
┌──────────────────────────────────────────────────────────┐
│ Sidebar │                 Top Bar                         │
│         │  Search                 Profile / Theme        │
│ Notes   ├────────────────────────────────────────────────┤
│ Pinned  │                                                  │
│ Fav     │               Notes Workspace                   │
│ Trash   │                                                  │
│         │    ┌────────┐ ┌────────┐ ┌────────┐            │
│ Tags    │    │ Note 1 │ │ Note 2 │ │ Note 3 │            │
│         │    └────────┘ └────────┘ └────────┘            │
│         │                                                  │
│         │                    + New Note                    │
└──────────────────────────────────────────────────────────┘
```

## 9.3 Animation Guidelines

Gunakan GSAP secara terarah:

- initial page reveal;
- note card stagger;
- sidebar open/close;
- modal enter/exit;
- button micro-interaction;
- hover feedback;
- layout transition;
- empty state animation.

Hindari:

- animasi setiap text element secara berlebihan;
- animasi panjang pada operasi CRUD;
- animasi yang menyebabkan layout shift;
- animasi yang menghambat keyboard/input.

Gunakan `prefers-reduced-motion` untuk menghormati preferensi user terhadap motion.

---

# 10. Tech Stack

## 10.1 Frontend

| Teknologi | Fungsi |
|---|---|
| React | UI library |
| Vite | Dev server + build tool |
| TypeScript | Static typing |
| Tailwind CSS v4 | Styling |
| React Router | Client-side routing |
| GSAP | Animation |
| Lucide React | Icon |
| TanStack Query | Server-state fetching/caching |
| React Hook Form | Form management |
| Zod | Schema validation |
| React Markdown | Markdown rendering |
| Rehype Sanitize | Sanitization output markdown |

### Catatan

TanStack Query dipakai untuk komunikasi data server seperti notes, auth state tertentu, mutation, cache, dan invalidation. Jangan menjadikan state global sebagai tempat seluruh data API.

---

## 10.2 Backend

| Teknologi | Fungsi |
|---|---|
| Node.js | Runtime |
| Express.js | REST API server |
| TypeScript | Type safety |
| Prisma ORM | Database access + migration |
| PostgreSQL | Relational database |
| Zod | Request validation |
| express-session | Server-side session |
| connect-pg-simple | Session store di PostgreSQL |
| Argon2 | Password hashing |
| Helmet | Security headers |
| CORS | Cross-origin policy saat development/arsitektur terpisah |
| Pino / pino-http | Structured logging |
| express-rate-limit | Rate limiting endpoint sensitif |
| dotenv / env loader | Environment configuration |

Express menjelaskan bahwa CORS bukan mekanisme authorization; API yang privat tetap membutuhkan autentikasi/otorisasi. Express juga merekomendasikan cookie dengan opsi keamanan yang sesuai, Helmet, validasi input, TLS, serta perlindungan brute-force pada endpoint authorization. citeturn328262search0turn328262search1

---

# 11. Database Design

## 11.1 Entitas MVP

```text
User
 ├── Session
 └── Note
       └── NoteTag
              └── Tag
```

## 11.2 Tabel `users`

| Field | Type | Catatan |
|---|---|---|
| id | UUID | Primary key |
| email | VARCHAR | Unique |
| password_hash | TEXT | Hash Argon2 |
| name | VARCHAR | Display name |
| created_at | TIMESTAMP | Creation time |
| updated_at | TIMESTAMP | Last update |

## 11.3 Tabel `sessions`

| Field | Type | Catatan |
|---|---|---|
| id | UUID/string | Primary key |
| user_id | UUID | FK ke users |
| expires_at | TIMESTAMP | Session expiry |
| created_at | TIMESTAMP | Creation time |

## 11.4 Tabel `notes`

| Field | Type | Catatan |
|---|---|---|
| id | UUID | Primary key |
| user_id | UUID | FK ke users |
| title | VARCHAR(200) | Judul |
| content | TEXT | Isi markdown |
| is_pinned | BOOLEAN | Pin state |
| is_favorite | BOOLEAN | Favorite state |
| deleted_at | TIMESTAMP nullable | Soft delete |
| created_at | TIMESTAMP | Creation time |
| updated_at | TIMESTAMP | Last update |

## 11.5 Tabel `tags`

| Field | Type | Catatan |
|---|---|---|
| id | UUID | Primary key |
| user_id | UUID | Owner tag |
| name | VARCHAR(50) | Nama tag |
| slug | VARCHAR(60) | Unique per user |
| created_at | TIMESTAMP | Creation time |

## 11.6 Tabel `note_tags`

| Field | Type | Catatan |
|---|---|---|
| note_id | UUID | FK |
| tag_id | UUID | FK |

Primary key:

```text
(note_id, tag_id)
```

PostgreSQL memiliki dukungan `jsonb` dan indexing GIN, tetapi untuk MVP note utama sengaja disimpan sebagai `TEXT` agar struktur data tetap sederhana. `jsonb` dapat dipertimbangkan jika nanti editor menyimpan document structure kompleks. citeturn415070search0

---

# 12. API Design

Base URL:

```text
/api
```

## Auth

| Method | Endpoint | Fungsi |
|---|---|---|
| POST | `/auth/login` | Login |
| POST | `/auth/logout` | Logout |
| GET | `/auth/me` | Current user |

## Notes

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/notes` | List notes |
| GET | `/notes/:id` | Detail note |
| POST | `/notes` | Create |
| PATCH | `/notes/:id` | Update |
| DELETE | `/notes/:id` | Soft delete |
| POST | `/notes/:id/restore` | Restore |
| DELETE | `/notes/:id/permanent` | Permanent delete |
| PATCH | `/notes/:id/pin` | Toggle pin |
| PATCH | `/notes/:id/favorite` | Toggle favorite |

## Tags

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/tags` | List tags |
| POST | `/tags` | Create tag |
| PATCH | `/tags/:id` | Update tag |
| DELETE | `/tags/:id` | Delete tag |

---

# 13. API Response Convention

Gunakan format response yang konsisten.

### Success

```json
{
  "success": true,
  "data": {
    "id": "note-id",
    "title": "Belajar React",
    "content": "..."
  }
}
```

### Error

```json
{
  "success": false,
  "error": {
    "code": "NOTE_NOT_FOUND",
    "message": "Note tidak ditemukan"
  }
}
```

HTTP status utama:

```text
200 OK
201 Created
204 No Content
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Unprocessable Entity
429 Too Many Requests
500 Internal Server Error
```

---

# 14. Backend Layering

Setiap feature backend sebaiknya mengikuti alur:

```text
Route
  ↓
Controller
  ↓
Validation
  ↓
Service
  ↓
Repository / Prisma
  ↓
PostgreSQL
```

### Route

Menentukan endpoint HTTP.

### Controller

Membaca request dan menghasilkan response.

### Validation

Memastikan request sesuai schema menggunakan Zod.

### Service

Tempat business logic.

### Repository / Prisma

Tempat interaksi database.

### Middleware

Untuk cross-cutting concern seperti:

- auth;
- error handling;
- logging;
- rate limiting;
- security headers.

---

# 15. Frontend Architecture

Gunakan pendekatan feature-oriented agar tidak menjadi folder `components` raksasa.

```text
features/
├── auth/
├── notes/
├── tags/
└── settings/
```

Contoh `features/notes`:

```text
features/notes/
├── components/
│   ├── NoteCard.tsx
│   ├── NoteEditor.tsx
│   ├── NoteList.tsx
│   ├── NoteToolbar.tsx
│   └── NotePreview.tsx
├── hooks/
│   ├── useNotes.ts
│   └── useNoteMutations.ts
├── api/
│   └── notes.api.ts
├── types.ts
└── utils.ts
```

---

# 16. Struktur Folder Repository

Struktur awal yang direkomendasikan:

```text
mynotes/
│
├── apps/
│   ├── web/                              # React + Vite frontend
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── assets/
│   │   │   ├── components/               # Reusable UI global
│   │   │   │   ├── ui/
│   │   │   │   ├── layout/
│   │   │   │   └── feedback/
│   │   │   │
│   │   │   ├── features/
│   │   │   │   ├── auth/
│   │   │   │   │   ├── api/
│   │   │   │   │   ├── components/
│   │   │   │   │   ├── hooks/
│   │   │   │   │   └── types.ts
│   │   │   │   │
│   │   │   │   ├── notes/
│   │   │   │   │   ├── api/
│   │   │   │   │   ├── components/
│   │   │   │   │   ├── hooks/
│   │   │   │   │   ├── pages/
│   │   │   │   │   ├── animations/
│   │   │   │   │   └── types.ts
│   │   │   │   │
│   │   │   │   ├── tags/
│   │   │   │   └── settings/
│   │   │   │
│   │   │   ├── hooks/                    # Global hooks
│   │   │   ├── layouts/
│   │   │   ├── lib/                      # API client, utilities
│   │   │   ├── pages/                    # App-level pages
│   │   │   ├── routes/
│   │   │   ├── styles/
│   │   │   ├── types/
│   │   │   ├── App.tsx
│   │   │   └── main.tsx
│   │   │
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── api/                              # Express + TypeScript backend
│       ├── src/
│       │   ├── config/
│       │   │   ├── env.ts
│       │   │   └── logger.ts
│       │   │
│       │   ├── middlewares/
│       │   │   ├── auth.middleware.ts
│       │   │   ├── error.middleware.ts
│       │   │   ├── rate-limit.middleware.ts
│       │   │   └── not-found.middleware.ts
│       │   │
│       │   ├── modules/
│       │   │   ├── auth/
│       │   │   │   ├── auth.controller.ts
│       │   │   │   ├── auth.routes.ts
│       │   │   │   ├── auth.service.ts
│       │   │   │   ├── auth.schema.ts
│       │   │   │   └── auth.types.ts
│       │   │   │
│       │   │   ├── notes/
│       │   │   │   ├── notes.controller.ts
│       │   │   │   ├── notes.routes.ts
│       │   │   │   ├── notes.service.ts
│       │   │   │   ├── notes.schema.ts
│       │   │   │   └── notes.types.ts
│       │   │   │
│       │   │   └── tags/
│       │   │
│       │   ├── db/
│       │   │   └── prisma.ts
│       │   ├── utils/
│       │   ├── app.ts
│       │   └── server.ts
│       │
│       ├── prisma/
│       │   ├── schema.prisma
│       │   └── migrations/
│       │
│       ├── tests/
│       │   ├── unit/
│       │   └── integration/
│       │
│       ├── tsconfig.json
│       └── package.json
│
├── packages/
│   └── shared/                           # Shared types / validation schema
│       ├── src/
│       │   ├── schemas/
│       │   ├── types/
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
│
├── docs/
│   ├── architecture.md
│   └── api.md
│
├── .env.example
├── .gitignore
├── docker-compose.yml                    # PostgreSQL local development
├── package.json                           # Root workspace
├── README.md
└── prd.md
```

### Kenapa frontend + backend dalam satu repository?

Pendekatan ini cocok untuk MVP karena:

- satu GitHub repository;
- satu issue tracker;
- perubahan frontend/backend dapat berada dalam satu pull request;
- shared types dapat dipakai bersama;
- development lokal lebih mudah dikelola.

Root repository dapat menggunakan **npm workspaces** sehingga `apps/web`, `apps/api`, dan `packages/shared` berada dalam satu project workspace.

---

# 17. Repository & Branch Strategy

Untuk project personal, tidak perlu Git Flow yang berat.

Recommended:

```text
main
└── develop
    ├── feat/auth
    ├── feat/notes-crud
    ├── feat/search
    ├── feat/tags
    └── feat/ui-animation
```

Untuk project kecil, branch `develop` bahkan dapat dilewati dan feature branch langsung merge ke `main` setelah testing.

Commit convention:

```text
feat: add notes CRUD
fix: prevent duplicate tags
refactor: split note service
style: update note card animation
test: add notes service tests
docs: update API documentation
chore: update dependencies
```

---

# 18. Environment Variables

`.env` tidak boleh di-commit ke GitHub.

Contoh `.env.example`:

```env
NODE_ENV=development

PORT=5000

DATABASE_URL=postgresql://postgres:postgres@localhost:5432/mynotes

SESSION_SECRET=change-this-to-a-long-random-secret

WEB_URL=http://localhost:5173

COOKIE_NAME=mynotes_session
```

Untuk production:

- gunakan secret random yang panjang;
- gunakan HTTPS;
- jangan memasukkan secret ke source code;
- simpan environment variable pada platform deployment.

---

# 19. State Management Strategy

Tidak semua state perlu masuk global state.

## Local State

Gunakan React state untuk:

- modal open/close;
- editor input;
- UI toggle;
- selected note sementara.

## Server State

Gunakan TanStack Query untuk:

- list notes;
- detail note;
- tags;
- mutations;
- cache/invalidation;
- loading/error state API.

## Global UI State

Mulai tanpa state manager tambahan.

Jika kebutuhan berkembang, baru pertimbangkan Zustand untuk state UI tertentu seperti sidebar atau command palette.

---

# 20. Search Strategy

### MVP

Search menggunakan PostgreSQL query sederhana terhadap:

```text
notes.title
notes.content
```

Dengan index yang sesuai dan `ILIKE` untuk skala kecil.

### Future

Jika jumlah note sudah besar, dapat berkembang menjadi:

- PostgreSQL Full-Text Search;
- generated `tsvector` column;
- GIN index;
- ranking hasil pencarian.

Jangan memasukkan Elasticsearch/OpenSearch pada MVP karena tidak sebanding dengan kebutuhan personal app.

---

# 21. Pagination Strategy

List notes menggunakan pagination sederhana.

Contoh:

```http
GET /api/notes?page=1&limit=20
```

Response:

```json
{
  "success": true,
  "data": [],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 120,
    "totalPages": 6
  }
}
```

Untuk MVP personal, offset pagination sudah cukup. Cursor pagination dapat dipertimbangkan jika jumlah data berkembang besar.

---

# 22. Security Baseline

Walaupun aplikasi hanya untuk pribadi, anggap data note tetap sensitif.

## Wajib

- HTTPS saat production.
- `httpOnly` session cookie.
- `secure` cookie saat production.
- `sameSite` sesuai deployment.
- Password hashing dengan Argon2.
- Input validation dengan Zod.
- ORM/parameterized query untuk menghindari SQL injection.
- Helmet.
- Rate limit login.
- CORS dibatasi ke frontend yang valid.
- `.env` tidak di-commit.
- Jangan return stack trace ke user.
- Jangan simpan password di localStorage.

Express secara eksplisit merekomendasikan validasi input, HTTPS/TLS, Helmet, secure cookies, perlindungan brute-force, serta dependency hygiene untuk deployment production. citeturn328262search1

## CORS

Development:

```text
http://localhost:5173 → http://localhost:5000
```

Production sebaiknya dibatasi ke origin web yang benar-benar digunakan. CORS hanya mengatur izin browser untuk membaca response; CORS bukan pengganti authentication/authorization. citeturn328262search0

---

# 23. Error Handling

Gunakan centralized error middleware.

Contoh error internal:

```text
Database unavailable
```

Client tidak perlu menerima stack trace/database detail.

Client cukup menerima:

```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_SERVER_ERROR",
    "message": "Terjadi kesalahan pada server"
  }
}
```

Log detail tetap disimpan di server logger.

---

# 24. Testing Strategy

## Frontend

Minimal:

- component test untuk NoteCard;
- form validation test;
- interaction test untuk editor;
- route protection test.

Tools yang dapat digunakan:

- Vitest;
- React Testing Library;

## Backend

Minimal:

- unit test service;
- validation test;
- integration test untuk auth;
- integration test untuk notes CRUD.

Tools:

- Vitest;
- Supertest.

## Prioritas Testing MVP

```text
Auth → Notes CRUD → Search → Tags → UI interactions
```

---

# 25. Development Timeline / Sitetimeline

Estimasi berikut dibuat untuk development mandiri dan dapat disesuaikan.

## Phase 0 — Setup

```text
Day 1
├── Create GitHub repository
├── Setup npm workspace
├── Setup React + Vite + TypeScript
├── Setup Express + TypeScript
└── Setup ESLint + Prettier
```

## Phase 1 — Database & Backend Foundation

```text
Day 2–3
├── Setup PostgreSQL
├── Setup Prisma
├── Design User / Session / Note / Tag
├── Migration pertama
├── Express middleware
├── Error handler
└── Logging
```

## Phase 2 — Authentication

```text
Day 4–5
├── Login API
├── Session API
├── Password hashing
├── Auth middleware
└── Login page frontend
```

## Phase 3 — Notes Core

```text
Day 6–9
├── Notes API
├── Create note
├── Read note
├── Update note
├── Delete note
├── Restore note
└── Notes dashboard
```

## Phase 4 — Search & Organization

```text
Day 10–12
├── Search
├── Filter
├── Sort
├── Tags
├── Pin
└── Favorite
```

## Phase 5 — UI Polish

```text
Day 13–15
├── Responsive layout
├── Dark mode
├── GSAP animation
├── Skeleton/loading
├── Empty state
├── Error state
└── Micro interactions
```

## Phase 6 — Quality & Release

```text
Day 16–18
├── Unit tests
├── API integration tests
├── Security review
├── Performance review
├── Production environment
└── Deploy
```

---

# 26. Definition of Done — MVP

MVP dianggap selesai apabila:

### Backend

- [ ] Express API berjalan.
- [ ] PostgreSQL terhubung.
- [ ] Prisma schema selesai.
- [ ] Migration berhasil.
- [ ] Login/logout berjalan.
- [ ] Session bekerja.
- [ ] Notes CRUD berjalan.
- [ ] Trash/restore berjalan.
- [ ] Tags berjalan.
- [ ] Search berjalan.
- [ ] Validation berjalan.
- [ ] Error handler berjalan.
- [ ] Security middleware dasar berjalan.

### Frontend

- [ ] Login page selesai.
- [ ] Dashboard selesai.
- [ ] Notes list selesai.
- [ ] Note editor selesai.
- [ ] Search selesai.
- [ ] Filter/sort selesai.
- [ ] Tag UI selesai.
- [ ] Trash selesai.
- [ ] Dark/light mode selesai.
- [ ] Responsive selesai.
- [ ] Animation selesai.
- [ ] Loading/empty/error states selesai.

### Quality

- [ ] Tidak ada `.env` di GitHub.
- [ ] Tidak ada password plaintext.
- [ ] API error response konsisten.
- [ ] Lint berhasil.
- [ ] Test core berhasil.
- [ ] Production build berhasil.
- [ ] README setup lengkap.

---

# 27. Fase Pengembangan Berikutnya

Setelah MVP stabil, fitur dapat dikembangkan secara bertahap.

## V1.1

- autosave yang lebih baik;
- keyboard shortcut;
- command palette;
- archive note;
- note sorting lebih lengkap;
- improved search.

## V1.2

- rich text editor berbasis Tiptap;
- attachment sederhana;
- image upload;
- note preview yang lebih kaya;
- full-text search PostgreSQL.

## V2

- multi-user;
- sharing;
- public/private note;
- workspace;
- role & permission;
- collaborative editing;
- AI summary/tagging.

---

# 28. Technical Decisions / Keputusan Arsitektur

| Keputusan | Pilihan | Alasan |
|---|---|---|
| Frontend | React + Vite | Cocok untuk SPA personal app dan cepat dikembangkan |
| Language | TypeScript | Mengurangi error type dan meningkatkan maintainability |
| CSS | Tailwind v4 | Cepat untuk membuat UI custom dan konsisten |
| Animation | GSAP | Fleksibel untuk micro-interaction dan timeline animation |
| Backend | Express | Familiar, ringan, ecosystem luas |
| Database | PostgreSQL | Relational DB kuat dan cocok untuk structured data |
| ORM | Prisma | Type-safe DB access dan migration workflow |
| Validation | Zod | Schema validation yang bisa dipakai lintas layer |
| Auth | Session Cookie | Cocok untuk browser app dan tidak perlu menyimpan token auth di localStorage |
| State | TanStack Query | Cocok untuk server state |
| Icons | Lucide React | Ringan dan konsisten |
| Repo | Monorepo sederhana | Frontend/backend/shared berada dalam satu GitHub repository |
| Package manager | npm workspaces | Setup relatif sederhana untuk project mandiri |

Vite mendukung workflow modern dengan dev server/HMR dan optimized production build. Tailwind v4 memiliki integrasi Vite resmi. Prisma menyediakan dukungan PostgreSQL dan migration-oriented workflow. citeturn415070search4turn415070search6turn630605search0turn630605search2

---

# 29. Recommended Root Scripts

Target command pada root repository:

```bash
npm run dev
npm run dev:web
npm run dev:api
npm run build
npm run lint
npm run test
npm run db:migrate
npm run db:studio
```

Contoh konsep pembagian:

```text
npm run dev
    ├── web dev server
    └── api dev server
```

Untuk tahap awal, gunakan tool seperti `concurrently` atau script workspace yang sederhana agar kedua aplikasi bisa berjalan bersama.

---

# 30. Local Development

Recommended local architecture:

```text
Browser
  │
  ├── http://localhost:5173  → React/Vite
  │
  └── http://localhost:5000  → Express API
                                  │
                                  ▼
                         PostgreSQL :5432
```

`docker-compose.yml` dapat digunakan hanya untuk menjalankan PostgreSQL lokal agar setup environment lebih konsisten.

Contoh:

```yaml
services:
  postgres:
    image: postgres:latest
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: mynotes
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

Versi image PostgreSQL sebaiknya dipin ke major version yang dipilih untuk project, bukan selalu menggunakan `latest`, ketika sudah masuk environment yang lebih serius.

---

# 31. Deployment Strategy

## MVP

Pisahkan deployment menjadi:

```text
Frontend → Static hosting / CDN
Backend  → Node.js hosting
Database → Managed PostgreSQL
```

Contoh kategori platform:

- frontend: Vercel / Netlify / Cloudflare Pages;
- backend: Railway / Render / Fly.io / VPS;
- database: Neon / Supabase PostgreSQL / Railway PostgreSQL / managed PostgreSQL lain.

Pemilihan provider tidak mengubah arsitektur aplikasi selama backend tetap dapat mengakses PostgreSQL melalui `DATABASE_URL`.

## Production Flow

```text
GitHub
  ↓
CI / Build / Test
  ↓
Frontend Deploy
  ↓
Backend Deploy
  ↓
Managed PostgreSQL
```

---

# 32. GitHub Repository Convention

Recommended repository name:

```text
mynotes
```

README minimal berisi:

```text
# MyNotes

Personal Notes Fullstack Web App

## Tech Stack
- React
- Vite
- TypeScript
- Tailwind CSS v4
- GSAP
- Express
- PostgreSQL
- Prisma

## Project Structure
...

## Requirements
...

## Installation
...

## Environment Variables
...

## Development
...

## Testing
...

## Deployment
...
```

---

# 33. Final MVP Architecture Summary

```text
                         ┌───────────────────┐
                         │      Browser      │
                         │ React + Vite      │
                         │ TypeScript        │
                         │ Tailwind + GSAP   │
                         └─────────┬─────────┘
                                   │
                              HTTPS / JSON
                                   │
                         ┌─────────▼─────────┐
                         │    Express API    │
                         │                   │
                         │ Routes            │
                         │ Controllers       │
                         │ Validation        │
                         │ Services          │
                         │ Auth Middleware   │
                         │ Error Handler     │
                         └─────────┬─────────┘
                                   │
                            Prisma ORM
                                   │
                         ┌─────────▼─────────┐
                         │    PostgreSQL     │
                         │                   │
                         │ users             │
                         │ sessions          │
                         │ notes             │
                         │ tags              │
                         │ note_tags         │
                         └───────────────────┘
```

## Prinsip implementasi paling penting

> **Bangun core dulu, polish kemudian.**

Urutan implementasi yang disarankan:

```text
1. Repository + workspace
2. Frontend + backend bootstrap
3. PostgreSQL + Prisma
4. Auth + session
5. Notes CRUD
6. Search + tags + filter
7. Trash + restore
8. UI responsive
9. Animation GSAP
10. Testing + security + deployment
```

Dengan urutan tersebut, aplikasi tetap bisa digunakan sejak fitur inti selesai, sementara fitur visual dan tambahan dapat dikembangkan tanpa mengganggu fondasi backend.

---

# 34. Referensi Teknis

Dokumentasi resmi yang menjadi acuan saat menyusun stack:

- React: https://react.dev/
- Vite: https://vite.dev/guide/
- Tailwind CSS: https://tailwindcss.com/docs/
- GSAP: https://gsap.com/docs/v3/Installation/
- Express Security: https://expressjs.com/en/advanced/best-practice-security.html
- Express CORS: https://expressjs.com/en/resources/middleware/cors.html
- PostgreSQL: https://www.postgresql.org/docs/
- Prisma ORM: https://www.prisma.io/docs/orm

> Catatan: versi package sebaiknya dipin saat implementasi dimulai dan diperiksa ulang terhadap dokumentasi resmi masing-masing project. Jangan menyalin nomor versi dari PRD ini sebagai versi wajib.
