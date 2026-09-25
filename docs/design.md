# DESIGN — MyNotes Personal Notes Web App

**Produk:** MyNotes  
**Dokumen:** UI/UX & Design Specification  
**Status:** Design Planning / MVP  
**Basis desain:** Referensi visual dashboard productivity pada gambar yang diberikan user + requirement pada `prd.md`  
**Frontend target:** React + Vite + TypeScript + Tailwind CSS v4 + GSAP

---

## 1. Design Overview

MyNotes menggunakan pendekatan visual **modern productivity dashboard**: clean, rounded, spacious, ringan, dan fokus pada content-first experience.

Referensi gambar digunakan sebagai **arah visual**, bukan untuk disalin satu per satu. Elemen yang dipertahankan secara konseptual:

- sidebar kiri sebagai navigasi utama;
- top bar dengan search / command input;
- workspace utama yang luas;
- card-based content;
- rounded corner dan soft border/shadow;
- penggunaan warna aksen lembut pada card;
- typography sederhana dan mudah dipindai;
- micro-interaction yang halus;
- layout desktop sebagai primary experience dengan responsive adaptation ke tablet/mobile.

Elemen referensi yang tidak diperlukan untuk MyNotes akan dihilangkan, terutama:

- member/avatar collaboration;
- workspace/team management;
- contacts;
- calendar;
- project statistics yang tidak berhubungan dengan Notes.

Fokus utama MyNotes adalah **menulis, membaca, mencari, mengorganisasi, dan mengelola note pribadi**.

---

# 2. Design Goals

## 2.1 Primary Goals

1. User langsung memahami aplikasi dalam beberapa detik.
2. Membuat note baru menjadi aksi yang paling mudah ditemukan.
3. Search selalu mudah diakses.
4. Isi note tetap menjadi fokus utama, bukan dekorasi UI.
5. Navigasi desktop nyaman tetapi tidak terlalu memakan ruang.
6. Mobile tetap usable tanpa kehilangan fitur penting.
7. Animasi memberikan sense of quality tanpa memperlambat workflow.
8. UI memiliki visual identity sendiri, tetapi tetap sederhana untuk project personal.

## 2.2 Design Principles

### Content First

Catatan adalah produk utama. Decoration tidak boleh mengalahkan readability.

### Calm Interface

Gunakan neutral background, border tipis, shadow ringan, dan accent color secukupnya.

### Fast Interaction

Action seperti create, edit, favorite, pin, search, dan delete harus terasa instan.

### Predictable UI

Posisi action dan pattern interaksi harus konsisten antar halaman.

### Progressive Disclosure

Fitur tambahan seperti metadata, tags, dan destructive action tidak selalu ditampilkan secara dominan.

### Motion With Purpose

GSAP digunakan untuk hierarchy, feedback, transition, dan continuity — bukan untuk membuat semua elemen bergerak.

---

# 3. Visual Direction

## 3.1 Overall Mood

```text
Modern      ██████████
Minimal     ██████████
Friendly    ████████░░
Professional█████████░
Playful     ████░░░░░░
Futuristic  ██████░░░░
```

Karakter visual yang dituju:

- modern;
- clean;
- soft;
- slightly futuristic;
- productive;
- personal;
- approachable.

---

# 4. Design Tokens

## 4.1 Color System

Warna berikut menjadi baseline. Nilainya dapat disesuaikan ketika implementasi UI dimulai.

### Light Mode

| Token | Value | Usage |
|---|---|---|
| `bg-app` | `#F6F7FB` | Background utama aplikasi |
| `bg-surface` | `#FFFFFF` | Sidebar, card, modal |
| `bg-subtle` | `#F0F2F7` | Input, secondary surface |
| `text-primary` | `#171922` | Heading dan body utama |
| `text-secondary` | `#667085` | Supporting text |
| `text-muted` | `#98A2B3` | Placeholder / metadata |
| `border-soft` | `#E7EAF0` | Border |
| `accent` | `#6C63FF` | CTA, active state |
| `accent-soft` | `#EEECFF` | Active background |
| `success` | `#34B27B` | Success state |
| `warning` | `#F2B84B` | Warning |
| `danger` | `#E85D75` | Destructive action |

### Dark Mode

Gunakan versi dark yang tidak pure black agar nyaman untuk penggunaan lama.

