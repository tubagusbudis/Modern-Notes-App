import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notesApi, type Note } from '../../../lib/api';

export function useNotes(query = '', filter: 'all' | 'pinned' | 'favorites' | 'trash' = 'all') {
  return useQuery({
    queryKey: ['notes', filter, query],
    queryFn: () => notesApi.getNotes(query, filter),
  });
}

export function useNote(id: string | undefined) {
  return useQuery({
    queryKey: ['note', id],
    queryFn: () => id ? notesApi.getNote(id) : Promise.reject('No ID'),
    enabled: !!id,
  });
}

export function useNoteMutations() {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['notes'] });
  };

  const create = useMutation({
    mutationFn: notesApi.createNote,
    onSuccess: () => invalidate(),
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Note> }) => notesApi.updateNote(id, data),
    onSuccess: (_data, variables) => {
      invalidate();
      queryClient.invalidateQueries({ queryKey: ['note', variables.id] });
    },
  });

  const remove = useMutation({
    mutationFn: notesApi.deleteNote,
    onSuccess: () => invalidate(),
  });

  const restore = useMutation({
    mutationFn: notesApi.restoreNote,
    onSuccess: () => invalidate(),
  });

  const permanentDelete = useMutation({
    mutationFn: notesApi.permanentDelete,
    onSuccess: () => invalidate(),
  });

  return { create, update, remove, restore, permanentDelete };
}
