export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? '';
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';
export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY ?? '';

export const isSupabaseEnvConfigured = (): boolean => {
  const url = SUPABASE_URL.trim();
  const key = SUPABASE_ANON_KEY.trim();

  // Supabase project URL format: https://<project-ref>.supabase.co
  const looksLikeSupabaseUrl = /^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/i.test(url);
  const looksLikePlaceholderUrl = url === 'https://placeholder.supabase.co';
  const looksLikePlaceholderKey =
    key === 'placeholder-key' ||
    key.toLowerCase().includes('placeholder') ||
    key.toLowerCase().includes('your_supabase');

  // anon keys are long JWT-like strings; this is a sanity check only
  const looksLikeRealKey = key.length >= 40;

  return Boolean(url && key && looksLikeSupabaseUrl && !looksLikePlaceholderUrl && !looksLikePlaceholderKey && looksLikeRealKey);
};
