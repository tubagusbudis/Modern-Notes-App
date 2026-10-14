import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin, useRegister, useForgotPassword } from '../hooks/useAuth';
import { useTheme } from '../../../hooks/useTheme';
import { Eye, EyeOff, X, KeyRound, NotebookPen, Sun, Moon } from 'lucide-react';

export function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  // Theme state
  const { isDark, toggleTheme } = useTheme();
  
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
      setError(err?.message || `${isLogin ? 'Login' : 'Registration'} failed. Please try again.`);
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError('');
    setForgotSuccess('');

    try {
      await forgotPassword.mutateAsync({ username: forgotUsername, newPassword: forgotNewPassword });
      setForgotSuccess('Password updated successfully! You can now sign in.');
      setForgotUsername('');
      setForgotNewPassword('');
    } catch (err: any) {
      setForgotError(err?.message || 'Failed to reset password.');
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
    <div className="min-h-screen flex items-center justify-center bg-app px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      {/* Theme Toggle Button */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
        <button
          type="button"
          onClick={toggleTheme}
          className="p-2.5 text-secondary hover:text-primary bg-surface/80 hover:bg-subtle border border-border-soft rounded-xl shadow-xs transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-accent/40"
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="w-5 h-5 text-warning" aria-hidden="true" /> : <Moon className="w-5 h-5" aria-hidden="true" />}
        </button>
      </div>

      <div className="max-w-md w-full space-y-6 relative z-10">
        {/* Logo & Title */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 mb-4">
            <NotebookPen className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-3xl font-bold text-primary tracking-tight">
            MyNotes
          </h1>
          <p className="mt-2 text-sm text-secondary">
            Your private, secure note space
          </p>
        </div>

        {/* Card */}
        <div className="bg-surface p-8 rounded-2xl shadow-sm border border-border-soft">
          {/* Toggle Login / Register */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex bg-subtle rounded-xl p-1 gap-1">
              <button
                onClick={() => { setIsLogin(true); setError(''); }}
                className={`px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isLogin
                    ? 'bg-surface text-accent shadow-sm'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => { setIsLogin(false); setError(''); }}
                className={`px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  !isLogin
                    ? 'bg-surface text-accent shadow-sm'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                Create Account
              </button>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-danger/10 text-danger text-sm px-4 py-3 rounded-xl border border-danger/20 flex items-start gap-2">
                <span className="shrink-0 mt-0.5">⚠</span>
                <span>{error}</span>
              </div>
            )}

            {/* Username */}
            <div>
              <label htmlFor="auth-username" className="block text-sm font-medium text-primary mb-1.5">
                Username
              </label>
              <input
                id="auth-username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full px-4 py-2.5 border border-border-soft rounded-xl text-primary placeholder-muted bg-subtle focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all sm:text-sm"
                placeholder="Enter your username"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="auth-password" className="block text-sm font-medium text-primary mb-1.5">
                Password
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
                  className="block w-full px-4 py-2.5 border border-border-soft rounded-xl text-primary placeholder-muted bg-subtle focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all sm:text-sm pr-11"
                  placeholder={isLogin ? 'Enter your password' : 'Min. 6 characters'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-muted hover:text-primary focus:outline-none transition-colors z-20"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4.5 w-4.5" aria-hidden="true" />
                  ) : (
                    <Eye className="h-4.5 w-4.5" aria-hidden="true" />
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
                  className="text-xs text-accent hover:text-accent/80 transition-colors font-medium"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-accent hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
            >
              {isPending
                ? (isLogin ? 'Signing in...' : 'Creating account...')
                : (isLogin ? 'Sign In' : 'Create Account')
              }
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted">
          Secure & encrypted. Your notes stay private.
        </p>
      </div>

      {/* ─── Forgot Password Modal ─── */}
      {showForgot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeForgotModal}
          />

          {/* Modal */}
          <div className="relative bg-surface rounded-2xl shadow-xl border border-border-soft max-w-sm w-full p-6 space-y-5 animate-in fade-in zoom-in-95">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <KeyRound className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary">Reset Password</h3>
                  <p className="text-xs text-secondary">Enter your username and new password</p>
                </div>
              </div>
              <button
                onClick={closeForgotModal}
                className="p-1.5 text-muted hover:text-primary hover:bg-subtle rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleForgotSubmit} className="space-y-4">
              {forgotError && (
                <div className="bg-danger/10 text-danger text-sm px-4 py-3 rounded-xl border border-danger/20">
                  {forgotError}
                </div>
              )}
              {forgotSuccess && (
                <div className="bg-success/10 text-success text-sm px-4 py-3 rounded-xl border border-success/20">
                  {forgotSuccess}
                </div>
              )}

              <div>
                <label htmlFor="forgot-username" className="block text-sm font-medium text-primary mb-1.5">
                  Username
                </label>
                <input
                  id="forgot-username"
                  type="text"
                  required
                  value={forgotUsername}
                  onChange={(e) => setForgotUsername(e.target.value)}
                  className="block w-full px-4 py-2.5 border border-border-soft rounded-xl text-primary placeholder-muted bg-subtle focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all sm:text-sm"
                  placeholder="Your username"
                />
              </div>

              <div>
                <label htmlFor="forgot-new-password" className="block text-sm font-medium text-primary mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="forgot-new-password"
                    type={showForgotPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={forgotNewPassword}
                    onChange={(e) => setForgotNewPassword(e.target.value)}
                    className="block w-full px-4 py-2.5 border border-border-soft rounded-xl text-primary placeholder-muted bg-subtle focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all sm:text-sm pr-11"
                    placeholder="Min. 6 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(!showForgotPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-muted hover:text-primary focus:outline-none transition-colors z-20"
                    tabIndex={-1}
                  >
                    {showForgotPassword ? (
                      <EyeOff className="h-4.5 w-4.5" aria-hidden="true" />
                    ) : (
                      <Eye className="h-4.5 w-4.5" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={closeForgotModal}
                  className="flex-1 py-2.5 px-4 text-sm font-medium rounded-xl text-secondary bg-subtle hover:bg-subtle/70 transition-colors border border-border-soft"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={forgotPassword.isPending}
                  className="flex-1 py-2.5 px-4 text-sm font-semibold rounded-xl text-white bg-accent hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  {forgotPassword.isPending ? 'Updating...' : 'Reset Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
