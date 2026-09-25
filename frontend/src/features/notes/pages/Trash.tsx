import { useSearchParams } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { EmptyState } from '../../../components/ui/EmptyState';
import { Skeleton } from '../../../components/ui/Skeleton';
import { useNotes, useNoteMutations } from '../hooks/useNotes';
import { Button } from '../../../components/ui/Button';
import { cn } from '../../../lib/utils';
import { usePageEnterAnimation } from '../../../lib/animations';

export function Trash() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const { data: notes, isLoading } = useNotes(query, 'trash');
  const { restore, permanentDelete } = useNoteMutations();
  const containerRef = usePageEnterAnimation(isLoading, [query]);

  return (
    <div ref={containerRef} className="space-y-6">
      <div className="gsap-header flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Trash</h1>
          <p className="text-sm text-secondary mt-1">Deleted notes are kept here before permanent deletion.</p>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-48 rounded-2xl" />)}
        </div>
      ) : notes?.length === 0 ? (
        <EmptyState 
          icon={<Trash2 />}
          title="Trash is empty"
          description="No notes have been deleted."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {notes?.map((note) => (
            <div 
              key={note.id}
              className={cn(
                "gsap-card group relative flex flex-col h-48 p-4 rounded-2xl border transition-all bg-surface border-border-soft hover:shadow-md"
              )}
            >
              <h3 className="text-base font-semibold text-primary mb-1 line-clamp-1">{note.title}</h3>
              <p className="text-sm text-secondary leading-relaxed line-clamp-3 flex-1">{note.preview}</p>
              
              <div className="mt-4 pt-3 border-t border-border-soft/50 flex justify-between items-center space-x-2">
                <Button variant="outline" size="sm" className="w-full" onClick={() => restore.mutate(note.id)}>
                  Restore
                </Button>
                <Button variant="danger" size="sm" className="w-full" onClick={() => permanentDelete.mutate(note.id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
