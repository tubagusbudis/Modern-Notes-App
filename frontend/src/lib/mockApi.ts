export interface Note {
  id: string;
  title: string;
  content: string;
  preview: string;
  tags: string[];
  isPinned: boolean;
  isFavorite: boolean;
  colorVariant: "default" | "lavender" | "mint" | "sky-blue" | "sage-green" | "warm-amber" | "soft-rose" | "coral" | "lilac" | "slate-gray";
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

// Initial mock data
let notesData: Note[] = [
  { 
    id: '1', 
    title: 'React Query Basics', 
    content: '# React Query\n\nCatatan mengenai server state, caching, query invalidation, dan mutation.', 
    preview: 'Catatan mengenai server state, caching, query invalidation, dan mutation.', 
    tags: ['React', 'Frontend'], 
    isPinned: true,
    isFavorite: false,
    colorVariant: 'default',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null
  },
  { 
    id: '2', 
    title: 'Design System Tokens', 
    content: 'Colors: bg-app, bg-surface. Spacing uses multiple of 4. Typography uses Inter.',
    preview: 'Colors: bg-app, bg-surface. Spacing uses multiple of 4. Typography uses Inter.', 
    tags: ['Design', 'UI/UX'], 
    isPinned: false,
    isFavorite: true,
    colorVariant: 'lavender',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null
  },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  async getNotes(query = '', filter: 'all' | 'pinned' | 'favorites' | 'trash' = 'all'): Promise<Note[]> {
    await delay(600); // Simulate network
    let result = notesData;

    // Apply basic filter
    if (filter === 'trash') {
      result = result.filter(n => n.deletedAt !== null);
    } else {
      result = result.filter(n => n.deletedAt === null);
      if (filter === 'pinned') result = result.filter(n => n.isPinned);
      if (filter === 'favorites') result = result.filter(n => n.isFavorite);
    }

    // Apply search query
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(n => 
        n.title.toLowerCase().includes(q) || 
        n.content.toLowerCase().includes(q)
      );
    }

    return result.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  },

  async getNote(id: string): Promise<Note> {
    await delay(400);
    const note = notesData.find(n => n.id === id);
    if (!note) throw new Error('Note not found');
    return note;
  },

  async createNote(data: Partial<Note>): Promise<Note> {
    await delay(500);
    const newNote: Note = {
      id: Math.random().toString(36).substr(2, 9),
      title: data.title || 'Untitled Note',
      content: data.content || '',
      preview: (data.content || '').substring(0, 100),
      tags: data.tags || [],
      isPinned: !!data.isPinned,
      isFavorite: !!data.isFavorite,
      colorVariant: data.colorVariant || 'default',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
    };
    notesData.push(newNote);
    return newNote;
  },

  async updateNote(id: string, data: Partial<Note>): Promise<Note> {
    await delay(500);
    const index = notesData.findIndex(n => n.id === id);
    if (index === -1) throw new Error('Note not found');
    
    notesData[index] = { 
      ...notesData[index], 
      ...data, 
      preview: data.content ? data.content.substring(0, 100) : notesData[index].preview,
      updatedAt: new Date().toISOString() 
    };
    return notesData[index];
  },

  async deleteNote(id: string): Promise<void> {
    await delay(400);
    const index = notesData.findIndex(n => n.id === id);
    if (index !== -1) {
      notesData[index].deletedAt = new Date().toISOString();
    }
  },

  async restoreNote(id: string): Promise<void> {
    await delay(400);
    const index = notesData.findIndex(n => n.id === id);
    if (index !== -1) {
      notesData[index].deletedAt = null;
    }
  },

  async permanentDelete(id: string): Promise<void> {
    await delay(400);
    notesData = notesData.filter(n => n.id !== id);
  },
};

export interface User {
  id: string;
  username: string;
}

export const mockAuthApi = {
  async login(username: string, _password: string): Promise<User> {
    await delay(400);
    const user = { id: '1', username };
    localStorage.setItem('mockUser', JSON.stringify(user));
    return user;
  },
  async register(username: string, _password: string): Promise<User> {
    await delay(400);
    const user = { id: '1', username };
    localStorage.setItem('mockUser', JSON.stringify(user));
    return user;
  },
  async logout(): Promise<void> {
    await delay(200);
    localStorage.removeItem('mockUser');
  },
  async me(): Promise<User> {
    await delay(200);
    const user = localStorage.getItem('mockUser');
    if (!user) throw new Error('Not authenticated');
    return JSON.parse(user);
  }
};

export interface Tag {
  id: string;
  name: string;
  slug: string;
  noteCount: number;
}

let mockTagsData: Tag[] = [
  { id: '1', name: 'React', slug: 'react', noteCount: 5 },
  { id: '2', name: 'Frontend', slug: 'frontend', noteCount: 3 },
  { id: '3', name: 'Design', slug: 'design', noteCount: 2 },
  { id: '4', name: 'UI/UX', slug: 'ui-ux', noteCount: 2 },
];

export const mockTagsApi = {
  async getTags(): Promise<Tag[]> {
    await delay(300);
    return mockTagsData;
  },
  async createTag(name: string): Promise<Tag> {
    await delay(300);
    const newTag = { id: Math.random().toString(36).substr(2, 9), name, slug: name.toLowerCase().replace(/\s+/g, '-'), noteCount: 0 };
    mockTagsData.push(newTag);
    return newTag;
  },
  async updateTag(id: string, name: string): Promise<Tag> {
    await delay(300);
    const index = mockTagsData.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Tag not found');
    mockTagsData[index] = { ...mockTagsData[index], name, slug: name.toLowerCase().replace(/\s+/g, '-') };
    return mockTagsData[index];
  },
  async deleteTag(id: string): Promise<void> {
    await delay(300);
    mockTagsData = mockTagsData.filter(t => t.id !== id);
  }
};
