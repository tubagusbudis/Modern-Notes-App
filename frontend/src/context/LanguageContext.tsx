import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'id' | 'en';

export const translations = {
  en: {
    // Auth & Login
    appName: "MyNotes",
    tagline: "Your private, playful note space",
    signIn: "Sign In",
    createAccount: "Create Account",
    username: "Username",
    usernamePlaceholder: "Enter your username",
    password: "Password",
    passwordPlaceholder: "Enter your password",
    passwordMin: "Min. 6 characters",
    forgotPassword: "Forgot Password?",
    signingIn: "Signing in...",
    creatingAccount: "Creating account...",
    signInBtn: "Sign In 🚀",
    createAccountBtn: "Create Account 🚀",
    authFooter: "© 2026 Tubagus Budi S. All rights reserved.",
    resetPassword: "Reset Password",
    resetPasswordDesc: "Enter username and new password",
    newPassword: "New Password",
    cancel: "Cancel",
    reset: "Reset",
    updating: "Updating...",
    loginFailed: "Login failed. Please try again.",
    registerFailed: "Registration failed. Please try again.",
    resetSuccess: "Password updated successfully! You can now sign in.",
    resetError: "Failed to reset password.",

    // Sidebar & Navigation
    workspace: "WORKSPACE",
    allNotes: "All Notes",
    pinned: "Pinned",
    favorites: "Favorites",
    tags: "Tags",
    trash: "Trash",
    settings: "Settings",

    // TopBar
    searchPlaceholder: "Search notes or tags...",
    openSidebar: "Open sidebar",
    openUserMenu: "Open user menu",
    signedIn: "Signed in",
    signOut: "Sign out",

    // Notes Dashboard & Common
    myNotes: "My Notes",
    myNotesSubtitle: "Keep your thoughts, ideas, and knowledge organized.",
    newNote: "+ New Note",
    filterAll: "All Notes",
    filterPinned: "Pinned",
    filterFavorites: "Favorites",
    gridView: "Grid View",
    listView: "List View",
    noResultsFound: "No results found",
    noNotesYet: "No notes yet",
    noResultsDesc: 'We couldn\'t find anything matching "{query}".',
    createFirstNote: "Create your first note to get started.",
    createNote: "Create Note",
    untitledNote: "Untitled Note",
    noContentPreview: "No content preview available...",
    hasAttachment: "Has attachment",
    deleteNote: "Delete note",

    // Note Detail & Viewer
    readingMode: "Reading Mode 📖",
    backToNotes: "Back to notes",
    toggleFavorite: "Toggle Favorite",
    togglePin: "Toggle Pin",
    edit: "Edit",
    updated: "Updated",
    noteNotFound: "Note not found",

    // Note Editor
    editingNote: "Editing Note ✏️",
    untitledNoteEditor: "Untitled Note 📝",
    saved: "Saved",
    saving: "Saving...",
    unsavedChanges: "Unsaved changes",
    noteTitlePlaceholder: "Note title...",
    tagsLabel: "Tags:",
    addTag: "+ Add tag",
    typeTag: "Type tag...",
    attachImage: "Attach Image",
    attachFile: "Attach File",
    moveToTrash: "Move to trash",
    removeImage: "Remove image",
    removeFile: "Remove file",
    startWriting: "Start writing your thoughts...",
    goBack: "Go back",

    // Pinned Notes Page
    pinnedNotesTitle: "Pinned Notes",
    pinnedNotesSubtitle: "Your most important notes.",
    noPinnedNotes: "No pinned notes",
    noPinnedDesc: "Pin a note to easily access it here.",

    // Favorite Notes Page
    favoriteNotesTitle: "Favorite Notes",
    favoriteNotesSubtitle: "Notes you marked for quick access.",
    noFavoriteNotes: "No favorite notes",
    noFavoriteDesc: "Favorite a note to keep it handy here.",

    // Trash Page
    trashTitle: "Trash",
    trashSubtitle: "Deleted notes are kept here before permanent deletion.",
    trashEmpty: "Trash is empty",
    trashEmptyDesc: "No notes have been deleted.",
    restore: "Restore",
    deletePermanently: "Delete",

    // Tags Page
    tagsTitle: "Tags",
    tagsSubtitle: "Browse notes by their tags.",
    noTagsFound: "No tags found",
    noTagsDesc: "You haven't tagged any notes yet.",

    // Settings Page
    settingsTitle: "Settings & Preferences",
    settingsSubtitle:
      "Customize your editor preferences, display layout, and manage security credentials.",
    tabAppearance: "Appearance & Editor",
    tabAccount: "Account & Security",
    themeMode: "Theme Mode",
    themeDesc: "Choose your interface color scheme. Synced across all pages.",
    lightMode: "Light Mode",
    lightModeDesc: "Clean & high-contrast pastel",
    darkMode: "Dark Mode",
    darkModeDesc: "Sleek midnight with neon accents",
    languageSettingTitle: "Application Language",
    languageSettingDesc:
      "Select your preferred display language across all pages.",
    langEn: "English",
    langEnDesc: "English interface",
    langId: "Indonesian",
    langIdDesc: "Bahasa Indonesia",
    defaultColor: "Default Note Color",
    defaultColorDesc:
      "Automatically applies to new notes when you click + New Note.",
    editorFontSize: "Editor Font Size",
    editorFontSizeDesc:
      "Dynamically scales note reading mode and the TipTap Rich Text Editor.",
    fontSizeSmall: "Small",
    fontSizeSmallDesc: "Compact font (14px)",
    fontSizeMedium: "Medium",
    fontSizeMediumDesc: "Standard font (16px)",
    fontSizeLarge: "Large",
    fontSizeLargeDesc: "Spacious font (18px)",
    livePreview: "Live Preview",
    previewText:
      "The quick brown fox jumps over the lazy dog. Organize thoughts, capture inspiration, and craft rich notes with Neo-Brutalism design.",
    dashboardLayout: "Dashboard Layout View",
    dashboardLayoutDesc:
      "Choose your preferred view style on the Notes Dashboard.",
    gridViewDefault: "Grid View (Default)",
    gridViewDesc: "Multi-column responsive cards",
    listViewTitle: "List View",
    listViewDesc: "Single-column compact horizontal cards",
    updateUsername: "Update Username",
    updateUsernameDesc:
      "Change the username associated with your notes account.",
    usernameEmptyError: "Username cannot be empty.",
    usernameSameError: "Username is already set to this value.",
    usernameSuccess: "Username successfully updated!",
    usernameFailed: "Failed to update username.",
    enterNewUsername: "Enter new username",
    savingUsername: "Saving Username...",
    saveUsername: "Save Username",
    changePassword: "Change Password",
    changePasswordDesc:
      "Ensure your account stays secure with a strong password.",
    currentPasswordRequired: "Current password is required.",
    newPasswordMinLength: "New password must be at least 6 characters.",
    passwordSuccess: "Password successfully updated!",
    passwordFailed: "Failed to update password.",
    currentPassword: "Current Password",
    enterCurrentPassword: "Enter current password",
    newPasswordLabel: "New Password",
    updatingPassword: "Updating Password...",
    updatePasswordBtn: "Update Password",
    dangerZone: "Danger Zone",
    dangerZoneDesc:
      "Permanently delete your account and all associated notes and tags. This action is irreversible and immediately wipes your data from the database.",
    deleteAccount: "Delete Account",
    deleteModalTitle: "Delete Account Permanently?",
    deleteModalSubtitle: "This action CANNOT be undone.",
    deleteModalWarning:
      "All notes, uploads, pinned items, and tags belonging to {username} will be permanently wiped from the database.",
    typeDeleteToConfirm: "Type DELETE to confirm:",
    deleteEverything: "Delete Everything",
    deletingAccount: "Deleting...",
    deleteFailed: "Failed to delete account. Please try again.",

    // Colors
    colorWhite: "White",
    colorYellow: "Yellow",
    colorMint: "Mint",
    colorBlue: "Blue",
    colorPink: "Pink",
    colorLavender: "Lavender",
  },
  id: {
    // Auth & Login
    appName: "MyNotes",
    tagline: "Ruang catatan pribadi dan seru Anda",
    signIn: "Masuk",
    createAccount: "Buat Akun",
    username: "Nama Pengguna",
    usernamePlaceholder: "Masukkan nama pengguna Anda",
    password: "Kata Sandi",
    passwordPlaceholder: "Masukkan kata sandi Anda",
    passwordMin: "Min. 6 karakter",
    forgotPassword: "Lupa Kata Sandi?",
    signingIn: "Masuk...",
    creatingAccount: "Membuat akun...",
    signInBtn: "Masuk 🚀",
    createAccountBtn: "Buat Akun 🚀",
    authFooter:
      "© 2026 Tubagus Budi S. Seluruh hak cipta dilindungi undang-undang.",
    resetPassword: "Atur Ulang Kata Sandi",
    resetPasswordDesc: "Masukkan nama pengguna dan kata sandi baru",
    newPassword: "Kata Sandi Baru",
    cancel: "Batal",
    reset: "Atur Ulang",
    updating: "Memperbarui...",
    loginFailed: "Gagal masuk. Silakan coba lagi.",
    registerFailed: "Pendaftaran gagal. Silakan coba lagi.",
    resetSuccess: "Kata sandi berhasil diperbarui! Anda dapat masuk sekarang.",
    resetError: "Gagal mengatur ulang kata sandi.",

    // Sidebar & Navigation
    workspace: "RUANG KERJA",
    allNotes: "Semua Catatan",
    pinned: "Disematkan",
    favorites: "Favorit",
    tags: "Label",
    trash: "Sampah",
    settings: "Pengaturan",

    // TopBar
    searchPlaceholder: "Cari catatan atau label...",
    openSidebar: "Buka bilah sisi",
    openUserMenu: "Buka menu pengguna",
    signedIn: "Sudah masuk",
    signOut: "Keluar",

    // Notes Dashboard & Common
    myNotes: "Catatan Saya",
    myNotesSubtitle: "Jaga pikiran, ide, dan pengetahuan Anda tetap teratur.",
    newNote: "+ Catatan Baru",
    filterAll: "Semua Catatan",
    filterPinned: "Disematkan",
    filterFavorites: "Favorit",
    gridView: "Tampilan Kisi",
    listView: "Tampilan Daftar",
    noResultsFound: "Tidak ada hasil ditemukan",
    noNotesYet: "Belum ada catatan",
    noResultsDesc:
      'Kami tidak dapat menemukan apa pun yang cocok dengan "{query}".',
    createFirstNote: "Buat catatan pertama Anda untuk memulai.",
    createNote: "Buat Catatan",
    untitledNote: "Catatan Tanpa Judul",
    noContentPreview: "Tidak ada pratinjau konten...",
    hasAttachment: "Ada lampiran",
    deleteNote: "Hapus catatan",

    // Note Detail & Viewer
    readingMode: "Mode Baca 📖",
    backToNotes: "Kembali ke catatan",
    toggleFavorite: "Tandai Favorit",
    togglePin: "Sematkan Catatan",
    edit: "Edit",
    updated: "Diperbarui",
    noteNotFound: "Catatan tidak ditemukan",

    // Note Editor
    editingNote: "Mengedit Catatan ✏️",
    untitledNoteEditor: "Catatan Tanpa Judul 📝",
    saved: "Tersimpan",
    saving: "Menyimpan...",
    unsavedChanges: "Belum disimpan",
    noteTitlePlaceholder: "Judul catatan...",
    tagsLabel: "Label:",
    addTag: "+ Tambah label",
    typeTag: "Ketik label...",
    attachImage: "Lampirkan Gambar",
    attachFile: "Lampirkan Berkas",
    moveToTrash: "Pindahkan ke sampah",
    removeImage: "Hapus gambar",
    removeFile: "Hapus berkas",
    startWriting: "Mulai tulis pikiran Anda...",
    goBack: "Kembali",

    // Pinned Notes Page
    pinnedNotesTitle: "Catatan Disematkan",
    pinnedNotesSubtitle: "Catatan terpenting Anda.",
    noPinnedNotes: "Tidak ada catatan disematkan",
    noPinnedDesc: "Sematkan catatan untuk mengaksesnya dengan mudah di sini.",

    // Favorite Notes Page
    favoriteNotesTitle: "Catatan Favorit",
    favoriteNotesSubtitle: "Catatan yang Anda tandai untuk akses cepat.",
    noFavoriteNotes: "Tidak ada catatan favorit",
    noFavoriteDesc: "Favoritkan catatan agar mudah dijangkau di sini.",

    // Trash Page
    trashTitle: "Sampah",
    trashSubtitle:
      "Catatan yang dihapus disimpan di sini sebelum dihapus permanen.",
    trashEmpty: "Tempat sampah kosong",
    trashEmptyDesc: "Tidak ada catatan yang dihapus.",
    restore: "Pulihkan",
    deletePermanently: "Hapus",

    // Tags Page
    tagsTitle: "Label",
    tagsSubtitle: "Jelajahi catatan berdasarkan labelnya.",
    noTagsFound: "Tidak ada label ditemukan",
    noTagsDesc: "Anda belum memberi label pada catatan apa pun.",

    // Settings Page
    settingsTitle: "Pengaturan & Preferensi",
    settingsSubtitle:
      "Sesuaikan preferensi editor, tata letak tampilan, dan kelola kredensial keamanan Anda.",
    tabAppearance: "Tampilan & Editor",
    tabAccount: "Akun & Keamanan",
    themeMode: "Mode Tema",
    themeDesc:
      "Pilih skema warna antarmuka Anda. Disinkronkan di semua halaman.",
    lightMode: "Mode Terang",
    lightModeDesc: "Pastel bersih & kontras tinggi",
    darkMode: "Mode Gelap",
    darkModeDesc: "Midnight ramping dengan aksen neon",
    languageSettingTitle: "Bahasa Aplikasi",
    languageSettingDesc:
      "Pilih bahasa tampilan pilihan Anda di seluruh halaman.",
    langEn: "Bahasa Inggris",
    langEnDesc: "English interface",
    langId: "Bahasa Indonesia",
    langIdDesc: "Antarmuka berbahasa Indonesia",
    defaultColor: "Warna Catatan Bawaan",
    defaultColorDesc:
      "Berlaku otomatis untuk catatan baru saat Anda mengeklik + Catatan Baru.",
    editorFontSize: "Ukuran Font Editor",
    editorFontSizeDesc:
      "Menyesuaikan ukuran teks mode baca dan TipTap Rich Text Editor secara dinamis.",
    fontSizeSmall: "Kecil",
    fontSizeSmallDesc: "Font ringkas (14px)",
    fontSizeMedium: "Sedang",
    fontSizeMediumDesc: "Font standar (16px)",
    fontSizeLarge: "Besar",
    fontSizeLargeDesc: "Font lega (18px)",
    livePreview: "Pratinjau Langsung",
    previewText:
      "Rubah cokelat yang cepat melompati anjing yang malas. Atur pikiran, tangkap inspirasi, dan buat catatan kaya dengan desain Neo-Brutalism.",
    dashboardLayout: "Tampilan Tata Letak Dasbor",
    dashboardLayoutDesc: "Pilih gaya tampilan pilihan Anda di Dasbor Catatan.",
    gridViewDefault: "Tampilan Kisi (Bawaan)",
    gridViewDesc: "Kartu responsif multi-kolom",
    listViewTitle: "Tampilan Daftar",
    listViewDesc: "Kartu horizontal kompak kolom tunggal",
    updateUsername: "Perbarui Nama Pengguna",
    updateUsernameDesc:
      "Ubah nama pengguna yang terhubung dengan akun catatan Anda.",
    usernameEmptyError: "Nama pengguna tidak boleh kosong.",
    usernameSameError: "Nama pengguna sudah menggunakan nilai ini.",
    usernameSuccess: "Nama pengguna berhasil diperbarui!",
    usernameFailed: "Gagal memperbarui nama pengguna.",
    enterNewUsername: "Masukkan nama pengguna baru",
    savingUsername: "Menyimpan Nama Pengguna...",
    saveUsername: "Simpan Nama Pengguna",
    changePassword: "Ubah Kata Sandi",
    changePasswordDesc:
      "Pastikan akun Anda tetap aman dengan kata sandi yang kuat.",
    currentPasswordRequired: "Kata sandi saat ini wajib diisi.",
    newPasswordMinLength: "Kata sandi baru minimal 6 karakter.",
    passwordSuccess: "Kata sandi berhasil diperbarui!",
    passwordFailed: "Gagal memperbarui kata sandi.",
    currentPassword: "Kata Sandi Saat Ini",
    enterCurrentPassword: "Masukkan kata sandi saat ini",
    newPasswordLabel: "Kata Sandi Baru",
    updatingPassword: "Memperbarui Kata Sandi...",
    updatePasswordBtn: "Perbarui Kata Sandi",
    dangerZone: "Zona Berbahaya",
    dangerZoneDesc:
      "Hapus akun Anda beserta seluruh catatan dan label terkait secara permanen. Tindakan ini tidak dapat dibatalkan dan langsung menghapus data Anda dari basis data.",
    deleteAccount: "Hapus Akun",
    deleteModalTitle: "Hapus Akun Secara Permanen?",
    deleteModalSubtitle: "Tindakan ini TIDAK DAPAT dibatalkan.",
    deleteModalWarning:
      "Semua catatan, unggahan, item yang disematkan, dan label milik {username} akan dihapus secara permanen dari basis data.",
    typeDeleteToConfirm: "Ketik DELETE untuk mengonfirmasi:",
    deleteEverything: "Hapus Semuanya",
    deletingAccount: "Menghapus...",
    deleteFailed: "Gagal menghapus akun. Silakan coba lagi.",

    // Colors
    colorWhite: "Putih",
    colorYellow: "Kuning",
    colorMint: "Mint",
    colorBlue: "Biru",
    colorPink: "Merah Muda",
    colorLavender: "Lavender",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'mynotes_language';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'en';
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'id' || stored === 'en') {
      return stored;
    }
    return 'en';
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
      document.documentElement.setAttribute('lang', language);
    } catch (e) {
      console.error('Failed to save language to localStorage:', e);
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'en' ? 'id' : 'en'));
  };

  const t = (key: TranslationKey, params?: Record<string, string | number>): string => {
    const dict = translations[language] || translations.en;
    let text: string = dict[key] || translations.en[key] || key;

    if (params) {
      Object.entries(params).forEach(([paramKey, val]) => {
        text = text.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(val));
      });
    }

    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
