import React, { Suspense, useEffect, useState } from 'react';
import { Lock, Eye, EyeOff, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const ThreeBackground = React.lazy(() => import('./ThreeBackground'));

export const ResetPasswordPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ password });
      
      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
        // Redirect to app after 3 seconds
        setTimeout(() => {
          window.location.href = window.location.origin;
        }, 3000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex bg-[#1a3a2e]">
        {/* Left Panel - Three.js Farming Animation */}
        <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden">
          <Suspense fallback={null}>
            <ThreeBackground />
          </Suspense>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-[#1a3a2e]/80 z-5" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a2e]/60 via-transparent to-black/20 z-5" />

          {/* Minimal overlay branding */}
          <div className={`relative z-10 flex flex-col justify-between p-12 text-white w-full transition-all duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center gap-3">
              <img src="/logo.svg" alt="AgriScore" className="w-16 h-16 drop-shadow-2xl" />
            </div>

            <div className="max-w-lg">
              <h1 className="text-4xl xl:text-5xl font-bold leading-tight tracking-tight text-white drop-shadow-lg">
                Password updated
              </h1>
              <p className="text-white/80 text-lg leading-relaxed max-w-md mt-4 drop-shadow-md">
                You’ll be redirected back to the app in a moment.
              </p>
            </div>

            <div className="flex gap-12 pt-8 border-t border-white/30">
              <div>
                <div className="text-3xl font-bold text-yellow-300 drop-shadow-lg">Secure</div>
                <div className="text-white/80 text-sm mt-1 font-medium">Account Recovery</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Success */}
        <div className="w-full lg:w-[45%] flex items-center justify-center p-6 sm:p-10 bg-gradient-to-br from-orange-50 via-amber-50 to-green-50">
          <div className={`w-full max-w-md transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="lg:hidden text-center mb-10">
              <img src="/logo.svg" alt="AgriScore" className="w-20 h-20 mx-auto" />
              <p className="text-slate-500 mt-3">Secure account recovery</p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 border border-amber-100 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Password Updated!</h2>
              <p className="text-slate-600 mb-6">
                Your password has been successfully changed. You'll be redirected to the app shortly.
              </p>
              <div className="flex items-center justify-center gap-2 text-green-600">
                <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                <span className="text-sm font-medium">Redirecting...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#1a3a2e]">
      {/* Left Panel - Three.js Farming Animation */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden">
        <Suspense fallback={null}>
          <ThreeBackground />
        </Suspense>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-[#1a3a2e]/80 z-5" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a2e]/60 via-transparent to-black/20 z-5" />

        {/* Overlay Content */}
        <div className={`relative z-10 flex flex-col justify-between p-12 text-white w-full transition-all duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="AgriScore" className="w-16 h-16 drop-shadow-2xl" />
          </div>

          <div className="max-w-lg">
            <h1 className="text-5xl xl:text-6xl font-bold leading-tight tracking-tight text-white drop-shadow-lg">
              Secure your
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-amber-200 to-orange-300 bg-clip-text text-transparent drop-shadow-lg">
                account
              </span>
            </h1>
            <p className="text-white text-lg leading-relaxed max-w-md mt-6 italic drop-shadow-md">
              Set a strong new password to keep your farm data protected.
            </p>
          </div>

          <div className="flex gap-12 pt-8 border-t border-white/30">
            <div>
              <div className="text-3xl font-bold text-emerald-300 drop-shadow-lg">Fast</div>
              <div className="text-white/80 text-sm mt-1 font-medium">Password Reset</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-300 drop-shadow-lg">Safe</div>
              <div className="text-white/80 text-sm mt-1 font-medium">Secure Access</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Reset Form */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-6 sm:p-10 bg-gradient-to-br from-orange-50 via-amber-50 to-green-50">
        <div className={`w-full max-w-md transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-10">
            <img src="/logo.svg" alt="AgriScore" className="w-20 h-20 mx-auto" />
            <p className="text-slate-500 mt-3">Secure account recovery</p>
          </div>

          {/* Desktop Brand */}
          <div className="hidden lg:block text-center mb-10">
            <img src="/logo.svg" alt="AgriScore" className="w-20 h-20 mx-auto" />
            <p className="text-slate-500 mt-3">Secure account recovery</p>
          </div>

          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-800">Set New Password</h2>
            <p className="text-slate-500 mt-3">Choose a strong password to protect your account</p>
          </div>

          {/* Messages */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                required
                minLength={6}
                className="w-full pl-12 pr-12 py-3.5 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all text-slate-800 placeholder-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
                minLength={6}
                className="w-full pl-12 pr-12 py-3.5 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all text-slate-800 placeholder-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Password Requirements */}
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xs font-medium text-slate-600 mb-2">Password must:</p>
            <ul className="text-xs text-slate-500 space-y-1">
              <li className={`flex items-center gap-2 ${password.length >= 6 ? 'text-green-600' : ''}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${password.length >= 6 ? 'bg-green-500' : 'bg-slate-300'}`} />
                Be at least 6 characters long
              </li>
              <li className={`flex items-center gap-2 ${password === confirmPassword && password.length > 0 ? 'text-green-600' : ''}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${password === confirmPassword && password.length > 0 ? 'bg-green-500' : 'bg-slate-300'}`} />
                Match confirmation password
              </li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 via-amber-500 to-green-600 hover:from-orange-600 hover:via-amber-600 hover:to-green-700 text-white font-semibold py-4 rounded-xl transition-all shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Update Password
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* Back to Login */}
          <p className="text-center text-slate-600 mt-6">
            <a
              href={window.location.origin}
              className="text-green-600 hover:text-green-700 font-semibold"
            >
              Back to Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
