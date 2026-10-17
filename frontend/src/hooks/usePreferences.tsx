import React, { createContext, useContext, useState, useEffect } from 'react';

export type NoteColorVariant =
  | 'default'      // White
  | 'warm-amber'   // Yellow
  | 'mint'         // Mint
  | 'sky-blue'     // Blue
  | 'soft-rose'    // Pink
  | 'lavender';    // Lavender

export type EditorFontSize = 'small' | 'medium' | 'large';
export type DashboardView = 'grid' | 'list';

export interface Preferences {
  defaultColor: NoteColorVariant;
  fontSize: EditorFontSize;
  dashboardView: DashboardView;
}

export const NOTE_COLOR_OPTIONS: { id: NoteColorVariant; label: string; bgClass: string; hex: string }[] = [
  { id: 'default', label: 'White', bgClass: 'bg-white', hex: '#FFFFFF' },
  { id: 'warm-amber', label: 'Yellow', bgClass: 'bg-[#FFEB85]', hex: '#FFEB85' },
  { id: 'mint', label: 'Mint', bgClass: 'bg-[#A3F7CF]', hex: '#A3F7CF' },
  { id: 'sky-blue', label: 'Blue', bgClass: 'bg-[#B4E4FF]', hex: '#B4E4FF' },
  { id: 'soft-rose', label: 'Pink', bgClass: 'bg-[#FFC6D0]', hex: '#FFC6D0' },
  { id: 'lavender', label: 'Lavender', bgClass: 'bg-[#E2D4FF]', hex: '#E2D4FF' },
];

const DEFAULT_PREFERENCES: Preferences = {
  defaultColor: 'default',
  fontSize: 'medium',
  dashboardView: 'grid',
};

const STORAGE_KEY = 'mynotes_preferences';

interface PreferencesContextType {
  preferences: Preferences;
  setDefaultColor: (color: NoteColorVariant) => void;
  setFontSize: (size: EditorFontSize) => void;
  setDashboardView: (view: DashboardView) => void;
  fontSizeClass: string;
  proseSizeClass: string;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<Preferences>(() => {
    if (typeof window === 'undefined') return DEFAULT_PREFERENCES;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          defaultColor: parsed.defaultColor || DEFAULT_PREFERENCES.defaultColor,
          fontSize: parsed.fontSize || DEFAULT_PREFERENCES.fontSize,
          dashboardView: parsed.dashboardView || DEFAULT_PREFERENCES.dashboardView,
        };
      }
    } catch (e) {
      console.error('Failed to parse preferences from localStorage:', e);
    }
    return DEFAULT_PREFERENCES;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch (e) {
      console.error('Failed to save preferences to localStorage:', e);
    }
  }, [preferences]);

  const setDefaultColor = (color: NoteColorVariant) => {
    setPreferences((prev) => ({ ...prev, defaultColor: color }));
  };

  const setFontSize = (size: EditorFontSize) => {
    setPreferences((prev) => ({ ...prev, fontSize: size }));
  };

  const setDashboardView = (view: DashboardView) => {
    setPreferences((prev) => ({ ...prev, dashboardView: view }));
  };

  const fontSizeClass =
    preferences.fontSize === 'small'
      ? 'text-sm'
      : preferences.fontSize === 'large'
      ? 'text-lg'
      : 'text-base';

  const proseSizeClass =
    preferences.fontSize === 'small'
      ? 'prose-sm'
      : preferences.fontSize === 'large'
      ? 'prose-lg'
      : 'prose-base';

  return (
    <PreferencesContext.Provider
      value={{
        preferences,
        setDefaultColor,
        setFontSize,
        setDashboardView,
        fontSizeClass,
        proseSizeClass,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
}