| Token | Value | Usage |
|---|---|---|
| `bg-app` | `#101218` | Background aplikasi |
| `bg-surface` | `#181B24` | Surface |
| `bg-subtle` | `#20242F` | Input / secondary surface |
| `text-primary` | `#F5F7FA` | Primary text |
| `text-secondary` | `#AAB2C0` | Secondary text |
| `text-muted` | `#727B8D` | Metadata |
| `border-soft` | `#2B3040` | Border |
| `accent` | `#8A82FF` | Primary accent |
| `accent-soft` | `#25233F` | Active state |

> Accent utama terinspirasi dari referensi yang menggunakan purple/indigo sebagai CTA dan active navigation.

---

# 5. Typography

## 5.1 Font Direction

Gunakan font sans-serif modern dengan readability tinggi. Pilihan awal:

- **Inter** sebagai primary UI font;
- fallback: `ui-sans-serif`, `system-ui`, `sans-serif`.

## 5.2 Type Scale

| Style | Size | Weight | Usage |
|---|---:|---:|---|
| Display | 32px | 700 | Page title tertentu |
| H1 | 28px | 700 | Main page title |
| H2 | 22px | 700 | Section heading |
| H3 | 18px | 600 | Card / subsection |
| Body | 15px | 400 | Main content |
| Body Small | 13px | 400 | Supporting content |
| Label | 12px | 600 | Badge / metadata |
| Caption | 11px | 500 | Date / minor metadata |

### Typography rules

- Hindari terlalu banyak font weight dalam satu viewport.
- Note title menggunakan weight 600–700.
- Metadata tetap muted.
- Long note content gunakan line-height sekitar `1.7`.
- Jangan menggunakan uppercase untuk paragraph.

---

# 6. Spacing & Shape

## 6.1 Spacing

Gunakan spacing system berbasis kelipatan 4:

```text
4  / 8  / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64
```

## 6.2 Radius

| Token | Value | Usage |
|---|---:|---|
| `radius-sm` | 8px | Input kecil, badge |
| `radius-md` | 12px | Button, input |
| `radius-lg` | 16px | Note card |
| `radius-xl` | 20px | Panel besar |
| `radius-2xl` | 24px | App shell / modal |
| `radius-full` | 9999px | Avatar / pill |

## 6.3 Shadow

Shadow harus subtle.

```css
/* Concept only */
box-shadow: 0 8px 30px rgba(16, 24, 40, 0.06);
```

Gunakan border + shadow tipis. Jangan setiap element memiliki shadow.

---

# 7. Application Shell

## 7.1 Desktop Layout

Referensi utama mengikuti struktur dashboard pada gambar:

```text
┌───────────────────────────────────────────────────────────────────┐
│                         APP SHELL                                 │
├──────────────┬────────────────────────────────────────────────────┤
│              │ Top Bar                                            │
│              │ ┌──────── Search / Command ────────┐  Theme  User │
│   Sidebar    │────────────────────────────────────────────────────│
│              │                                                    │
│   MyNotes    │ Page Header                                        │
│              │ Title + description + action                       │
│   Notes      │                                                    │
│   Pinned     │ Quick Filters / Tags                               │
│   Favorites  │                                                    │
│   Tags       │                                                    │
│   Trash      │ Notes Workspace                                    │
│              │ ┌─────────┐ ┌─────────┐ ┌─────────┐                │
│              │ │  Note   │ │  Note   │ │  Note   │                │
│              │ └─────────┘ └─────────┘ └─────────┘                │
│              │                                                    │
│              │                                  + New Note        │
│   Settings   │                                                    │
└──────────────┴────────────────────────────────────────────────────┘
```

### Sidebar width

Desktop baseline:

```text
Expanded: 240–260px
Collapsed: 72px
```

Sidebar harus dapat collapse pada desktop dan berubah menjadi drawer/sheet pada mobile.

---

# 8. Sidebar Design

## 8.1 Header

```text
┌──────────────────────┐
│ ✦  MyNotes           │
└──────────────────────┘
```

Brand dapat menggunakan icon kecil berupa:

- notebook;
- spark;
- note/page;
- minimal abstract mark.

Tidak perlu logo kompleks untuk MVP.

## 8.2 Main Navigation

Urutan prioritas:

```text
Workspace

  ◉ All Notes
  📌 Pinned
  ♥ Favorites
  🏷 Tags
  🗑 Trash
```

`All Notes` menjadi navigation aktif utama.

## 8.3 Secondary Navigation

```text
General

  ⚙ Settings
```

Logout ditempatkan di bagian bawah sidebar.

