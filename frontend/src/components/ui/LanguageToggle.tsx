import { Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface LanguageToggleProps {
  id?: string;
  className?: string;
}

export function LanguageToggle({ id = 'language-toggle-btn', className = '' }: LanguageToggleProps) {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      id={id}
      data-testid={id}
      type="button"
      onClick={toggleLanguage}
      className={`h-10 px-3 rounded-xl bg-white dark:bg-[#1E1E1E] border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center gap-2 transition-all text-black dark:text-white cursor-pointer select-none font-black text-xs ${className}`}
      title={language === 'en' ? 'Beralih ke Bahasa Indonesia (ID)' : 'Switch to English (EN)'}
      aria-label="Toggle language"
    >
      <Globe className="w-4 h-4 stroke-[2.4] text-black dark:text-white shrink-0" />
      <div className="flex items-center gap-1 text-[11px] font-black uppercase tracking-wider">
        <span
          className={`px-1.5 py-0.5 rounded-md transition-colors ${
            language === 'id'
              ? 'bg-[#FF7890] text-black border border-black shadow-[1px_1px_0px_0px_#000]'
              : 'text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white'
          }`}
        >
          ID
        </span>
        <span className="text-gray-300 dark:text-gray-600 font-bold">/</span>
        <span
          className={`px-1.5 py-0.5 rounded-md transition-colors ${
            language === 'en'
              ? 'bg-[#FFE066] text-black border border-black shadow-[1px_1px_0px_0px_#000]'
              : 'text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white'
          }`}
        >
          EN
        </span>
      </div>
    </button>
  );
}
