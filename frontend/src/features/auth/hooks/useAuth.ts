import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi, getToken, removeToken, type User, type AuthData } from '../../../lib/api';

// ──────────────────────────────────────────────
// Auth Hooks
// ──────────────────────────────────────────────

/**
 * Query the current authenticated user.
 * Only attempts if a JWT token exists in localStorage.
 * Returns null if not authenticated (401 or no token).
 */
export function useAuth() {
  return useQuery<User | null>({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const token = getToken();
      if (!token) return null;
      try {
        return await authApi.me();
      } catch {
        // 401 means token is invalid/expired — clean up and return null
        removeToken();
        return null;
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
}

/**
 * Login mutation.
 * On success, the token is stored by the API client and we refetch user data.
 */
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) =>
      authApi.login(username, password),
    onSuccess: (data: AuthData) => {
      // Set the user data directly in the cache
      queryClient.setQueryData(['auth', 'me'], data.user);
    },
  });
}

/**
 * Register mutation.
 * On success, the token is stored by the API client and we refetch user data.
 */
export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) =>
      authApi.register(username, password),
    onSuccess: (data: AuthData) => {
      // Set the user data directly in the cache
      queryClient.setQueryData(['auth', 'me'], data.user);
    },
  });
}

/**
 * Forgot password mutation.
 */
export function useForgotPassword() {
  return useMutation({
    mutationFn: ({ username, newPassword }: { username: string; newPassword: string }) =>
      authApi.forgotPassword(username, newPassword),
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

/**
 * Update username mutation.
 * On success, updates the authenticated user in React Query cache.
 */
export function useUpdateUsername() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (username: string) => authApi.updateUsername(username),
    onSuccess: (data) => {
      queryClient.setQueryData(['auth', 'me'], data.user);
    },
  });
}

/**
 * Update password mutation.
 */
export function useUpdatePassword() {
  return useMutation({
    mutationFn: ({ currentPassword, newPassword }: { currentPassword: string; newPassword: string }) =>
      authApi.updatePassword(currentPassword, newPassword),
  });
}

/**
 * Delete account mutation.
 * On success, clears query cache and resets auth state.
 */
export function useDeleteAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authApi.deleteAccount(),
    onSuccess: () => {
      queryClient.clear();
      queryClient.setQueryData(['auth', 'me'], null);
    },
  });
}