## 8.4 Active Navigation

Mirip referensi:

- accent icon;
- accent text;
- soft accent background;
- radius `10–12px`;
- tidak menggunakan border tebal.

Contoh:

```text
┌──────────────────────────┐
│  ◉  All Notes             │  ← active
└──────────────────────────┘
```

---

# 9. Top Bar

Top bar mengikuti konsep referensi: clean dan tidak penuh.

```text
┌────────────────────────────────────────────────────────────────┐
│  [ sidebar toggle ]   [ 🔍 Search or type command... ]   ☼  ◎ │
└────────────────────────────────────────────────────────────────┘
```

## Elements

### Search / Command Input

Label:

```text
Search notes or type a command...
```

Shortcut badge:

```text
Ctrl + K
```

Fungsi awal:

- search note;
- jump to page;
- quick action New Note;
- toggle theme pada fase berikutnya.

### Right Actions

Desktop:

- theme toggle;
- optional command button;
- user avatar/menu.

Tidak perlu notification system pada MVP karena aplikasi bersifat personal.

---

# 10. Dashboard / All Notes

Route:

```text
/app/notes
```

## 10.1 Page Header

```text
My Notes
Your personal space for ideas, learning, tasks, and everyday thoughts.

                               [ + New Note ]
```

### Suggested wording

**Title:** `My Notes`  
**Subtitle:** `Keep your thoughts, ideas, and knowledge organized.`

Button:

```text
+ New Note
```

Primary CTA menggunakan accent color.

---

# 11. Quick Filter Bar

```text
[ All Notes ] [ Pinned ] [ Favorites ] [ Recent ]   [ Filter ▾ ] [ Sort ▾ ]
```

### Behavior

- active filter menggunakan `accent-soft`;
- inactive filter neutral;
- mobile menggunakan horizontal scroll;
- sorting menjadi dropdown.

---

# 12. Notes Workspace

## 12.1 Default Card Layout

Gunakan card grid yang terinspirasi dari moodboard referensi, tetapi jangan menggunakan masonry terlalu ekstrem untuk MVP.

Desktop:

```text
┌───────────────┐  ┌───────────────┐  ┌───────────────┐
│ TAG       ⋮   │  │ TAG       ⋮   │  │ PINNED    ⋮   │
│               │  │               │  │               │
│ Note title    │  │ Note title    │  │ Note title    │
│               │  │               │  │               │
│ Short preview │  │ Short preview │  │ Short preview │
│               │  │               │  │               │
│ Updated 2h    │  │ Updated 1d    │  │ Updated 3d    │
└───────────────┘  └───────────────┘  └───────────────┘
```

### Card hierarchy

1. Tag / state badges.
2. Note title.
3. Content preview.
4. Date metadata.
5. Context action menu.

## 12.2 Card Variants

### Standard

Neutral white/dark surface.

### Pinned

Tambahkan pin icon dan sedikit accent cue.

### Favorite

Star/heart indicator.

### Archived/Trash

Muted style.

### Selected

Accent border / tinted background.

---

# 13. Note Color System

Warna pastel dari referensi boleh digunakan secara **opsional** sebagai visual note card.

Recommended palette:

```text
Lavender  #EEEAFD
Mint      #E6F7EE
Soft Blue #E7F0FF
Soft Yellow #FFF6CC
Soft Pink #FDE8F0
Peach     #FFF0E5
```

### Important rule

Pastel color bukan identitas dari kategori. Tag tetap menjadi metadata semantik.

Jadi:

```text
Warna ≠ kategori
Tag   = kategori
```

Hal ini membuat theme lebih fleksibel dan accessibility lebih aman.

---

# 14. Note Card Content

Contoh:

```text
┌────────────────────────────────────┐
│ React        📌                    │
│                                    │
│ Belajar React Query                │
│                                    │
│ Catatan mengenai server state,     │
│ caching, query invalidation, dan   │
│ mutation pada aplikasi React.      │
│                                    │
│ Updated 24 Sep 2026            ⋯   │
└────────────────────────────────────┘
```

### Content preview

- maksimal sekitar 2–4 baris;
- gunakan line clamp;
- jangan menampilkan seluruh isi note pada card.

---

# 15. New Note CTA

CTA harus selalu mudah ditemukan.

Desktop:

```text
┌────────────────┐
│ ＋  New Note   │
└────────────────┘
```

Mobile:

```text
┌───────┐
│  ＋   │
└───────┘
```

