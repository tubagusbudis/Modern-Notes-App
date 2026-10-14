import { Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { NotesDashboard } from './features/notes/pages/NotesDashboard';
import { NoteEditor } from './features/notes/pages/NoteEditor';
import { NoteDetail, PinnedNotes, FavoriteNotes, Trash } from './features/notes/pages';
import { TagsDashboard } from './features/tags/pages/TagsDashboard';
import { SettingsDashboard } from './features/settings/pages/SettingsDashboard';
import { Login } from './features/auth/pages/Login';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      {/* Auth routes */}
      <Route path="/login" element={<Login />} />

      {/* Protected app routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<AppShell />}>
          <Route index element={<Navigate to="/app/notes" replace />} />
          
          <Route path="notes" element={<NotesDashboard />} />
          <Route path="notes/new" element={<NoteEditor />} />
          <Route path="notes/:id" element={<NoteDetail />} />
          <Route path="notes/:id/edit" element={<NoteEditor />} />
          
          <Route path="pinned" element={<PinnedNotes />} />
          <Route path="favorites" element={<FavoriteNotes />} />
          <Route path="tags" element={<TagsDashboard />} />
          <Route path="trash" element={<Trash />} />
          <Route path="settings" element={<SettingsDashboard />} />
        </Route>
      </Route>

      {/* Redirect root and unknown routes */}
      <Route path="/" element={<Navigate to="/app/notes" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
