import { useNotes } from '../../notes/hooks/useNotes';
import { Tag, SearchX } from 'lucide-react';
import { Skeleton } from '../../../components/ui/Skeleton';
import { EmptyState } from '../../../components/ui/EmptyState';
import { useNavigate } from 'react-router-dom';
import { usePageEnterAnimation } from '../../../lib/animations';

export function TagsDashboard() {
  const { data: notes, isLoading } = useNotes();
  const navigate = useNavigate();
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
          <h1 className="text-2xl font-bold text-primary">Tags</h1>
          <p className="text-sm text-secondary mt-1">Browse notes by their tags.</p>
        </div>
      </div>

      {uniqueTags.length === 0 ? (
        <EmptyState 
          icon={<SearchX />}
          title="No tags found"
          description="You haven't tagged any notes yet."
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {uniqueTags.map(([tag, count]) => (
            <div 
              key={tag}
              onClick={() => navigate(`/app/notes?q=${tag}`)}
              className="gsap-card group flex items-center justify-between p-4 bg-surface border border-border-soft rounded-xl cursor-pointer hover:shadow-md hover:border-accent/30 transition-all"
            >
              <div className="flex items-center space-x-3 overflow-hidden">
                <Tag className="w-5 h-5 text-accent opacity-70 group-hover:opacity-100 transition-opacity" />
                <span className="font-medium text-primary truncate">{tag}</span>
              </div>
              <span className="text-xs font-semibold text-secondary bg-subtle px-2 py-1 rounded-full">{count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
