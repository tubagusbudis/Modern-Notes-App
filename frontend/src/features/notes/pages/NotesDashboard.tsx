import { useSearchParams, useNavigate } from 'react-router-dom';
import { usePageEnterAnimation } from '../../../lib/animations';
import { FileText, SearchX, LayoutGrid, List } from 'lucide-react';
import { NoteCard } from '../components/NoteCard';
import { Button } from '../../../components/ui/Button';
import { Skeleton } from '../../../components/ui/Skeleton';
import { EmptyState } from '../../../components/ui/EmptyState';
import { useNotes, useNoteMutations } from '../hooks/useNotes';
import { usePreferences } from '../../../hooks/usePreferences';
import { useLanguage } from '../../../context/LanguageContext';
import { useState } from 'react';
import { cn } from '../../../lib/utils';

export function NotesDashboard() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [filter, setFilter] = useState<'all' | 'pinned' | 'favorites'>('all');
  const { data: notes, isLoading } = useNotes(query, filter);
  const { remove } = useNoteMutations();
  const { preferences, setDashboardView } = usePreferences();
  const { t } = useLanguage();
  
  const containerRef = usePageEnterAnimation(isLoading, [filter, query, preferences.dashboardView]);


  return (
    <div ref={containerRef} className="space-y-6">
      <div className="gsap-header flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-black dark:text-white tracking-tight flex items-center gap-2">
            {t('myNotes')} <span>✍️</span>
          </h1>
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mt-1">
            {t('myNotesSubtitle')}
          </p>
        </div>
        <button
          onClick={() => navigate("/app/notes/new")}
          className="bg-[#FF7890] hover:bg-[#FF617D] text-black border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none font-black text-sm px-5 py-2.5 transition-all select-none cursor-pointer self-start sm:self-auto"
        >
          {t('newNote')}
        </button>
      </div>

      {/* Quick Filters & Layout Switcher */}
      <div className="gsap-filters flex items-center justify-between gap-3 overflow-x-auto pb-2">
        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => setFilter("all")}
            className={cn(
              "px-4 py-1.5 text-sm font-extrabold rounded-xl border-2 border-black transition-all cursor-pointer select-none",
              filter === "all"
                ? "bg-[#C4B5FD] text-black shadow-[3px_3px_0px_0px_#000] translate-x-0.5"
                : "bg-white dark:bg-[#1E1E1E] text-black dark:text-white shadow-[2px_2px_0px_0px_#000] hover:bg-black/5",
            )}
          >
            {t('filterAll')}
          </button>
          <button
            onClick={() => setFilter("pinned")}
            className={cn(
              "px-4 py-1.5 text-sm font-extrabold rounded-xl border-2 border-black transition-all cursor-pointer select-none",
              filter === "pinned"
                ? "bg-[#C4B5FD] text-black shadow-[3px_3px_0px_0px_#000] translate-x-0.5"
                : "bg-white dark:bg-[#1E1E1E] text-black dark:text-white shadow-[2px_2px_0px_0px_#000] hover:bg-black/5",
            )}
          >
            {t('filterPinned')}
          </button>
          <button
            onClick={() => setFilter("favorites")}
            className={cn(
              "px-4 py-1.5 text-sm font-extrabold rounded-xl border-2 border-black transition-all cursor-pointer select-none",
              filter === "favorites"
                ? "bg-[#C4B5FD] text-black shadow-[3px_3px_0px_0px_#000] translate-x-0.5"
                : "bg-white dark:bg-[#1E1E1E] text-black dark:text-white shadow-[2px_2px_0px_0px_#000] hover:bg-black/5",
            )}
          >
            {t('filterFavorites')}
          </button>
        </div>

        {/* Layout View Toggle */}
        <div className="flex items-center space-x-1.5 p-1 bg-white dark:bg-[#1E1E1E] border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_#000] shrink-0">
          <button
            onClick={() => setDashboardView('grid')}
            className={cn(
              "p-1.5 rounded-lg border-2 transition-all cursor-pointer",
              preferences.dashboardView === 'grid'
                ? "bg-[#FFE066] text-black border-black shadow-[1.5px_1.5px_0px_0px_#000]"
                : "border-transparent text-gray-500 hover:text-black dark:hover:text-white"
            )}
            title={t('gridView')}
          >
            <LayoutGrid className="w-4 h-4 stroke-[2.5]" />
          </button>
          <button
            onClick={() => setDashboardView('list')}
            className={cn(
              "p-1.5 rounded-lg border-2 transition-all cursor-pointer",
              preferences.dashboardView === 'list'
                ? "bg-[#FFE066] text-black border-black shadow-[1.5px_1.5px_0px_0px_#000]"
                : "border-transparent text-gray-500 hover:text-black dark:hover:text-white"
            )}
            title={t('listView')}
          >
            <List className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* States */}
      {isLoading ? (
        <div
          className={
            preferences.dashboardView === 'grid'
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              : "flex flex-col gap-3"
          }
        >
          {[1, 2, 3, 4].map((i) => (
            <Skeleton
              key={i}
              className={preferences.dashboardView === 'grid' ? "h-48 rounded-2xl" : "h-20 rounded-2xl"}
            />
          ))}
        </div>
      ) : notes?.length === 0 ? (
        <EmptyState
          icon={query ? <SearchX /> : <FileText />}
          title={query ? t('noResultsFound') : t('noNotesYet')}
          description={
            query
              ? t('noResultsDesc', { query })
              : t('createFirstNote')
          }
          action={
            !query && (
              <Button onClick={() => navigate("/app/notes/new")}>
                {t('createNote')}
              </Button>
            )
          }
        />
      ) : (
        <div
          className={
            preferences.dashboardView === 'grid'
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              : "flex flex-col gap-3"
          }
        >
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
                layout={preferences.dashboardView}
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