Pada mobile, CTA dapat menjadi floating action button jika tidak mengganggu keyboard/editor.

---

# 16. Note Editor

Route:

```text
/app/notes/new
/app/notes/:id/edit
```

Editor harus jauh lebih fokus daripada dashboard.

```text
┌──────────────────────────────────────────────────────────┐
│ ← Back     Untitled note                Save ✓   ⋯       │
├──────────────────────────────────────────────────────────┤
│                                                          │
│ Add title...                                             │
│                                                          │
│ Tags: [ React ] [ Study ]       Updated just now        │
│                                                          │
│ Start writing...                                         │
│                                                          │
│                                                          │
│                                                          │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

## Editor Priorities

1. title;
2. writing area;
3. save state;
4. tags;
5. secondary actions.

## Save state

Gunakan status kecil:

```text
Saving...
Saved
Unsaved changes
```

Jangan menggunakan toast untuk setiap keystroke.

---

# 17. Note Detail Page

Untuk membaca note panjang, gunakan reading layout.

```text
┌──────────────────────────────────────────────────────────┐
│ ← Back                              Edit     ⋯            │
│                                                          │
│ React Query Notes                                        │
│ React · Frontend · Study                                 │
│                                                          │
│ Updated 24 Sep 2026                                      │
│ ───────────────────────────────────────────────────────  │
│                                                          │
│ # React Query                                            │
│                                                          │
│ Isi note markdown...                                     │
│                                                          │
│ ## Query                                                 │
│                                                          │
│ Lorem ipsum...                                           │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

Reading content sebaiknya memiliki max-width sekitar `720–800px` agar nyaman dibaca.

---

# 18. Search Experience

Search menjadi salah satu fitur utama berdasarkan PRD.

## Search overlay

```text
┌─────────────────────────────────────────────────────┐
│ 🔍  react                                              │
├─────────────────────────────────────────────────────┤
│ NOTES                                                 │
│                                                      │
│ React Query Basics                           ↵       │
│ React Router Notes                           ↵       │
│ Belajar React Context                       ↵       │
│                                                      │
│ ACTIONS                                               │
│ Create new note                             Ctrl N    │
└─────────────────────────────────────────────────────┘
```

## Search behavior

- debounce input;
- highlight matching query jika mudah dilakukan;
- tampilkan title + content preview;
- `Enter` membuka note;
- `Esc` menutup search overlay;
- `Ctrl/Cmd + K` fokus search.

---

# 19. Tags UI

## Tag Badge

```text
[ React ] [ Backend ] [ Personal ]
```

Style:

- compact;
- soft background;
- rounded-full;
- text 11–12px;
- tidak terlalu banyak warna.

## Tags Page

Route:

```text
/app/tags
```

Layout sederhana:

```text
Tags
Manage labels used to organize your notes.

[ React  12 ] [ Study  8 ] [ Ideas  5 ] [ Personal  4 ]
```

Klik tag membuka filtered notes.

---

# 20. Pinned & Favorites

Pinned dan Favorites memiliki halaman ringan.

### Pinned

```text
Pinned Notes
Your most important notes.
```

### Favorites

```text
Favorites
Notes you marked for quick access.
```

Tidak perlu membuat dua sistem UI yang benar-benar berbeda. Gunakan reusable `NotesGrid` + filter state.

---

# 21. Trash

Route:

```text
/app/trash
```

Visual lebih muted.

```text
Trash
Deleted notes are kept here before permanent deletion.

[ Restore ] [ Delete Permanently ]
```

Destructive action harus memerlukan confirmation dialog untuk permanent delete.

---

# 22. Settings

Route:

```text
/app/settings
```

MVP hanya membutuhkan:

```text
Settings

Appearance
  Theme          System / Light / Dark

Account
  Name
  Email

Session
  Log out
```

Tidak perlu membuat settings menjadi dashboard kompleks.

---

# 23. Login Screen

Login adalah satu-satunya halaman yang tidak menggunakan dashboard shell.

```text
┌────────────────────────────────────────────────────┐
│                                                    │
│                    ✦ MyNotes                       │
│                                                    │
│              Your private note space               │
│                                                    │
│ Email                                              │
│ ┌──────────────────────────────────────────────┐   │
│ │ you@example.com                              │   │
│ └──────────────────────────────────────────────┘   │
│                                                    │
│ Password                                           │
│ ┌──────────────────────────────────────────────┐   │
│ │ ••••••••••••                                │   │
│ └──────────────────────────────────────────────┘   │
│                                                    │
│ ┌──────────────────────────────────────────────┐   │
│ │              Sign in                        │   │
│ └──────────────────────────────────────────────┘   │
│                                                    │
└────────────────────────────────────────────────────┘
```

