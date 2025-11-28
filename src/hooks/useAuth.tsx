'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export type Role = 'user' | 'neuroscientist' | null;

export interface AuthUser {
  id: string;
  name: string;
  role: Role;
}

const STORAGE_KEY = 'harmony_user_v1';

export const useAuth = () => {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      setUser(null);
    }
  }, []);

  const login = (payload: AuthUser) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    setUser(payload);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    router.push('/');
  };

  const isAuthenticated = !!user;

  return {
    user,
    login,
    logout,
    isAuthenticated,
  } as const;
};

export default useAuth;
