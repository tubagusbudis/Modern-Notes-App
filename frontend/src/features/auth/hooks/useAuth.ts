import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi, type User } from '../../../lib/api';

// ──────────────────────────────────────────────
// Auth Hooks
// ──────────────────────────────────────────────

/**
 * Query the current authenticated user.
 * Returns null if not authenticated (401).
 */
export function useAuth() {
  return useQuery<User | null>({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      try {
        return await authApi.me();
      } catch {
        // 401 means not logged in — return null instead of throwing
        return null;
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
}

/**
 * Login mutation.
 * On success, invalidates the auth query to refetch user data.
 */
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) =>
      authApi.login(username, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
    },
  });
}

/**
 * Register mutation.
 * On success, invalidates the auth query to refetch user data.
 */
export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) =>
      authApi.register(username, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
    },
  });
}

/**
 * Logout mutation.
 * On success, clears all cached queries and resets auth state.
 */
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();
      // Set auth to null
      queryClient.setQueryData(['auth', 'me'], null);
    },
  });
}