Pada MVP personal, login cukup simple. Jangan menambahkan social login atau registration flow yang tidak ada di requirement.

---

# 24. Responsive Design

## 24.1 Breakpoints

Gunakan breakpoint Tailwind standar sebagai baseline.

### Desktop

```text
≥ 1280px
```

- expanded sidebar;
- 3–4 column notes grid;
- full top bar;
- editor centered.

### Tablet

```text
768px – 1279px
```

- sidebar dapat collapse;
- 2–3 column grid;
- reduced gaps.

### Mobile

```text
< 768px
```

- sidebar menjadi drawer;
- 1 column notes;
- top search menjadi full/overlay;
- CTA New Note menjadi compact;
- card menu lebih sederhana;
- filters horizontal scroll.

---

# 25. Mobile Navigation

Desktop sidebar berubah menjadi:

```text
┌────────────────────────────────────┐
│ ☰  MyNotes                      ◎  │
├────────────────────────────────────┤
│                                    │
│            Page Content             │
│                                    │
└────────────────────────────────────┘
```

Klik menu membuka drawer:

```text
┌──────────────────┐
│ MyNotes       ×  │
├──────────────────┤
│ All Notes        │
│ Pinned           │
│ Favorites        │
│ Tags             │
│ Trash            │
│                  │
│ Settings         │
│ Log out          │
└──────────────────┘
```

---

# 26. Components Inventory

## Global Components

```text
Button
IconButton
Input
Textarea
Badge
Avatar
Tooltip
DropdownMenu
Dialog
Drawer
Toast
Skeleton
EmptyState
ErrorState
Spinner
```

## Layout Components

```text
AppShell
Sidebar
TopBar
MobileHeader
PageContainer
```

## Notes Components

```text
NoteCard
NoteGrid
NoteList
NoteEditor
NoteViewer
NoteToolbar
NoteFilterBar
TagBadge
NoteContextMenu
NoteDeleteDialog
SaveStatus
```

## Search Components

```text
SearchInput
CommandPalette
SearchResultItem
SearchOverlay
```

---

# 27. Iconography

Gunakan **Lucide React** sebagai icon system utama.

Recommended icons:

| Purpose | Icon |
|---|---|
| All Notes | `NotebookTabs` / `StickyNote` |
| New Note | `Plus` |
| Search | `Search` |
| Pinned | `Pin` |
| Favorite | `Star` |
| Tags | `Tag` |
| Trash | `Trash2` |
| Settings | `Settings` |
| Theme | `Sun` / `Moon` |
| Menu | `Menu` |
| Close | `X` |
| Back | `ArrowLeft` |
| Save | `Check` |
| More | `Ellipsis` |
| Edit | `Pencil` |
| Restore | `RotateCcw` |

Aturan icon:

- gunakan stroke yang konsisten;
- default sekitar 18–20px;
- jangan mencampur banyak icon library;
- icon harus punya tooltip bila action tidak obvious.

---

# 28. GSAP Motion System

GSAP menjadi animation engine utama.

## 28.1 Motion Principles

```text
Micro interaction: 120–220ms
Small transition: 180–300ms
Page transition: 250–500ms
```

Durasi dapat disesuaikan berdasarkan device dan kompleksitas animation.

## 28.2 Page Enter

Sequence:

```text
Page shell
   ↓
Header fade + translateY
   ↓
Filter bar
   ↓
Notes stagger
```

Pseudo-flow:

```text
opacity: 0 → 1
translateY: 12px → 0
stagger: 40–70ms
```

## 28.3 Sidebar

Open:

```text
x: -20px → 0
opacity: 0 → 1
```

Close:

```text
x: 0 → -20px
opacity: 1 → 0
```

Desktop collapse cukup menggunakan transform/width transition ringan.

## 28.4 Note Card

Hover:

```text
scale: 1 → 1.01
translateY: 0 → -2px
```

Jangan memperbesar berlebihan.

## 28.5 Modal / Dialog

```text
Overlay: opacity 0 → 1
Dialog: opacity 0 → 1
         scale 0.96 → 1
         y 8px → 0
```

## 28.6 Toast

