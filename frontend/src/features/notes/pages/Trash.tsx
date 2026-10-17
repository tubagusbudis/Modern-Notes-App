import { useSearchParams } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { EmptyState } from '../../../components/ui/EmptyState';
import { Skeleton } from '../../../components/ui/Skeleton';
import { useNotes, useNoteMutations } from '../hooks/useNotes';
import { Button } from '../../../components/ui/Button';
import { cn, stripHtml } from '../../../lib/utils';
import { usePageEnterAnimation } from '../../../lib/animations';
import { useLanguage } from '../../../context/LanguageContext';

export function Trash() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { t } = useLanguage();
  
  const { data: notes, isLoading } = useNotes(query, 'trash');
  const { restore, permanentDelete } = useNoteMutations();
  const containerRef = usePageEnterAnimation(isLoading, [query]);

  return (
    <div ref={containerRef} className="space-y-6">
      <div className="gsap-header flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-black dark:text-white tracking-tight flex items-center gap-2">
            {t('trashTitle')} <span>🗑️</span>
          </h1>
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mt-1">{t('trashSubtitle')}</p>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-48 rounded-2xl" />)}
        </div>
      ) : notes?.length === 0 ? (
        <EmptyState 
          icon={<Trash2 className="stroke-[2.5]" />}
          title={t('trashEmpty')}
          description={t('trashEmptyDesc')}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {notes?.map((note) => (
            <div 
              key={note.id}
              className={cn(
                "gsap-card group relative flex flex-col min-h-[12rem] p-5 rounded-2xl border-2 border-black bg-white dark:bg-[#1E1E1E] shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0px_0px_#000000] transition-all"
              )}
            >
              <h3 className="text-base font-black text-black dark:text-white mb-1.5 line-clamp-1 tracking-tight">{note.title || t('untitledNote')}</h3>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3 flex-1">{stripHtml(note.preview || note.content) || t('noContentPreview')}</p>
              
              <div className="mt-4 pt-3 border-t-2 border-black/20 flex justify-between items-center space-x-2">
                <Button variant="outline" size="sm" className="w-full" onClick={() => restore.mutate(note.id)}>
                  {t('restore')}
                </Button>
                <Button variant="danger" size="sm" className="w-full" onClick={() => permanentDelete.mutate(note.id)}>
                  {t('deletePermanently')}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
