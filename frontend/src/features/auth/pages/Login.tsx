import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin, useRegister, useForgotPassword } from '../hooks/useAuth';
import { useLanguage } from '../../../context/LanguageContext';
import { LanguageToggle } from '../../../components/ui/LanguageToggle';
import { Eye, EyeOff, X, KeyRound, NotebookPen } from 'lucide-react';

export function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const { t } = useLanguage();
  
  // Forgot password modal state
  const [showForgot, setShowForgot] = useState(false);
  const [forgotUsername, setForgotUsername] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotError, setForgotError] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');
  
  const login = useLogin();
  const register = useRegister();
  const forgotPassword = useForgotPassword();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await login.mutateAsync({ username, password });
      } else {
        await register.mutateAsync({ username, password });
      }
      navigate('/app/notes', { replace: true });
    } catch (err: any) {
      setError(err?.message || (isLogin ? t('loginFailed') : t('registerFailed')));
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError('');
    setForgotSuccess('');

    try {
      await forgotPassword.mutateAsync({ username: forgotUsername, newPassword: forgotNewPassword });
      setForgotSuccess(t('resetSuccess'));
      setForgotUsername('');
      setForgotNewPassword('');
    } catch (err: any) {
      setForgotError(err?.message || t('resetError'));
    }
  };

  const closeForgotModal = () => {
    setShowForgot(false);
    setForgotUsername('');
    setForgotNewPassword('');
    setForgotError('');
    setForgotSuccess('');
    setShowForgotPassword(false);
  };

  const isPending = login.isPending || register.isPending;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF4EB] dark:bg-[#121212] px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none">
      {/* Playful Floating Geometric Accents in Background */}
      <div className="absolute top-8 left-12 w-10 h-10 bg-[#FFE066] border-3 border-black rounded-2xl shadow-[3px_3px_0px_0px_#000] rotate-12 pointer-events-none hidden sm:block" />
      <div className="absolute top-16 right-16 w-8 h-8 bg-[#B4E4FF] border-3 border-black rounded-xl shadow-[3px_3px_0px_0px_#000] -rotate-12 pointer-events-none hidden sm:block" />
      <div className="absolute bottom-12 left-16 w-9 h-9 bg-[#FF7890] border-3 border-black rounded-full shadow-[3px_3px_0px_0px_#000] pointer-events-none hidden sm:block" />
      <div className="absolute bottom-16 right-14 w-7 h-7 bg-[#A3F7CF] border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_#000] rotate-45 pointer-events-none hidden sm:block" />

      {/* Language Switcher Button (in place of Theme Toggle) */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
        <LanguageToggle id="login-theme-toggle" />
      </div>

      <div className="max-w-md w-full space-y-6 relative z-10">
        {/* Logo & Title */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#FFE066] border-3 border-black shadow-[3px_3px_0px_0px_#000] mb-4">
            <NotebookPen className="w-8 h-8 text-black stroke-[2.5]" />
          </div>
          <h1 className="text-4xl font-black text-black dark:text-white tracking-tight flex items-center justify-center">
            {t('appName')}
            <span className="w-3 h-3 rounded-full bg-[#FF7890] border-2 border-black ml-1.5 inline-block" />
          </h1>
          <p className="mt-2 text-sm font-bold text-gray-600 dark:text-gray-400">
            {t('tagline')}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-[#1E1E1E] p-7 sm:p-9 rounded-3xl border-3 sm:border-4 border-black shadow-[6px_6px_0px_0px_#000000] sm:shadow-[8px_8px_0px_0px_#000000]">
          {/* Toggle Login / Register */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex bg-[#FAF4EB] dark:bg-[#181818] border-2 border-black rounded-2xl p-1 gap-1 shadow-[2px_2px_0px_0px_#000]">
              <button
                type="button"
                onClick={() => { setIsLogin(true); setError(''); }}
                className={`px-5 py-2 text-sm font-black rounded-xl transition-all duration-150 cursor-pointer ${
                  isLogin
                    ? 'bg-[#C4B5FD] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000]'
                    : 'text-gray-700 dark:text-gray-300 border-2 border-transparent hover:text-black'
                }`}
              >
                {t('signIn')}
              </button>
              <button
                type="button"
                onClick={() => { setIsLogin(false); setError(''); }}
                className={`px-5 py-2 text-sm font-black rounded-xl transition-all duration-150 cursor-pointer ${
                  !isLogin
                    ? 'bg-[#C4B5FD] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000]'
                    : 'text-gray-700 dark:text-gray-300 border-2 border-transparent hover:text-black'
                }`}
              >
                {t('createAccount')}
              </button>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-[#FFB5A7] text-black text-sm px-4 py-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-start gap-2 font-bold">
                <span className="shrink-0 mt-0.5">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* Username */}
            <div>
              <label htmlFor="auth-username" className="block text-xs font-black uppercase tracking-wider text-black dark:text-white mb-1.5">
                {t('username')}
              </label>
              <input
                id="auth-username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full px-4 py-2.5 border-2 border-black rounded-xl text-black dark:text-white font-bold placeholder-gray-400 bg-white dark:bg-[#181818] shadow-[2px_2px_0px_0px_#000] focus:shadow-[3px_3px_0px_0px_#000] focus:outline-none transition-all sm:text-sm"
                placeholder={t('usernamePlaceholder')}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="auth-password" className="block text-xs font-black uppercase tracking-wider text-black dark:text-white mb-1.5">
                {t('password')}
              </label>
              <div className="relative">
                <input
                  id="auth-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete={isLogin ? 'current-password' : 'new-password'}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-4 py-2.5 border-2 border-black rounded-xl text-black dark:text-white font-bold placeholder-gray-400 bg-white dark:bg-[#181818] shadow-[2px_2px_0px_0px_#000] focus:shadow-[3px_3px_0px_0px_#000] focus:outline-none transition-all sm:text-sm pr-11"
                  placeholder={isLogin ? t('passwordPlaceholder') : t('passwordMin')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-black dark:text-white hover:scale-110 focus:outline-none transition-transform z-20 cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4.5 w-4.5 stroke-[2.2]" aria-hidden="true" />
                  ) : (
                    <Eye className="h-4.5 w-4.5 stroke-[2.2]" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password Link (only on sign in) */}
            {isLogin && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowForgot(true)}
                  className="text-xs text-black dark:text-white underline hover:text-[#FF7890] transition-colors font-extrabold cursor-pointer"
                >
                  {t('forgotPassword')}
                </button>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full flex justify-center py-3 px-4 border-2 border-black text-sm font-black rounded-xl text-black bg-[#FF7890] hover:bg-[#FF617D] shadow-[3px_3px_0px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              {isPending
                ? (isLogin ? t('signingIn') : t('creatingAccount'))
                : (isLogin ? t('signInBtn') : t('createAccountBtn'))
              }
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs font-bold text-gray-500">
          {t('authFooter')}
        </p>
      </div>

      {/* ─── Forgot Password Modal ─── */}
      {showForgot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            onClick={closeForgotModal}
          />

          {/* Modal */}
          <div className="relative bg-white dark:bg-[#1E1E1E] rounded-3xl border-3 sm:border-4 border-black shadow-[6px_6px_0px_0px_#000000] max-w-sm w-full p-6 sm:p-7 space-y-5 animate-in fade-in zoom-in-95 z-10">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFE066] border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center justify-center text-black">
                  <KeyRound className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-black dark:text-white">{t('resetPassword')}</h3>
                  <p className="text-xs font-bold text-gray-500">{t('resetPasswordDesc')}</p>
                </div>
              </div>
              <button
                onClick={closeForgotModal}
                className="p-1.5 text-black dark:text-white bg-white dark:bg-[#1E1E1E] border-2 border-black rounded-xl shadow-[1.5px_1.5px_0px_0px_#000] hover:bg-black/5 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            <form onSubmit={handleForgotSubmit} className="space-y-4">
              {forgotError && (
                <div className="bg-[#FFB5A7] text-black text-sm px-4 py-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000] font-bold">
                  {forgotError}
                </div>
              )}
              {forgotSuccess && (
                <div className="bg-[#A3F7CF] text-black text-sm px-4 py-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000] font-bold">
                  {forgotSuccess}
                </div>
              )}

              <div>
                <label htmlFor="forgot-username" className="block text-xs font-black uppercase tracking-wider text-black dark:text-white mb-1.5">
                  {t('username')}
                </label>
                <input
                  id="forgot-username"
                  type="text"
                  required
                  value={forgotUsername}
                  onChange={(e) => setForgotUsername(e.target.value)}
                  className="block w-full px-4 py-2.5 border-2 border-black rounded-xl text-black dark:text-white font-bold placeholder-gray-400 bg-white dark:bg-[#181818] shadow-[2px_2px_0px_0px_#000] focus:shadow-[3px_3px_0px_0px_#000] focus:outline-none transition-all sm:text-sm"
                  placeholder={t('usernamePlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="forgot-new-password" className="block text-xs font-black uppercase tracking-wider text-black dark:text-white mb-1.5">
                  {t('newPassword')}
                </label>
                <div className="relative">
                  <input
                    id="forgot-new-password"
                    type={showForgotPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={forgotNewPassword}
                    onChange={(e) => setForgotNewPassword(e.target.value)}
                    className="block w-full px-4 py-2.5 border-2 border-black rounded-xl text-black dark:text-white font-bold placeholder-gray-400 bg-white dark:bg-[#181818] shadow-[2px_2px_0px_0px_#000] focus:shadow-[3px_3px_0px_0px_#000] focus:outline-none transition-all sm:text-sm pr-11"
                    placeholder={t('passwordMin')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(!showForgotPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-black dark:text-white hover:scale-110 focus:outline-none transition-transform z-20 cursor-pointer"
                    tabIndex={-1}
                  >
                    {showForgotPassword ? (
                      <EyeOff className="h-4.5 w-4.5 stroke-[2.2]" aria-hidden="true" />
                    ) : (
                      <Eye className="h-4.5 w-4.5 stroke-[2.2]" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeForgotModal}
                  className="flex-1 py-2.5 px-4 text-sm font-black rounded-xl text-black dark:text-white bg-white dark:bg-[#1E1E1E] border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-black/5 transition-all cursor-pointer"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  disabled={forgotPassword.isPending}
                  className="flex-1 py-2.5 px-4 text-sm font-black rounded-xl text-black bg-[#C4B5FD] hover:bg-[#B5A1FC] border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  {forgotPassword.isPending ? t('updating') : t('reset')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