```text
x: 20px → 0
opacity: 0 → 1
```

Exit dengan reverse animation.

## 28.7 Reduced Motion

Semua motion dekoratif harus bisa dikurangi ketika user menggunakan:

```css
@media (prefers-reduced-motion: reduce) {
  /* reduce / disable non-essential transitions */
}
```

---

# 29. Interaction Patterns

## Hover

Hover hanya memberikan feedback kecil:

- background shift;
- border accent;
- translateY kecil;
- icon color change.

## Focus

Semua input/button harus memiliki visible focus ring.

## Pressed

Button menggunakan subtle scale/opacity change.

## Disabled

- lower contrast;
- pointer disabled;
- tetap readable.

---

# 30. Loading States

Gunakan skeleton untuk data list.

Contoh:

```text
┌───────────────────┐
│ ███████           │
│                   │
│ █████████████     │
│ ████████          │
│                   │
│ █████             │
└───────────────────┘
```

Hindari spinner full-page untuk request yang hanya mengubah satu card.

---

# 31. Empty States

## No Notes

```text
        ✦

No notes yet
Start writing your first note and keep your ideas in one place.

       [ + New Note ]
```

## No Search Results

```text
No notes found
Try another keyword or create a new note.
```

## Empty Trash

```text
Trash is empty
Deleted notes will appear here.
```

Empty states harus membantu user memahami langkah selanjutnya.

---

# 32. Error States

Error tidak boleh terlihat seperti error teknis backend.

Bad:

```text
PrismaClientKnownRequestError...
```

Good:

```text
Something went wrong
We couldn't load your notes right now.

[ Try again ]
```

Detail teknis cukup dicatat pada backend logging.

---

# 33. Toast System

## Success

```text
✓ Note saved
```

## Error

```text
× Failed to save note
```

## Restore

```text
↻ Note restored
```

## Delete

```text
Note moved to trash
```

Toast jangan digunakan untuk informasi yang harus dibaca lama.

---

# 34. Confirmation Dialog

Digunakan untuk:

- permanent delete;
- logout dari session jika ada unsaved changes;
- destructive setting tertentu.

Contoh:

```text
Delete note permanently?

This action cannot be undone.

[ Cancel ]  [ Delete permanently ]
```

Button destructive harus jelas tetapi tidak mendominasi seluruh UI.

---

# 35. Accessibility

Design harus mempertahankan aksesibilitas dasar.

Checklist:

- semantic HTML;
- keyboard navigable;
- visible focus state;
- buttons memiliki accessible name;
- icon-only action memiliki tooltip/aria-label;
- color bukan satu-satunya penanda state;
- contrast teks memadai;
- modal mengunci focus secara benar;
- `Esc` untuk close overlay;
- reduced motion support.

---

# 36. Content & Copywriting

Tone:

- personal;
- calm;
- concise;
- professional tetapi tidak kaku.

Contoh:

| Context | Copy |
|---|---|
| Dashboard title | `My Notes` |
| Dashboard subtitle | `Keep your thoughts, ideas, and knowledge organized.` |
| New note | `New Note` |
| Empty state | `Start writing your first note.` |
| Search placeholder | `Search notes or type a command...` |
| Save status | `Saved` |
| Delete | `Move to trash` |
| Permanent delete | `Delete permanently` |
| Settings | `Settings` |

---

# 37. Design Mapping to PRD

| PRD Requirement | Design Implementation |
|---|---|
| CRUD Notes | Dashboard + editor + detail page |
| Search | Top bar + command/search overlay |
| Pin | Pin icon + pinned filter |
| Favorite | Star/heart icon + favorites filter |
| Tags | Tag badge + Tags page/filter |
| Trash | Dedicated Trash page + confirmation |
| Light/Dark | Theme toggle + token-based colors |
| Responsive | Sidebar drawer + responsive grid |
| Toast | Global feedback system |
| Loading | Skeleton components |
| Empty state | Dedicated UX per context |
| Error state | Recoverable error UI |
| GSAP | Page, card, drawer, modal, micro-interaction |
| Keyboard shortcut | `Ctrl/Cmd + K`, `Ctrl/Cmd + N`, `Esc` |
| Accessibility | Focus, semantic HTML, reduced motion |

---

# 38. Recommended Dashboard Composition

Final dashboard composition untuk MVP:

