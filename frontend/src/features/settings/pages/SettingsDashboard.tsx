import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Shield,
  Palette,
  Eye,
  EyeOff,
  Check,
  AlertTriangle,
  Sun,
  Moon,
  LayoutGrid,
  List,
  Sparkles,
  KeyRound,
  Trash2,
  Globe,
} from 'lucide-react';
import { useAuth, useUpdateUsername, useUpdatePassword, useDeleteAccount } from '../../auth/hooks/useAuth';
import { useTheme } from '../../../hooks/useTheme';
import { usePreferences, NOTE_COLOR_OPTIONS } from '../../../hooks/usePreferences';
import { usePageEnterAnimation } from '../../../lib/animations';
import { useLanguage } from '../../../context/LanguageContext';
import { cn } from '../../../lib/utils';

export function SettingsDashboard() {
  const navigate = useNavigate();
  const { data: user, isLoading: authLoading } = useAuth();
  const { isDark, setIsDark } = useTheme();
  const {
    preferences,
    setDefaultColor,
    setFontSize,
    setDashboardView,
    fontSizeClass,
  } = usePreferences();
  const { language, setLanguage, t } = useLanguage();

  const containerRef = usePageEnterAnimation(authLoading);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'preferences' | 'account'>('preferences');

  // Update Username State
  const [usernameInput, setUsernameInput] = useState('');
  const [usernameSuccess, setUsernameSuccess] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const updateUsername = useUpdateUsername();

  useEffect(() => {
    if (user?.username) {
      setUsernameInput(user.username);
    }
  }, [user?.username]);

  // Update Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const updatePassword = useUpdatePassword();

  // Delete Account Modal State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmDeleteText, setConfirmDeleteText] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const deleteAccount = useDeleteAccount();

  // Handlers
  const handleSaveUsername = async (e: React.FormEvent) => {
    e.preventDefault();
    setUsernameError('');
    setUsernameSuccess('');

    if (!usernameInput.trim()) {
      setUsernameError(t('usernameEmptyError'));
      return;
    }

    if (usernameInput.trim() === user?.username) {
      setUsernameSuccess(t('usernameSameError'));
      return;
    }

    try {
      await updateUsername.mutateAsync(usernameInput.trim());
      setUsernameSuccess(t('usernameSuccess'));
    } catch (err: any) {
      setUsernameError(err?.message || t('usernameFailed'));
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (!currentPassword) {
      setPasswordError(t('currentPasswordRequired'));
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setPasswordError(t('newPasswordMinLength'));
      return;
    }

    try {
      await updatePassword.mutateAsync({ currentPassword, newPassword });
      setPasswordSuccess(t('passwordSuccess'));
      setCurrentPassword('');
      setNewPassword('');
    } catch (err: any) {
      setPasswordError(err?.message || t('passwordFailed'));
    }
  };

  const handleDeleteAccount = async () => {
    setDeleteError('');

    try {
      await deleteAccount.mutateAsync();
      setShowDeleteModal(false);
      navigate('/login', { replace: true });
    } catch (err: any) {
      setDeleteError(err?.message || t('deleteFailed'));
    }
  };

  const translatedColorOptions = NOTE_COLOR_OPTIONS.map((opt) => {
    const labelMap: Record<string, string> = {
      default: t('colorWhite'),
      'warm-amber': t('colorYellow'),
      mint: t('colorMint'),
      'sky-blue': t('colorBlue'),
      'soft-rose': t('colorPink'),
      lavender: t('colorLavender'),
    };
    return { ...opt, label: labelMap[opt.id] || opt.label };
  });

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="gsap-header flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-3xl font-black text-black dark:text-white tracking-tight">
              {t('settingsTitle')}
            </h1>
            <span className="px-2.5 py-0.5 rounded-lg border-2 border-black bg-[#FFE066] text-black font-black text-xs shadow-[1.5px_1.5px_0px_0px_#000]">
              v1.0
            </span>
          </div>
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mt-1">
            {t('settingsSubtitle')}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="gsap-filters flex items-center space-x-3 border-b-2 border-black/15 pb-3">
        <button
          onClick={() => setActiveTab('preferences')}
          className={cn(
            "flex items-center gap-2 px-4 py-2 text-sm font-extrabold rounded-xl border-2 border-black transition-all cursor-pointer select-none",
            activeTab === 'preferences'
              ? "bg-[#C4B5FD] text-black shadow-[3px_3px_0px_0px_#000] translate-x-0.5"
              : "bg-white dark:bg-[#1E1E1E] text-black dark:text-white shadow-[2px_2px_0px_0px_#000] hover:bg-black/5"
          )}
        >
          <Palette className="w-4 h-4 stroke-[2.5]" />
          {t('tabAppearance')}
        </button>

        <button
          onClick={() => setActiveTab('account')}
          className={cn(
            "flex items-center gap-2 px-4 py-2 text-sm font-extrabold rounded-xl border-2 border-black transition-all cursor-pointer select-none",
            activeTab === 'account'
              ? "bg-[#C4B5FD] text-black shadow-[3px_3px_0px_0px_#000] translate-x-0.5"
              : "bg-white dark:bg-[#1E1E1E] text-black dark:text-white shadow-[2px_2px_0px_0px_#000] hover:bg-black/5"
          )}
        >
          <Shield className="w-4 h-4 stroke-[2.5]" />
          {t('tabAccount')}
        </button>
      </div>

      {/* ======================================================== */}
      {/* SECTION 2: Appearance & Editor Preferences               */}
      {/* ======================================================== */}
      {activeTab === 'preferences' && (
        <div className="space-y-6">
          {/* Theme Selector */}
          <div className="gsap-card p-6 rounded-2xl border-2 border-black bg-white dark:bg-[#1E1E1E] shadow-[4px_4px_0px_0px_#000000]">
            <div className="flex items-center gap-2.5 mb-1">
              <Sun className="w-5 h-5 text-amber-500 stroke-[2.5]" />
              <h2 className="text-lg font-black text-black dark:text-white tracking-tight">
                {t('themeMode')}
              </h2>
            </div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-4">
              {t('themeDesc')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Light Mode Button */}
              <button
                type="button"
                onClick={() => setIsDark(false)}
                className={cn(
                  "flex items-center justify-between p-4 rounded-xl border-2 border-black transition-all cursor-pointer select-none text-left",
                  !isDark
                    ? "bg-[#FFE066] text-black shadow-[4px_4px_0px_0px_#000] font-black translate-x-0.5"
                    : "bg-[#FAF4EB] dark:bg-[#252525] text-black dark:text-white shadow-[2px_2px_0px_0px_#000] hover:bg-black/5 opacity-80"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border-2 border-black flex items-center justify-center shadow-[1.5px_1.5px_0px_0px_#000]">
                    <Sun className="w-5 h-5 text-amber-500 stroke-[2.5]" />
                  </div>
                  <div>
                    <div className="text-sm font-black">{t('lightMode')}</div>
                    <div className="text-xs font-semibold opacity-75">{t('lightModeDesc')}</div>
                  </div>
                </div>
                {!isDark && (
                  <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </span>
                )}
              </button>

              {/* Dark Mode Button */}
              <button
                type="button"
                onClick={() => setIsDark(true)}
                className={cn(
                  "flex items-center justify-between p-4 rounded-xl border-2 border-black transition-all cursor-pointer select-none text-left",
                  isDark
                    ? "bg-[#C4B5FD] text-black shadow-[4px_4px_0px_0px_#000] font-black translate-x-0.5"
                    : "bg-[#FAF4EB] dark:bg-[#252525] text-black dark:text-white shadow-[2px_2px_0px_0px_#000] hover:bg-black/5 opacity-80"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1E1E1E] text-white border-2 border-black flex items-center justify-center shadow-[1.5px_1.5px_0px_0px_#000]">
                    <Moon className="w-5 h-5 text-indigo-300 stroke-[2.5]" />
                  </div>
                  <div>
                    <div className="text-sm font-black">{t('darkMode')}</div>
                    <div className="text-xs font-semibold opacity-75">{t('darkModeDesc')}</div>
                  </div>
                </div>
                {isDark && (
                  <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Language Selector */}
          <div className="gsap-card p-6 rounded-2xl border-2 border-black bg-white dark:bg-[#1E1E1E] shadow-[4px_4px_0px_0px_#000000]">
            <div className="flex items-center gap-2.5 mb-1">
              <Globe className="w-5 h-5 text-blue-500 stroke-[2.5]" />
              <h2 className="text-lg font-black text-black dark:text-white tracking-tight">
                {t('languageSettingTitle')}
              </h2>
            </div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-4">
              {t('languageSettingDesc')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Indonesian */}
              <button
                type="button"
                onClick={() => setLanguage('id')}
                className={cn(
                  "flex items-center justify-between p-4 rounded-xl border-2 border-black transition-all cursor-pointer select-none text-left",
                  language === 'id'
                    ? "bg-[#FF7890] text-black shadow-[4px_4px_0px_0px_#000] font-black translate-x-0.5"
                    : "bg-[#FAF4EB] dark:bg-[#252525] text-black dark:text-white shadow-[2px_2px_0px_0px_#000] hover:bg-black/5 opacity-80"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border-2 border-black flex items-center justify-center shadow-[1.5px_1.5px_0px_0px_#000] text-sm font-black text-black">
                    🇮🇩
                  </div>
                  <div>
                    <div className="text-sm font-black">{t('langId')}</div>
                    <div className="text-xs font-semibold opacity-75">{t('langIdDesc')}</div>
                  </div>
                </div>
                {language === 'id' && (
                  <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </span>
                )}
              </button>

              {/* English */}
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={cn(
                  "flex items-center justify-between p-4 rounded-xl border-2 border-black transition-all cursor-pointer select-none text-left",
                  language === 'en'
                    ? "bg-[#FFE066] text-black shadow-[4px_4px_0px_0px_#000] font-black translate-x-0.5"
                    : "bg-[#FAF4EB] dark:bg-[#252525] text-black dark:text-white shadow-[2px_2px_0px_0px_#000] hover:bg-black/5 opacity-80"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border-2 border-black flex items-center justify-center shadow-[1.5px_1.5px_0px_0px_#000] text-sm font-black text-black">
                    🇬🇧
                  </div>
                  <div>
                    <div className="text-sm font-black">{t('langEn')}</div>
                    <div className="text-xs font-semibold opacity-75">{t('langEnDesc')}</div>
                  </div>
                </div>
                {language === 'en' && (
                  <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Default Note Color */}
          <div className="gsap-card p-6 rounded-2xl border-2 border-black bg-white dark:bg-[#1E1E1E] shadow-[4px_4px_0px_0px_#000000]">
            <div className="flex items-center gap-2.5 mb-1">
              <Palette className="w-5 h-5 text-pink-500 stroke-[2.5]" />
              <h2 className="text-lg font-black text-black dark:text-white tracking-tight">
                {t('defaultColor')}
              </h2>
            </div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-4">
              {t('defaultColorDesc')}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {translatedColorOptions.map((option) => {
                const isSelected = preferences.defaultColor === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setDefaultColor(option.id)}
                    className={cn(
                      "flex flex-col items-center justify-center p-3 rounded-xl border-2 border-black transition-all cursor-pointer select-none",
                      option.bgClass,
                      isSelected
                        ? "shadow-[3px_3px_0px_0px_#000] scale-105 ring-2 ring-black font-black"
                        : "shadow-[1.5px_1.5px_0px_0px_#000] hover:scale-102 hover:shadow-[2.5px_2.5px_0px_0px_#000]"
                    )}
                  >
                    <div className="w-7 h-7 rounded-full border-2 border-black mb-2 flex items-center justify-center bg-white/40">
                      {isSelected ? (
                        <Check className="w-4 h-4 text-black stroke-[3]" />
                      ) : null}
                    </div>
                    <span className="text-xs font-black text-black">
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Editor Font Size */}
          <div className="gsap-card p-6 rounded-2xl border-2 border-black bg-white dark:bg-[#1E1E1E] shadow-[4px_4px_0px_0px_#000000]">
            <div className="flex items-center gap-2.5 mb-1">
              <Sparkles className="w-5 h-5 text-indigo-500 stroke-[2.5]" />
              <h2 className="text-lg font-black text-black dark:text-white tracking-tight">
                {t('editorFontSize')}
              </h2>
            </div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-4">
              {t('editorFontSizeDesc')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              {(
                [
                  { id: 'small', label: t('fontSizeSmall'), css: 'text-sm', desc: t('fontSizeSmallDesc') },
                  { id: 'medium', label: t('fontSizeMedium'), css: 'text-base', desc: t('fontSizeMediumDesc') },
                  { id: 'large', label: t('fontSizeLarge'), css: 'text-lg', desc: t('fontSizeLargeDesc') },
                ] as const
              ).map((size) => {
                const isSelected = preferences.fontSize === size.id;
                return (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() => setFontSize(size.id)}
                    className={cn(
                      "p-3.5 rounded-xl border-2 border-black transition-all cursor-pointer select-none text-left",
                      isSelected
                        ? "bg-[#C4B5FD] text-black shadow-[3px_3px_0px_0px_#000] font-black"
                        : "bg-[#FAF4EB] dark:bg-[#252525] text-black dark:text-white shadow-[1.5px_1.5px_0px_0px_#000] hover:bg-black/5"
                    )}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-black">{size.label}</span>
                      {isSelected && <Check className="w-4 h-4 text-black stroke-[3]" />}
                    </div>
                    <div className="text-xs font-semibold opacity-75">{size.desc}</div>
                  </button>
                );
              })}
            </div>

            {/* Live Font Preview Box */}
            <div className="p-4 rounded-xl border-2 border-black bg-[#FAF4EB] dark:bg-[#181818] shadow-[2px_2px_0px_0px_#000]">
              <span className="text-[10px] font-black uppercase tracking-wider text-gray-500 mb-1 block">
                {t('livePreview')}
              </span>
              <p className={cn("font-medium text-black dark:text-white leading-relaxed", fontSizeClass)}>
                {t('previewText')}
              </p>
            </div>
          </div>

          {/* Dashboard Layout View */}
          <div className="gsap-card p-6 rounded-2xl border-2 border-black bg-white dark:bg-[#1E1E1E] shadow-[4px_4px_0px_0px_#000000]">
            <div className="flex items-center gap-2.5 mb-1">
              <LayoutGrid className="w-5 h-5 text-emerald-500 stroke-[2.5]" />
              <h2 className="text-lg font-black text-black dark:text-white tracking-tight">
                {t('dashboardLayout')}
              </h2>
            </div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-4">
              {t('dashboardLayoutDesc')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setDashboardView('grid')}
                className={cn(
                  "flex items-center gap-3.5 p-4 rounded-xl border-2 border-black transition-all cursor-pointer select-none text-left",
                  preferences.dashboardView === 'grid'
                    ? "bg-[#FFE066] text-black shadow-[3px_3px_0px_0px_#000] font-black"
                    : "bg-[#FAF4EB] dark:bg-[#252525] text-black dark:text-white shadow-[1.5px_1.5px_0px_0px_#000] hover:bg-black/5"
                )}
              >
                <div className="w-10 h-10 rounded-xl bg-white border-2 border-black flex items-center justify-center shadow-[1.5px_1.5px_0px_0px_#000] shrink-0">
                  <LayoutGrid className="w-5 h-5 text-black stroke-[2.5]" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-black">{t('gridViewDefault')}</div>
                  <div className="text-xs font-semibold opacity-75">{t('gridViewDesc')}</div>
                </div>
                {preferences.dashboardView === 'grid' && (
                  <Check className="w-4 h-4 text-black stroke-[3] shrink-0" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setDashboardView('list')}
                className={cn(
                  "flex items-center gap-3.5 p-4 rounded-xl border-2 border-black transition-all cursor-pointer select-none text-left",
                  preferences.dashboardView === 'list'
                    ? "bg-[#FFE066] text-black shadow-[3px_3px_0px_0px_#000] font-black"
                    : "bg-[#FAF4EB] dark:bg-[#252525] text-black dark:text-white shadow-[1.5px_1.5px_0px_0px_#000] hover:bg-black/5"
                )}
              >
                <div className="w-10 h-10 rounded-xl bg-white border-2 border-black flex items-center justify-center shadow-[1.5px_1.5px_0px_0px_#000] shrink-0">
                  <List className="w-5 h-5 text-black stroke-[2.5]" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-black">{t('listViewTitle')}</div>
                  <div className="text-xs font-semibold opacity-75">{t('listViewDesc')}</div>
                </div>
                {preferences.dashboardView === 'list' && (
                  <Check className="w-4 h-4 text-black stroke-[3] shrink-0" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SECTION 1: Account & Security (Fullstack)                */}
      {/* ======================================================== */}
      {activeTab === 'account' && (
        <div className="space-y-6">
          {/* Update Username Card */}
          <div className="gsap-card p-6 rounded-2xl border-2 border-black bg-white dark:bg-[#1E1E1E] shadow-[4px_4px_0px_0px_#000000]">
            <div className="flex items-center gap-2.5 mb-1">
              <User className="w-5 h-5 text-blue-500 stroke-[2.5]" />
              <h2 className="text-lg font-black text-black dark:text-white tracking-tight">
                {t('updateUsername')}
              </h2>
            </div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-4">
              {t('updateUsernameDesc')}
            </p>

            <form onSubmit={handleSaveUsername} className="space-y-4 max-w-md">
              {usernameError && (
                <div className="bg-[#FFB5A7] text-black text-xs font-bold px-3.5 py-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 stroke-[2.5] shrink-0 text-red-600" />
                  <span>{usernameError}</span>
                </div>
              )}

              {usernameSuccess && (
                <div className="bg-[#A3F7CF] text-black text-xs font-bold px-3.5 py-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center gap-2">
                  <Check className="w-4 h-4 stroke-[3] shrink-0 text-emerald-700" />
                  <span>{usernameSuccess}</span>
                </div>
              )}

              <div>
                <label
                  htmlFor="settings-username"
                  className="block text-xs font-black uppercase tracking-wider text-black dark:text-white mb-1.5"
                >
                  {t('username')}
                </label>
                <input
                  id="settings-username"
                  type="text"
                  value={usernameInput}
                  onChange={(e) => {
                    setUsernameInput(e.target.value);
                    setUsernameError('');
                    setUsernameSuccess('');
                  }}
                  className="block w-full px-4 py-2.5 border-2 border-black rounded-xl text-black dark:text-white font-bold bg-white dark:bg-[#181818] shadow-[2px_2px_0px_0px_#000] focus:shadow-[3px_3px_0px_0px_#000] focus:outline-none transition-all text-sm"
                  placeholder={t('enterNewUsername')}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={updateUsername.isPending}
                className="bg-[#C4B5FD] hover:bg-[#B5A1FC] text-black border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none font-black text-sm px-5 py-2.5 transition-all select-none cursor-pointer disabled:opacity-50"
              >
                {updateUsername.isPending ? t('savingUsername') : t('saveUsername')}
              </button>
            </form>
          </div>

          {/* Change Password Card */}
          <div className="gsap-card p-6 rounded-2xl border-2 border-black bg-white dark:bg-[#1E1E1E] shadow-[4px_4px_0px_0px_#000000]">
            <div className="flex items-center gap-2.5 mb-1">
              <KeyRound className="w-5 h-5 text-amber-500 stroke-[2.5]" />
              <h2 className="text-lg font-black text-black dark:text-white tracking-tight">
                {t('changePassword')}
              </h2>
            </div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-4">
              {t('changePasswordDesc')}
            </p>

            <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-md">
              {passwordError && (
                <div className="bg-[#FFB5A7] text-black text-xs font-bold px-3.5 py-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 stroke-[2.5] shrink-0 text-red-600" />
                  <span>{passwordError}</span>
                </div>
              )}

              {passwordSuccess && (
                <div className="bg-[#A3F7CF] text-black text-xs font-bold px-3.5 py-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center gap-2">
                  <Check className="w-4 h-4 stroke-[3] shrink-0 text-emerald-700" />
                  <span>{passwordSuccess}</span>
                </div>
              )}

              {/* Current Password */}
              <div>
                <label
                  htmlFor="current-password"
                  className="block text-xs font-black uppercase tracking-wider text-black dark:text-white mb-1.5"
                >
                  {t('currentPassword')}
                </label>
                <div className="relative">
                  <input
                    id="current-password"
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => {
                      setCurrentPassword(e.target.value);
                      setPasswordError('');
                      setPasswordSuccess('');
                    }}
                    required
                    className="block w-full px-4 py-2.5 border-2 border-black rounded-xl text-black dark:text-white font-bold bg-white dark:bg-[#181818] shadow-[2px_2px_0px_0px_#000] focus:shadow-[3px_3px_0px_0px_#000] focus:outline-none transition-all text-sm pr-11"
                    placeholder={t('enterCurrentPassword')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-black dark:text-white hover:scale-110 focus:outline-none transition-transform cursor-pointer"
                    tabIndex={-1}
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="w-4.5 h-4.5 stroke-[2.2]" />
                    ) : (
                      <Eye className="w-4.5 h-4.5 stroke-[2.2]" />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label
                  htmlFor="new-password"
                  className="block text-xs font-black uppercase tracking-wider text-black dark:text-white mb-1.5"
                >
                  {t('newPasswordLabel')}
                </label>
                <div className="relative">
                  <input
                    id="new-password"
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setPasswordError('');
                      setPasswordSuccess('');
                    }}
                    required
                    minLength={6}
                    className="block w-full px-4 py-2.5 border-2 border-black rounded-xl text-black dark:text-white font-bold bg-white dark:bg-[#181818] shadow-[2px_2px_0px_0px_#000] focus:shadow-[3px_3px_0px_0px_#000] focus:outline-none transition-all text-sm pr-11"
                    placeholder={t('passwordMin')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-black dark:text-white hover:scale-110 focus:outline-none transition-transform cursor-pointer"
                    tabIndex={-1}
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-4.5 h-4.5 stroke-[2.2]" />
                    ) : (
                      <Eye className="w-4.5 h-4.5 stroke-[2.2]" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={updatePassword.isPending}
                className="bg-[#FFE066] hover:bg-[#FFD738] text-black border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none font-black text-sm px-5 py-2.5 transition-all select-none cursor-pointer disabled:opacity-50"
              >
                {updatePassword.isPending ? t('updatingPassword') : t('updatePasswordBtn')}
              </button>
            </form>
          </div>

          {/* Danger Zone Card */}
          <div className="gsap-card p-6 rounded-2xl border-2 border-red-600 bg-[#FFF1F2] dark:bg-[#2A1517] shadow-[4px_4px_0px_0px_#DC2626]">
            <div className="flex items-center gap-2.5 mb-1.5">
              <AlertTriangle className="w-5 h-5 text-red-600 stroke-[2.5]" />
              <h2 className="text-lg font-black text-red-700 dark:text-red-400 tracking-tight">
                {t('dangerZone')}
              </h2>
            </div>
            <p className="text-xs font-semibold text-red-900/80 dark:text-red-300/80 mb-5 max-w-xl leading-relaxed">
              {t('dangerZoneDesc')}
            </p>

            <button
              type="button"
              onClick={() => {
                setShowDeleteModal(true);
                setConfirmDeleteText('');
                setDeleteError('');
              }}
              className="bg-[#FF6B6B] hover:bg-[#FF5252] text-black border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none font-black text-sm px-5 py-2.5 transition-all select-none cursor-pointer flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4 stroke-[2.5]" />
              {t('deleteAccount')}
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* Delete Confirmation Modal (Neo-Brutalism)                */}
      {/* ======================================================== */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl border-3 border-black shadow-[8px_8px_0px_0px_#000] max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FF6B6B] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000] shrink-0">
                <AlertTriangle className="w-6 h-6 text-black stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-lg font-black text-black dark:text-white tracking-tight">
                  {t('deleteModalTitle')}
                </h3>
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
                  {t('deleteModalSubtitle')}
                </p>
              </div>
            </div>

            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 leading-relaxed bg-red-50 dark:bg-red-950/30 p-3 rounded-xl border-2 border-black/10">
              {t('deleteModalWarning', { username: user?.username || '' })}
            </p>

            {deleteError && (
              <div className="bg-[#FFB5A7] text-black text-xs font-bold p-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                {deleteError}
              </div>
            )}

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-black dark:text-white mb-1.5">
                {t('typeDeleteToConfirm')}
              </label>
              <input
                type="text"
                value={confirmDeleteText}
                onChange={(e) => setConfirmDeleteText(e.target.value)}
                placeholder="DELETE"
                className="block w-full px-4 py-2 border-2 border-black rounded-xl text-black dark:text-white font-bold bg-white dark:bg-[#181818] shadow-[2px_2px_0px_0px_#000] focus:outline-none text-sm"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-xl border-2 border-black bg-white dark:bg-[#252525] text-black dark:text-white font-black text-sm shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer"
              >
                {t('cancel')}
              </button>
              <button
                type="button"
                disabled={confirmDeleteText !== 'DELETE' || deleteAccount.isPending}
                onClick={handleDeleteAccount}
                className="px-5 py-2 rounded-xl border-2 border-black bg-[#FF6B6B] hover:bg-[#FF5252] text-black font-black text-sm shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] active:shadow-none transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {deleteAccount.isPending ? t('deletingAccount') : t('deleteEverything')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
