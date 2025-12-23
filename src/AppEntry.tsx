import React, { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { useAuth } from './hooks/useAuth';

const AppShell = lazy(() => import('./App'));
const AuthPage = lazy(() => import('./components/auth/AuthPage').then((m) => ({ default: m.AuthPage })));
const ResetPasswordPage = lazy(() => import('./components/auth/ResetPasswordPage').then((m) => ({ default: m.ResetPasswordPage })));

const FullscreenLoader = ({ label = 'Loading...' }: { label?: string }) => (
  <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
      <p className="text-slate-600 font-medium">{label}</p>
    </div>
  </div>
);

export default function AppEntry() {
  const { user, loading, signOut, isConfigured } = useAuth();
  const [isPasswordRecovery, setIsPasswordRecovery] = useState(false);
  const [demoAcknowledged, setDemoAcknowledged] = useState(false);
  const [demoOverrideEnabled, setDemoOverrideEnabled] = useState(false);

  // Preload the heavy UI shell as early as possible (in parallel with auth check)
  useEffect(() => {
    void import('./App');
  }, []);

  // Check if this is a password recovery redirect
  useEffect(() => {
    const computeIsRecovery = () => {
      const hash = window.location.hash || '';
      const search = window.location.search || '';

      const searchParams = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);

      // Supabase can put params either in the hash (implicit flow) or in query params (PKCE/code flow).
      // HashRouter may also use hashes like "#/path?type=recovery".
      const hashQueryString = hash.includes('?')
        ? hash.split('?')[1] ?? ''
        : hash.startsWith('#')
          ? hash.slice(1)
          : hash;
      const hashParams = new URLSearchParams(hashQueryString);

      const typeFromSearch = searchParams.get('type');
      const typeFromHash = hashParams.get('type');

      const isRecovery =
        typeFromSearch === 'recovery' ||
        typeFromHash === 'recovery' ||
        hash.toLowerCase().includes('type=recovery') ||
        search.toLowerCase().includes('type=recovery');

      setIsPasswordRecovery(isRecovery);
    };

    computeIsRecovery();
    window.addEventListener('hashchange', computeIsRecovery);
    window.addEventListener('popstate', computeIsRecovery);
    return () => {
      window.removeEventListener('hashchange', computeIsRecovery);
      window.removeEventListener('popstate', computeIsRecovery);
    };
  }, []);

  const demoAvailable = useMemo(() => {
    return !isConfigured || demoOverrideEnabled;
  }, [isConfigured, demoOverrideEnabled]);

  const shouldShowAuth = useMemo(() => {
    if (user) return false;
    // If demo isn't available, always show auth.
    // If demo is available, show auth until user opts into demo.
    return !demoAvailable || !demoAcknowledged;
  }, [user, demoAvailable, demoAcknowledged]);

  const handleContinueDemo = () => {
    // Enable demo override if Supabase is configured but unreachable.
    setDemoOverrideEnabled(true);
    setDemoAcknowledged(true);
  };

  if (isPasswordRecovery) {
    return (
      <Suspense fallback={<FullscreenLoader label="Loading password reset..." />}>
        <ResetPasswordPage />
      </Suspense>
    );
  }

  if (loading) {
    return <FullscreenLoader />;
  }

  if (shouldShowAuth) {
    return (
      <Suspense fallback={<FullscreenLoader label="Loading sign in..." />}>
        <AuthPage onContinueDemo={handleContinueDemo} />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<FullscreenLoader label="Loading dashboard..." />}>
      <AppShell onLogout={signOut} />
    </Suspense>
  );
}
