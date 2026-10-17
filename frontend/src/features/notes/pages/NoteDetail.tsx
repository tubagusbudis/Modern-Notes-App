import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit, Heart, Pin, Paperclip } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Skeleton } from '../../../components/ui/Skeleton';
import { useNote, useNoteMutations } from '../hooks/useNotes';
import { usePageEnterAnimation } from '../../../lib/animations';
import { usePreferences } from '../../../hooks/usePreferences';
import { useLanguage } from '../../../context/LanguageContext';
import { cn } from '../../../lib/utils';

export function NoteDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: note, isLoading, error } = useNote(id);
  const { update } = useNoteMutations();
  const { fontSizeClass, proseSizeClass } = usePreferences();
  const { t } = useLanguage();

  const handleToggleFavorite = () => {
    if (note) update.mutate({ id: note.id, data: { isFavorite: !note.isFavorite } });
  };
  const handleTogglePin = () => {
    if (note) update.mutate({ id: note.id, data: { isPinned: !note.isPinned } });
  };


  const containerRef = usePageEnterAnimation(isLoading);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto flex flex-col h-full h-[calc(100vh-8rem)]">
        <header className="flex items-center justify-between pb-4 border-b border-border-soft mb-8">
          <Skeleton className="w-24 h-8" />
          <Skeleton className="w-32 h-8" />
        </header>
        <div className="space-y-4">
          <Skeleton className="w-3/4 h-12" />
          <Skeleton className="w-1/2 h-6" />
          <Skeleton className="w-full h-32" />
        </div>
      </div>
    );
  }

  if (error || !note) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-primary mb-2">{t('noteNotFound')}</h2>
        <Button onClick={() => navigate('/app/notes')}>{t('backToNotes')}</Button>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto flex flex-col h-full h-[calc(100vh-8rem)]">
      <header className="gsap-header flex items-center justify-between pb-4 border-b-2 border-black/20 mb-6">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate('/app/notes')}
            className="p-2 text-black dark:text-white bg-white dark:bg-[#1E1E1E] border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
            title={t('backToNotes')}
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <span className="text-sm font-extrabold text-gray-700 dark:text-gray-300">{t('readingMode')}</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleToggleFavorite}
            className="p-2 text-black dark:text-white bg-white dark:bg-[#1E1E1E] border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
            title={t('toggleFavorite')}
          >
            <Heart className={note.isFavorite ? "w-5 h-5 text-black fill-[#FF7890] stroke-[2.2]" : "w-5 h-5 stroke-[2.2]"} />
          </button>
          <button
            onClick={handleTogglePin}
            className="p-2 text-black dark:text-white bg-white dark:bg-[#1E1E1E] border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
            title={t('togglePin')}
          >
            <Pin className={note.isPinned ? "w-5 h-5 text-black fill-[#C4B5FD] stroke-[2.2]" : "w-5 h-5 stroke-[2.2]"} />
          </button>
          <Button onClick={() => navigate(`/app/notes/${note.id}/edit`)} className="gap-2 ml-1">
            <Edit className="w-4 h-4 stroke-[2.5]" /> {t('edit')}
          </Button>
        </div>
      </header>

      <div className={cn("gsap-card flex-1 overflow-y-auto pb-20 p-6 rounded-2xl border-2 border-black bg-white dark:bg-[#1E1E1E] shadow-[4px_4px_0px_0px_#000000] prose prose-slate dark:prose-invert max-w-none text-gray-900 dark:text-gray-100", proseSizeClass)}>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-gray-100 mb-4 tracking-tight">{note.title || t('untitledNote')}</h1>
        
        <div className="flex items-center flex-wrap gap-2.5 mb-6 text-sm not-prose">
          {note.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {note.tags.map(tag => (
                <span key={tag} className="bg-white dark:bg-[#2A2A2A] border-2 border-black rounded-lg px-2.5 py-0.5 text-xs font-black text-black dark:text-white shadow-[1.5px_1.5px_0px_0px_#000]">{tag}</span>
              ))}
            </div>
          )}
          <span className="text-gray-500 dark:text-gray-400 font-bold text-xs border-l-2 border-black/20 pl-3">{t('updated')} {new Date(note.updatedAt).toLocaleDateString()}</span>
        </div>

        {note.imageUrl && (
          <div className="mb-6 not-prose">
             <img src={`http://localhost:5000${note.imageUrl}`} alt="Attachment" className="max-h-[400px] rounded-2xl object-contain border-3 border-black shadow-[4px_4px_0px_0px_#000] bg-white dark:bg-[#1E1E1E]" />
          </div>
        )}
        {note.fileUrl && (
          <a
            href={`http://localhost:5000${note.fileUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-6 flex items-center space-x-2 text-sm font-extrabold text-black dark:text-white bg-white dark:bg-[#1E1E1E] p-3 rounded-xl w-max border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer not-prose"
          >
             <Paperclip className="w-4.5 h-4.5 stroke-[2.5]" />
             <span>{note.fileUrl.split('/').pop()}</span>
          </a>
        )}

        <div 
          className={cn("text-gray-900 dark:text-gray-100 font-medium leading-relaxed", fontSizeClass)}
          dangerouslySetInnerHTML={{ __html: note.content }}
        />
      </div>
    </div>
  );
}
