import { Menu, Search, Sun, Moon } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface TopBarProps {
  onOpenSidebar: () => void;
}

export function TopBar({ onOpenSidebar }: TopBarProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkStored = localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDark(isDarkStored);
    if (isDarkStored) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val) {
      searchParams.set('q', val);
    } else {
      searchParams.delete('q');
    }
    setSearchParams(searchParams, { replace: true });
  };

  const userInitial = 'U';

  return (
    <header className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 bg-surface border-b border-border-soft z-30">
      <div className="flex items-center flex-1">
        <button
          type="button"
          className="md:hidden p-2 -ml-2 mr-2 text-secondary hover:text-primary hover:bg-subtle rounded-md"
          onClick={onOpenSidebar}
        >
          <span className="sr-only">Open sidebar</span>
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="max-w-md w-full relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-muted group-focus-within:text-accent transition-colors" aria-hidden="true" />
          </div>
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            className="block w-full pl-9 pr-14 py-2 border border-transparent rounded-lg leading-5 bg-subtle text-primary placeholder-muted focus:outline-none focus:bg-surface focus:border-border-soft focus:ring-1 focus:ring-accent transition-all sm:text-sm"
            placeholder="Search notes or type a command..."
          />
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
            <kbd className="hidden sm:inline-flex items-center border border-border-soft rounded px-2 text-xs font-sans font-medium text-muted">
              Ctrl K
            </kbd>
          </div>
        </div>
      </div>

      <div className="ml-4 flex items-center md:ml-6 space-x-3">
        <button
          type="button"
          onClick={toggleTheme}
          className="p-2 text-secondary hover:text-primary hover:bg-subtle rounded-full transition-colors"
        >
          <span className="sr-only">Toggle theme</span>
          {isDark ? <Sun className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />}
        </button>
        
        {/* User avatar */}
        <div className="relative">
          <button
            type="button"
            className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
            title="User"
          >
            <span className="sr-only">Open user menu</span>
            <div className="h-8 w-8 rounded-full bg-accent-soft flex items-center justify-center text-accent font-semibold">
              {userInitial}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
