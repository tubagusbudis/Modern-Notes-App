import { Link, useLocation } from 'react-router-dom';
import { FileText, Pin, Heart, Tag, Trash2, Settings, Sparkles } from 'lucide-react';
import clsx from 'clsx';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();

  const mainNav = [
    { name: 'All Notes', href: '/app/notes', icon: FileText },
    { name: 'Pinned', href: '/app/pinned', icon: Pin },
    { name: 'Favorites', href: '/app/favorites', icon: Heart },
    { name: 'Tags', href: '/app/tags', icon: Tag },
    { name: 'Trash', href: '/app/trash', icon: Trash2 },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-border-soft transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:flex-shrink-0 flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-16 flex items-center px-6 border-b border-border-soft/50">
          <Sparkles className="w-5 h-5 text-accent mr-2" />
          <span className="font-semibold text-primary text-lg">MyNotes</span>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <div className="text-xs font-semibold text-muted mb-2 px-3 tracking-wider">WORKSPACE</div>
          {mainNav.map((item) => {
            const isActive = location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={clsx(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-xl transition-colors",
                  isActive
                    ? "bg-accent-soft text-accent"
                    : "text-secondary hover:bg-subtle hover:text-primary"
                )}
                onClick={() => {
                  if (window.innerWidth < 768) onClose();
                }}
              >
                <item.icon
                  className={clsx(
                    "mr-3 flex-shrink-0 h-4 w-4",
                    isActive ? "text-accent" : "text-muted"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border-soft/50">
          <Link
            to="/app/settings"
            className={clsx(
              "flex items-center px-3 py-2 text-sm font-medium rounded-xl transition-colors",
              location.pathname.startsWith('/app/settings')
                ? "bg-accent-soft text-accent"
                : "text-secondary hover:bg-subtle hover:text-primary"
            )}
            onClick={() => {
              if (window.innerWidth < 768) onClose();
            }}
          >
            <Settings className="mr-3 flex-shrink-0 h-4 w-4 text-muted" aria-hidden="true" />
            Settings
          </Link>
        </div>
      </aside>
    </>
  );
}
