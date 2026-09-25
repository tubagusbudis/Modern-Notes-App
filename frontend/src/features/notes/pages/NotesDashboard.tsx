import { useSearchParams, useNavigate } from 'react-router-dom';
import { usePageEnterAnimation } from '../../../lib/animations';
import { FileText, SearchX } from 'lucide-react';
import { NoteCard } from '../components/NoteCard';
import { Button } from '../../../components/ui/Button';
import { Skeleton } from '../../../components/ui/Skeleton';
import { EmptyState } from '../../../components/ui/EmptyState';
import { useNotes, useNoteMutations } from '../hooks/useNotes';
import { useState } from 'react';
import { cn } from '../../../lib/utils';

export function NotesDashboard() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [filter, setFilter] = useState<'all' | 'pinned' | 'favorites'>('all');
  const { data: notes, isLoading } = useNotes(query, filter);
  const { remove } = useNoteMutations();
  
  const containerRef = usePageEnterAnimation(isLoading, [filter, query]);

  return (
    <div ref={containerRef} className="space-y-6">
      <div className="gsap-header flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">My Notes</h1>
          <p className="text-sm text-secondary mt-1">
            Keep your thoughts, ideas, and knowledge organized.
          </p>
        </div>
        <Button onClick={() => navigate("/app/notes/new")}>+ New Note</Button>
      </div>

      {/* Quick Filters */}
      <div className="gsap-filters flex items-center space-x-2 overflow-x-auto pb-2">
        <button
          onClick={() => setFilter("all")}
          className={cn(
            "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
            filter === "all"
              ? "bg-accent-soft text-accent"
              : "text-secondary hover:bg-subtle",
          )}
        >
          All Notes
        </button>
        <button
          onClick={() => setFilter("pinned")}
          className={cn(
            "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
            filter === "pinned"
              ? "bg-accent-soft text-accent"
              : "text-secondary hover:bg-subtle",
          )}
        >
          Pinned
        </button>
        <button
          onClick={() => setFilter("favorites")}
          className={cn(
            "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
            filter === "favorites"
              ? "bg-accent-soft text-accent"
              : "text-secondary hover:bg-subtle",
          )}
        >
          Favorites
        </button>
      </div>

      {/* States */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-48 rounded-2xl" />
          ))}
        </div>
      ) : notes?.length === 0 ? (
        <EmptyState
          icon={query ? <SearchX /> : <FileText />}
          title={query ? "No results found" : "No notes yet"}
          description={
            query
              ? `We couldn't find anything matching "${query}".`
              : "Create your first note to get started."
          }
          action={
            !query && (
              <Button onClick={() => navigate("/app/notes/new")}>
                Create Note
              </Button>
            )
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {notes?.map((note) => (
            <div key={note.id} className="gsap-card">
              <NoteCard
                title={note.title}
                preview={note.preview}
                date={new Date(note.updatedAt).toLocaleDateString()}
                tags={note.tags}
                imageUrl={note.imageUrl}
                fileUrl={note.fileUrl}
                isPinned={note.isPinned}
                isFavorite={note.isFavorite}
                colorVariant={note.colorVariant}
                onClick={() => navigate(`/app/notes/${note.id}`)}
                onDelete={() => remove.mutate(note.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
