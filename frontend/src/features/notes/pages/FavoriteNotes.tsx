import { useSearchParams, useNavigate } from 'react-router-dom';
import { Heart, SearchX } from 'lucide-react';
import { NoteCard } from '../components/NoteCard';
import { EmptyState } from '../../../components/ui/EmptyState';
import { Skeleton } from '../../../components/ui/Skeleton';
import { useNotes, useNoteMutations } from '../hooks/useNotes';
import { usePageEnterAnimation } from '../../../lib/animations';

export function FavoriteNotes() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const { data: notes, isLoading } = useNotes(query, 'favorites');
  const { remove } = useNoteMutations();
  const containerRef = usePageEnterAnimation(isLoading, [query]);

  return (
    <div ref={containerRef} className="space-y-6">
      <div className="gsap-header flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Favorite Notes</h1>
          <p className="text-sm text-secondary mt-1">
            Notes you marked for quick access.
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
          icon={query ? <SearchX /> : <Heart />}
          title={query ? "No results found" : "No favorite notes"}
          description={
            query
              ? `We couldn't find anything matching "${query}".`
              : "Favorite a note to keep it handy here."
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
