import { useState, useCallback } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  isFirstTime: boolean;
}

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function useAuth() {
  const [state, setState] = useState<AuthState>(() => {
    const stored = localStorage.getItem('aim100-auth');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return { isAuthenticated: parsed.isAuthenticated || false, username: parsed.username || null, isFirstTime: false };
      } catch {
        return { isAuthenticated: false, username: null, isFirstTime: true };
      }
    }
    const hasCredentials = !!localStorage.getItem('aim100-credentials');
    return { isAuthenticated: false, username: null, isFirstTime: !hasCredentials };
  });

  const [error, setError] = useState<string | null>(null);

  const setupPassword = useCallback(async (username: string, password: string) => {
    if (!username.trim()) { setError('Username is required'); return false; }
    if (password.length < 4) { setError('Password must be at least 4 characters'); return false; }
    const hashed = await hashPassword(password);
    localStorage.setItem('aim100-credentials', JSON.stringify({ username, passwordHash: hashed }));
    const newState = { isAuthenticated: true, username, isFirstTime: false };
    localStorage.setItem('aim100-auth', JSON.stringify(newState));
    setState(newState);
    setError(null);
    return true;
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const stored = localStorage.getItem('aim100-credentials');
    if (!stored) { setError('No account found. Please set up first.'); return false; }
    const { username: storedUser, passwordHash } = JSON.parse(stored);
    const hashed = await hashPassword(password);
    if (username === storedUser && hashed === passwordHash) {
      const newState = { isAuthenticated: true, username, isFirstTime: false };
      localStorage.setItem('aim100-auth', JSON.stringify(newState));
      setState(newState);
      setError(null);
      return true;
    }
    setError('Invalid username or password');
    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('aim100-auth');
    setState({ isAuthenticated: false, username: null, isFirstTime: !localStorage.getItem('aim100-credentials') });
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return { ...state, error, login, setupPassword, logout, clearError };
}
