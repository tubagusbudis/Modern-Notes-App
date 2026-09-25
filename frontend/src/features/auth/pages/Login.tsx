import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin, useRegister } from '../hooks/useAuth';
import { Eye, EyeOff } from 'lucide-react';

export function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const login = useLogin();
  const register = useRegister();
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

  const isPending = login.isPending || register.isPending;

  return (
    <div className="min-h-screen flex items-center justify-center bg-app px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-surface p-8 rounded-2xl shadow-sm border border-border-soft">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-primary">
            ✦ MyNotes
          </h2>
          <p className="mt-2 text-center text-sm text-secondary">
            Your private note space
          </p>
        </div>
        
        {/* Toggle Login / Register */}
        <div className="flex justify-center space-x-4 mb-4">
          <button
            onClick={() => setIsLogin(true)}
            className={`text-sm font-medium border-b-2 pb-1 ${isLogin ? 'border-accent text-accent' : 'border-transparent text-secondary hover:text-primary'}`}
          >
            Sign in
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`text-sm font-medium border-b-2 pb-1 ${!isLogin ? 'border-accent text-accent' : 'border-transparent text-secondary hover:text-primary'}`}
          >
            Create Account
          </button>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-danger/10 text-danger text-sm px-4 py-3 rounded-lg border border-danger/20">
              {error}
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-border-soft placeholder-muted text-primary rounded-t-md focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm bg-subtle"
                placeholder="Username"
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-border-soft placeholder-muted text-primary rounded-b-md focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm bg-subtle pr-10"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted hover:text-primary focus:outline-none z-20"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Eye className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={isPending}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-accent hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isPending ? (isLogin ? 'Signing in...' : 'Creating account...') : (isLogin ? 'Sign in' : 'Create Account')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
