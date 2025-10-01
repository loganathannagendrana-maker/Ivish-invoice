
"use client"

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, getUser, removeUser, storeUser, authenticate } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedUser = getUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const authenticatedUser = authenticate(email, password);
    if (authenticatedUser) {
      setUser(authenticatedUser);
      storeUser(authenticatedUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    removeUser();
  };
  
  if (!isMounted) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
