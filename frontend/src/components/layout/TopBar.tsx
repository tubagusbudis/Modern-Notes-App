import { Menu, Search, LogOut } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useAuth, useLogout } from '../../features/auth/hooks/useAuth';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageToggle } from '../ui/LanguageToggle';

interface TopBarProps {
  onOpenSidebar: () => void;
}

export function TopBar({ onOpenSidebar }: TopBarProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const navigate = useNavigate();

  const { data: user } = useAuth();
  const logout = useLogout();
  const { t } = useLanguage();

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
    <header className="h-16 flex items-center justify-between px-4 sm:px-6 bg-white dark:bg-[#1E1E1E] border-b-2 border-black z-30 relative">
      <div className="flex items-center flex-1">
        <button
          type="button"
          className="md:hidden p-2 -ml-1 mr-2 text-black dark:text-white bg-white dark:bg-[#1E1E1E] border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_#000] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all"
          onClick={onOpenSidebar}
        >
          <span className="sr-only">{t('openSidebar')}</span>
          <Menu className="h-5 w-5 stroke-[2.5]" aria-hidden="true" />
        </button>

        <div className="max-w-md w-full relative group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-black dark:text-white stroke-[2.5]" aria-hidden="true" />
          </div>
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            className="block w-full pl-10 pr-20 py-2 border-2 border-black rounded-xl bg-white dark:bg-[#1E1E1E] text-black dark:text-white font-bold placeholder-gray-500 shadow-[2px_2px_0px_0px_#000] focus:shadow-[3px_3px_0px_0px_#000] focus:outline-none transition-all sm:text-sm"
            placeholder={t('searchPlaceholder')}
          />
          <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
            <kbd className="hidden sm:inline-flex items-center border-2 border-black bg-[#FAF4EB] dark:bg-[#181818] rounded-md px-1.5 py-0.5 text-[10px] font-black text-black dark:text-white shadow-[1px_1px_0px_0px_#000]">
              Ctrl K
            </kbd>
          </div>
        </div>
      </div>

      <div className="ml-4 flex items-center md:ml-6 space-x-3">
        {/* Language Switcher */}
        <LanguageToggle id="theme-toggle-btn" />
        
        {/* User Avatar & Dropdown */}
        <div className="relative" ref={userMenuRef}>
          <button
            type="button"
            className="w-10 h-10 rounded-xl bg-[#C4B5FD] border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center justify-center text-black font-black text-sm select-none transition-all cursor-pointer"
            title={user?.username || 'User'}
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <span className="sr-only">{t('openUserMenu')}</span>
            {userInitial}
          </button>

          {/* Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2.5 w-56 bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-[4px_4px_0px_0px_#000] border-2 border-black py-2 z-50">
              <div className="px-4 py-2 border-b-2 border-black/10">
                <p className="text-sm font-black text-black dark:text-white truncate">{user?.username}</p>
                <p className="text-xs font-semibold text-gray-500 mt-0.5">{t('signedIn')}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-extrabold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4 stroke-[2.5]" />
                {t('signOut')}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
