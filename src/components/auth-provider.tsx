"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getFirebaseAuth } from '@/lib/firebase/config';
import { User, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only initialize auth on client side
    if (typeof window === "undefined") {
      setLoading(false);
      return;
    }

    try {
      const auth = getFirebaseAuth();
      if (!auth) {
        console.warn("Firebase Auth not initialized");
        setLoading(false);
        return;
      }

      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error("Error setting up auth listener:", error);
      setLoading(false);
    }
  }, []);

  const signOut = async () => {
    setLoading(true);
    try {
      const auth = getFirebaseAuth();
      if (!auth) {
        throw new Error("Firebase Auth not initialized");
      }
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
