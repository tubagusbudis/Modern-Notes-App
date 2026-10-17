import { useSearchParams, useNavigate } from 'react-router-dom';
import { Heart, SearchX } from 'lucide-react';
import { NoteCard } from '../components/NoteCard';
import { EmptyState } from '../../../components/ui/EmptyState';
import { Skeleton } from '../../../components/ui/Skeleton';
import { useNotes, useNoteMutations } from '../hooks/useNotes';
import { usePageEnterAnimation } from '../../../lib/animations';
import { useLanguage } from '../../../context/LanguageContext';

export function FavoriteNotes() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { t } = useLanguage();
  
  const { data: notes, isLoading } = useNotes(query, 'favorites');
  const { remove } = useNoteMutations();
  const containerRef = usePageEnterAnimation(isLoading, [query]);

  return (
    <div ref={containerRef} className="space-y-6">
      <div className="gsap-header flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-black dark:text-white tracking-tight flex items-center gap-2">
            {t('favoriteNotesTitle')} <span>💖</span>
          </h1>
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mt-1">
            {t('favoriteNotesSubtitle')}
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
          title={query ? t('noResultsFound') : t('noFavoriteNotes')}
          description={
            query
              ? t('noResultsDesc', { query })
              : t('noFavoriteDesc')
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