```text
┌───────────────────────────────────────────────────────────────────┐
│ Sidebar │ Search notes or type a command...       ☼   Avatar     │
├─────────┼─────────────────────────────────────────────────────────┤
│         │                                                         │
│ MyNotes │ My Notes                                  + New Note    │
│         │ Keep your thoughts, ideas, and knowledge organized.    │
│         │                                                         │
│ All     │ [ All ] [ Pinned ] [ Favorites ] [ Recent ]  Filter    │
│ Pinned  │                                                         │
│ Favorite│ Recent Notes                                           │
│ Tags    │                                                         │
│ Trash   │ ┌────────────┐ ┌────────────┐ ┌────────────┐            │
│         │ │ React      │ │ Project    │ │ Daily      │            │
│         │ │ Learn React│ │ API Plan   │ │ Journal    │            │
│         │ │ ...        │ │ ...        │ │ ...        │            │
│         │ └────────────┘ └────────────┘ └────────────┘            │
│         │                                                         │
│ Settings│ ┌────────────┐ ┌────────────┐ ┌────────────┐            │
│ Logout  │ │ Backend    │ │ Ideas      │ │ Personal   │            │
│         │ │ ...        │ │ ...        │ │ ...        │            │
└─────────┴─────────────────────────────────────────────────────────┘
```

---

# 39. Route-to-Design Mapping

| Route | Layout | Main Components |
|---|---|---|
| `/login` | Auth Layout | Login Form |
| `/app/notes` | App Shell | PageHeader, Filters, NoteGrid |
| `/app/notes/new` | Editor Layout | NoteEditor |
| `/app/notes/:id` | Reader Layout | NoteViewer |
| `/app/notes/:id/edit` | Editor Layout | NoteEditor |
| `/app/pinned` | App Shell | Filtered NoteGrid |
| `/app/favorites` | App Shell | Filtered NoteGrid |
| `/app/tags` | App Shell | TagList |
| `/app/trash` | App Shell | TrashNoteList |
| `/app/settings` | App Shell | SettingsSections |

---

# 40. Frontend Component Structure Recommendation

```text
src/
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   ├── Dialog.tsx
│   │   ├── Drawer.tsx
│   │   ├── Dropdown.tsx
│   │   ├── Toast.tsx
│   │   └── Skeleton.tsx
│   │
│   ├── layout/
│   │   ├── AppShell.tsx
│   │   ├── Sidebar.tsx
│   │   ├── TopBar.tsx
│   │   └── MobileHeader.tsx
│   │
│   └── feedback/
│       ├── EmptyState.tsx
│       └── ErrorState.tsx
│
├── features/
│   ├── auth/
│   ├── notes/
│   │   ├── components/
│   │   │   ├── NoteCard.tsx
│   │   │   ├── NoteGrid.tsx
│   │   │   ├── NoteEditor.tsx
│   │   │   ├── NoteViewer.tsx
│   │   │   ├── NoteToolbar.tsx
│   │   │   └── NoteFilterBar.tsx
│   │   └── animations/
│   │       ├── noteGrid.animation.ts
│   │       ├── noteCard.animation.ts
│   │       └── editor.animation.ts
│   ├── tags/
│   └── settings/
│
└── styles/
    ├── globals.css
    └── tokens.css
```

---

# 41. Tailwind Implementation Direction

Gunakan semantic CSS variables untuk design token.

Contoh konsep:

```css
:root {
  --color-bg-app: #f6f7fb;
  --color-bg-surface: #ffffff;
  --color-text-primary: #171922;
  --color-accent: #6c63ff;
  --color-border-soft: #e7eaf0;
}
```

Tailwind utility kemudian menggunakan token tersebut, sehingga perubahan tema tidak memerlukan perubahan class di seluruh component.

Gunakan Tailwind untuk:

- spacing;
- layout;
- typography;
- responsive behavior;
- state styles.

Gunakan CSS biasa / variable untuk:

- tokens;
- global editor typography;
- rich markdown content;
- special animation helper bila diperlukan.

---

# 42. GSAP File Organization

Jangan menaruh semua animation di satu file.

Recommended:

```text
features/notes/animations/
├── noteGrid.animation.ts
├── noteCard.animation.ts
├── editor.animation.ts
└── modal.animation.ts
```

Global:

```text
lib/animations/
├── motion.config.ts
├── pageTransition.ts
└── reducedMotion.ts
```

Animation harus dipisahkan dari business logic.

---

# 43. UI State Matrix

