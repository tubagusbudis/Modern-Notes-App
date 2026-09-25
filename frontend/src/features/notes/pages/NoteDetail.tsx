import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit, MoreVertical, Heart, Pin, Paperclip } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Skeleton } from '../../../components/ui/Skeleton';
import { useNote, useNoteMutations } from '../hooks/useNotes';
import { usePageEnterAnimation } from '../../../lib/animations';

export function NoteDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: note, isLoading, error } = useNote(id);
  const { update } = useNoteMutations();

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
        <h2 className="text-xl font-bold text-primary mb-2">Note not found</h2>
        <Button onClick={() => navigate('/app/notes')}>Back to notes</Button>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto flex flex-col h-full h-[calc(100vh-8rem)]">
      <header className="gsap-header flex items-center justify-between pb-4 border-b border-border-soft mb-8">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('/app/notes')} className="p-2 -ml-2 text-secondary hover:text-primary hover:bg-subtle rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium text-muted">Reading mode</span>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={handleToggleFavorite} className="p-2 text-secondary hover:text-danger hover:bg-subtle rounded-lg transition-colors">
            <Heart className={note.isFavorite ? "w-5 h-5 text-danger fill-danger" : "w-5 h-5"} />
          </button>
          <button onClick={handleTogglePin} className="p-2 text-secondary hover:text-accent hover:bg-subtle rounded-lg transition-colors">
            <Pin className={note.isPinned ? "w-5 h-5 text-accent fill-accent" : "w-5 h-5"} />
          </button>
          <Button variant="outline" size="sm" onClick={() => navigate(`/app/notes/${note.id}/edit`)} className="gap-2 ml-2">
            <Edit className="w-4 h-4" /> Edit
          </Button>
        </div>
      </header>

      <div className="gsap-card flex-1 overflow-y-auto pb-20 prose prose-slate dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold text-primary mb-4">{note.title}</h1>
        
        <div className="flex items-center space-x-4 mb-8 text-sm">
          {note.tags.length > 0 && (
            <div className="flex space-x-2">
              {note.tags.map(tag => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          )}
          <span className="text-muted text-sm border-l border-border-soft pl-4">Updated {new Date(note.updatedAt).toLocaleDateString()}</span>
        </div>

        {note.imageUrl && (
          <div className="mb-6">
             <img src={`http://localhost:5000${note.imageUrl}`} alt="Attachment" className="max-h-[400px] rounded-xl object-contain border border-border-soft bg-black/5" />
          </div>
        )}
        {note.fileUrl && (
          <a
            href={`http://localhost:5000${note.fileUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-6 flex items-center space-x-2 text-sm text-secondary bg-subtle p-3 rounded-lg w-max border border-border-soft hover:bg-black/5 dark:hover:bg-white/5 hover:text-primary transition-colors cursor-pointer"
          >
             <Paperclip className="w-4 h-4" />
             <span>{note.fileUrl.split('/').pop()}</span>
          </a>
        )}

        <div className="text-lg text-primary leading-relaxed whitespace-pre-wrap">
          {note.content}
        </div>
      </div>
    </div>
  );
}
