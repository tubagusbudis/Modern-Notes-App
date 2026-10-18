// ──────────────────────────────────────────────
// Real API Client
// Replaces mockApi.ts for communication with the Express backend
// ──────────────────────────────────────────────

const API_BASE = import.meta.env.VITE_API_URL || '/api';
//const API_BASE = 'http://localhost:5000/api';

// ──────────────────────────────────────────────
// Token Management
// ──────────────────────────────────────────────
const TOKEN_KEY = 'mynotes_token';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

// ──────────────────────────────────────────────
// Types (same interface the frontend already uses)
// ──────────────────────────────────────────────
export interface Note {
  id: string;
  title: string;
  content: string;
  preview: string;
  tags: string[];
  isPinned: boolean;
  isFavorite: boolean;
  colorVariant: "default" | "lavender" | "mint" | "sky-blue" | "sage-green" | "warm-amber" | "soft-rose" | "coral" | "lilac" | "slate-gray";
  imageUrl?: string | null;
  fileUrl?: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  noteCount: number;
  createdAt: string;
}

export interface User {
  id: string;
  username: string;
  createdAt?: string;
}

export interface AuthData {
  user: User;
  token: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: {
    code: string;
    message: string;
  };
}

// ──────────────────────────────────────────────
// HTTP helpers
// ──────────────────────────────────────────────

class ApiError extends Error {
  public status: number;
  public code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.status = status;
    this.code = code;
    this.name = 'ApiError';
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE}${endpoint}`;

  const headers = new Headers(options.headers || {});
  
  // Attach JWT token if available
  const token = getToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  if (!(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  } else {
    headers.delete('Content-Type');
  }

  const res = await fetch(url, {
    ...options,
    headers,
  });

  // Handle 204 No Content (e.g., delete operations)
  if (res.status === 204) {
    return undefined as T;
  }

  const json: ApiResponse<T> = await res.json();

  if (!res.ok || !json.success) {
    throw new ApiError(
      res.status,
      json.error?.code || 'UNKNOWN_ERROR',
      json.error?.message || 'An unexpected error occurred'
    );
  }

  return json.data;
}

// ──────────────────────────────────────────────
// Auth API
// ──────────────────────────────────────────────
export const authApi = {
  async login(username: string, password: string): Promise<AuthData> {
    const data = await request<AuthData>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    // Store the token on successful login
    setToken(data.token);
    return data;
  },

  async register(username: string, password: string): Promise<AuthData> {
    const data = await request<AuthData>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    // Store the token on successful registration
    setToken(data.token);
    return data;
  },

  async forgotPassword(username: string, newPassword: string): Promise<{ message: string }> {
    return request<{ message: string }>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ username, newPassword }),
    });
  },

  async logout(): Promise<void> {
    removeToken();
  },

  async me(): Promise<User> {
    return request<User>('/auth/me');
  },

  async updateUsername(username: string): Promise<{ user: User; token: string; message: string }> {
    const data = await request<{ user: User; token: string; message: string }>('/auth/username', {
      method: 'PUT',
      body: JSON.stringify({ username }),
    });
    if (data.token) {
      setToken(data.token);
    }
    return data;
  },

  async updatePassword(currentPassword: string, newPassword: string): Promise<{ message: string }> {
    return request<{ message: string }>('/auth/password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  },

  async deleteAccount(): Promise<{ message: string }> {
    const res = await request<{ message: string }>('/auth/account', {
      method: 'DELETE',
    });
    removeToken();
    return res;
  },
};

// ──────────────────────────────────────────────
// Notes API
// ──────────────────────────────────────────────
export const notesApi = {
  async getNotes(
    query = '',
    filter: 'all' | 'pinned' | 'favorites' | 'trash' = 'all'
  ): Promise<Note[]> {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (filter !== 'all') params.set('filter', filter);
    const qs = params.toString();
    return request<Note[]>(`/notes${qs ? `?${qs}` : ''}`);
  },

  async getNote(id: string): Promise<Note> {
    return request<Note>(`/notes/${id}`);
  },

  async createNote(data: FormData | Partial<Note>): Promise<Note> {
    const isFormData = data instanceof FormData;
    return request<Note>('/notes', {
      method: 'POST',
      body: isFormData ? data : JSON.stringify(data),
    });
  },

  async updateNote(id: string, data: FormData | Partial<Note>): Promise<Note> {
    const isFormData = data instanceof FormData;
    return request<Note>(`/notes/${id}`, {
      method: 'PATCH',
      body: isFormData ? data : JSON.stringify(data),
    });
  },

  async deleteNote(id: string): Promise<void> {
    await request<void>(`/notes/${id}`, {
      method: 'DELETE',
    });
  },

  async restoreNote(id: string): Promise<void> {
    await request<{ restored: boolean }>(`/notes/${id}/restore`, {
      method: 'POST',
    });
  },

  async permanentDelete(id: string): Promise<void> {
    await request<void>(`/notes/${id}/permanent`, {
      method: 'DELETE',
    });
  },

  async togglePin(id: string): Promise<{ isPinned: boolean }> {
    return request<{ isPinned: boolean }>(`/notes/${id}/pin`, {
      method: 'PATCH',
    });
  },

  async toggleFavorite(id: string): Promise<{ isFavorite: boolean }> {
    return request<{ isFavorite: boolean }>(`/notes/${id}/favorite`, {
      method: 'PATCH',
    });
  },
};

// ──────────────────────────────────────────────
// Tags API
// ──────────────────────────────────────────────
export const tagsApi = {
  async getTags(): Promise<Tag[]> {
    return request<Tag[]>('/tags');
  },

  async createTag(name: string): Promise<Tag> {
    return request<Tag>('/tags', {
      method: 'POST',
      body: JSON.stringify({ name }),
    });
  },

  async updateTag(id: string, name: string): Promise<Tag> {
    return request<Tag>(`/tags/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ name }),
    });
  },

  async deleteTag(id: string): Promise<void> {
    await request<void>(`/tags/${id}`, {
      method: 'DELETE',
    });
  },
};