| Component | Loading | Empty | Error | Success |
|---|---|---|---|---|
| NoteGrid | Skeleton | EmptyState | ErrorState | Cards |
| Search | Spinner kecil | No result | Inline error | Result list |
| Editor | Initial loader | New note | Save error | Saved |
| Trash | Skeleton | Empty trash | ErrorState | Deleted notes |
| Tags | Skeleton | No tags | ErrorState | Tag list |

---

# 44. Design QA Checklist

Sebelum setiap feature dianggap selesai:

### Visual

- [ ] spacing konsisten;
- [ ] typography sesuai token;
- [ ] border dan radius konsisten;
- [ ] icon size konsisten;
- [ ] light mode checked;
- [ ] dark mode checked.

### Interaction

- [ ] hover state;
- [ ] focus state;
- [ ] active state;
- [ ] disabled state;
- [ ] loading state;
- [ ] error state;
- [ ] empty state.

### Responsive

- [ ] mobile;
- [ ] tablet;
- [ ] desktop;
- [ ] sidebar collapse/drawer;
- [ ] no horizontal overflow.

### Animation

- [ ] animation tidak menghambat action;
- [ ] no layout jump;
- [ ] reduced motion diperhatikan;
- [ ] initial load tetap cepat.

### Accessibility

- [ ] keyboard navigation;
- [ ] focus visible;
- [ ] aria-label icon-only;
- [ ] sufficient contrast;
- [ ] dialog focus handling.

---

# 45. MVP Design Scope

Untuk menjaga project tetap realistis, implementasi desain MVP diprioritaskan pada:

### Phase 1 — Foundation

- App Shell
- Sidebar
- Top Bar
- Theme system
- Buttons / Inputs / Badge / Dialog
- Responsive layout

### Phase 2 — Notes Core

- Notes grid
- Note card
- New Note
- Note editor
- Note detail
- Edit note

### Phase 3 — Organization

- Search
- Tags
- Pinned
- Favorites
- Trash

### Phase 4 — Motion & Polish

- GSAP page reveal
- card stagger
- sidebar animation
- modal animation
- micro-interactions
- reduced-motion support

### Phase 5 — QA

- mobile polish;
- keyboard shortcuts;
- accessibility pass;
- dark mode pass;
- loading/error/empty states.

---

# 46. Future Design Extensions

Tidak masuk MVP, tetapi visual system harus memungkinkan pengembangan:

- markdown toolbar lebih lengkap;
- command palette yang lebih powerful;
- note templates;
- note attachments;
- AI assistant;
- note version history;
- offline mode;
- multi-device sync;
- collaborative workspace;
- richer editor seperti block editor.

Jangan mendesain fitur future seolah-olah sudah tersedia pada MVP.

---

# 47. Final Design Direction

Versi final desain MyNotes mengambil **struktur dashboard dari referensi**, tetapi mengubah fokus menjadi aplikasi Notes personal:

```text
REFERENSI
Productivity dashboard
        ↓
Sidebar + top search + card workspace
        ↓
DIADAPTASI
Personal Notes dashboard
        ↓
All Notes + Pinned + Favorites + Tags + Trash
        ↓
CORE EXPERIENCE
Search → Open → Read → Edit → Save
              ↓
           New Note
```

### Visual identity final

```text
Clean + Soft + Modern + Personal
          ↓
Neutral UI
+ Purple/Indigo Accent
+ Pastel Note Cards
+ Rounded Surface
+ Subtle Shadow
+ GSAP Motion
          ↓
Fast personal knowledge workspace
```

Desain ini sengaja mempertahankan kesederhanaan MVP dari `prd.md`: tidak ada collaboration UI, member management, calendar, contacts, atau workspace/team complexity. Semua komponen visual diarahkan pada satu tujuan utama: **membuat dan menemukan kembali catatan pribadi dengan cepat dan nyaman.**

---

# 48. Implementation Reference

Dokumen terkait:

```text
/prd.md
/design.md
```

Urutan implementasi yang direkomendasikan:

```text
PRD
 ↓
Design Tokens
 ↓
App Shell
 ↓
Reusable UI Components
 ↓
Notes Dashboard
 ↓
Note Editor / Viewer
 ↓
Search / Tags / Pinned / Favorites / Trash
 ↓
GSAP Motion
 ↓
Responsive & Accessibility QA
```

---

**Design Status:** Ready for UI implementation  
**Scope:** Personal Notes MVP  
**Primary Reference:** User-provided visual reference + `prd.md`
