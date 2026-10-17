import { useNotes } from '../../notes/hooks/useNotes';
import { Tag, SearchX } from 'lucide-react';
import { Skeleton } from '../../../components/ui/Skeleton';
import { EmptyState } from '../../../components/ui/EmptyState';
import { useNavigate } from 'react-router-dom';
import { usePageEnterAnimation } from '../../../lib/animations';
import { useLanguage } from '../../../context/LanguageContext';

export function TagsDashboard() {
  const { data: notes, isLoading } = useNotes();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const containerRef = usePageEnterAnimation(isLoading);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <header className="flex items-center justify-between gap-4">
          <Skeleton className="w-48 h-8" />
        </header>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="h-16 rounded-xl" />)}
        </div>
      </div>
    );
  }

  // Extract unique tags and count occurrences
  const tagsMap = new Map<string, number>();
  notes?.forEach(note => {
    note.tags.forEach(tag => {
      tagsMap.set(tag, (tagsMap.get(tag) || 0) + 1);
    });
  });

  const uniqueTags = Array.from(tagsMap.entries()).sort((a, b) => b[1] - a[1]); // Sort by frequency

  return (
    <div ref={containerRef} className="space-y-6">
      <div className="gsap-header flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-black dark:text-white tracking-tight flex items-center gap-2">
            {t('tagsTitle')} <span>🏷️</span>
          </h1>
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mt-1">{t('tagsSubtitle')}</p>
        </div>
      </div>

      {uniqueTags.length === 0 ? (
        <EmptyState 
          icon={<SearchX className="stroke-[2.5]" />}
          title={t('noTagsFound')}
          description={t('noTagsDesc')}
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {uniqueTags.map(([tag, count]) => (
            <div 
              key={tag}
              onClick={() => navigate(`/app/notes?q=${tag}`)}
              className="gsap-card group flex items-center justify-between p-4 bg-white dark:bg-[#1E1E1E] border-2 border-black rounded-2xl cursor-pointer shadow-[3px_3px_0px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#000000] transition-all select-none"
            >
              <div className="flex items-center space-x-2.5 overflow-hidden">
                <Tag className="w-4.5 h-4.5 text-black stroke-[2.2] dark:text-white" />
                <span className="font-extrabold text-black dark:text-white truncate">{tag}</span>
              </div>
              <span className="text-xs font-black text-black bg-[#FFE066] px-2 py-0.5 rounded-lg border-2 border-black shadow-[1px_1px_0px_0px_#000]">{count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
