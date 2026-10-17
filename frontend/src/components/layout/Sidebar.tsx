import { Link, useLocation } from 'react-router-dom';
import { FileText, Pin, Heart, Tag, Trash2, Settings, BookOpen } from 'lucide-react';
import clsx from 'clsx';
import { useLanguage } from '../../context/LanguageContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const { t } = useLanguage();

  const mainNav = [
    { name: t('allNotes'), href: '/app/notes', icon: FileText },
    { name: t('pinned'), href: '/app/pinned', icon: Pin },
    { name: t('favorites'), href: '/app/favorites', icon: Heart },
    { name: t('tags'), href: '/app/tags', icon: Tag },
    { name: t('trash'), href: '/app/trash', icon: Trash2 },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-50 w-64 bg-[#F8F5EE] dark:bg-[#181818] border-r-2 border-black transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:flex-shrink-0 flex flex-col justify-between",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div>
          {/* Logo Header */}
          <div className="h-16 flex items-center px-6 border-b-2 border-black">
            <div className="w-9 h-9 rounded-xl bg-[#FFE066] border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center justify-center mr-3 shrink-0">
              <BookOpen className="w-5 h-5 text-black stroke-[2.5]" />
            </div>
            <div className="flex items-center">
              <span className="font-black text-black dark:text-white text-xl tracking-tight">MyNotes</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF7890] border-2 border-black ml-1.5 inline-block" />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="py-5 px-3.5 space-y-2">
            <div className="text-[11px] font-black text-gray-500 dark:text-gray-400 mb-2 px-3 tracking-widest uppercase">
              {t('workspace')}
            </div>
            {mainNav.map((item) => {
              const isActive = location.pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={clsx(
                    "flex items-center px-3.5 py-2.5 text-sm font-extrabold rounded-xl transition-all duration-150 select-none",
                    isActive
                      ? "bg-[#C4B5FD] text-black border-2 border-black shadow-[3px_3px_0px_0px_#000] translate-x-1"
                      : "text-gray-800 dark:text-gray-200 border-2 border-transparent hover:border-black hover:bg-black/5 hover:translate-x-0.5"
                  )}
                  onClick={() => {
                    if (window.innerWidth < 768) onClose();
                  }}
                >
                  <item.icon
                    className={clsx(
                      "mr-3 flex-shrink-0 h-4.5 w-4.5 stroke-[2.2]",
                      isActive ? "text-black" : "text-gray-600 dark:text-gray-400"
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Settings Link */}
        <div className="p-3.5 border-t-2 border-black">
          <Link
            to="/app/settings"
            className={clsx(
              "flex items-center px-3.5 py-2.5 text-sm font-extrabold rounded-xl transition-all duration-150 select-none",
              location.pathname.startsWith('/app/settings')
                ? "bg-[#C4B5FD] text-black border-2 border-black shadow-[3px_3px_0px_0px_#000] translate-x-1"
                : "text-gray-800 dark:text-gray-200 border-2 border-transparent hover:border-black hover:bg-black/5 hover:translate-x-0.5"
            )}
            onClick={() => {
              if (window.innerWidth < 768) onClose();
            }}
          >
            <Settings className="mr-3 flex-shrink-0 h-4.5 w-4.5 stroke-[2.2] text-gray-600 dark:text-gray-400" aria-hidden="true" />
            {t('settings')}
          </Link>
        </div>
      </aside>
    </>
  );
}
