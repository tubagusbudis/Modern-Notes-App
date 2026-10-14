import { Menu, Search, Sun, Moon, LogOut } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useAuth, useLogout } from '../../features/auth/hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';

interface TopBarProps {
  onOpenSidebar: () => void;
}

export function TopBar({ onOpenSidebar }: TopBarProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const navigate = useNavigate();

  const { data: user } = useAuth();
  const logout = useLogout();
  const { isDark, toggleTheme } = useTheme();

  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val) {
      searchParams.set('q', val);
    } else {
      searchParams.delete('q');
    }
    setSearchParams(searchParams, { replace: true });
  };

  const handleLogout = async () => {
    setShowUserMenu(false);
    await logout.mutateAsync();
    navigate('/login', { replace: true });
  };

  const userInitial = user?.username?.charAt(0).toUpperCase() || 'U';

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
        
        {/* User avatar & dropdown */}
        <div className="relative" ref={userMenuRef}>
          <button
            type="button"
            className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
            title={user?.username || 'User'}
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <span className="sr-only">Open user menu</span>
            <div className="h-8 w-8 rounded-full bg-accent-soft flex items-center justify-center text-accent font-semibold">
              {userInitial}
            </div>
          </button>

          {/* Dropdown menu */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-surface rounded-xl shadow-lg border border-border-soft py-1 z-50">
              <div className="px-4 py-3 border-b border-border-soft/50">
                <p className="text-sm font-medium text-primary truncate">{user?.username}</p>
                <p className="text-xs text-muted mt-0.5">Signed in</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-danger hover:bg-danger/5 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
