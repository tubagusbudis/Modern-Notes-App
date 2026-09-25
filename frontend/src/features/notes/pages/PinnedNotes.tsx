import { useSearchParams, useNavigate } from 'react-router-dom';
import { Pin, SearchX } from 'lucide-react';
import { NoteCard } from '../components/NoteCard';
import { EmptyState } from '../../../components/ui/EmptyState';
import { Skeleton } from '../../../components/ui/Skeleton';
import { useNotes, useNoteMutations } from '../hooks/useNotes';
import { usePageEnterAnimation } from '../../../lib/animations';

export function PinnedNotes() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const { data: notes, isLoading } = useNotes(query, 'pinned');
  const { remove } = useNoteMutations();
  const containerRef = usePageEnterAnimation(isLoading, [query]);

  return (
    <div ref={containerRef} className="space-y-6">
      <div className="gsap-header flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Pinned Notes</h1>
          <p className="text-sm text-secondary mt-1">
            Your most important notes.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-48 rounded-2xl" />
          ))}
        </div>
      ) : notes?.length === 0 ? (
        <EmptyState
          icon={query ? <SearchX /> : <Pin />}
          title={query ? "No results found" : "No pinned notes"}
          description={
            query
              ? `We couldn't find anything matching "${query}".`
              : "Pin a note to easily access it here."
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
