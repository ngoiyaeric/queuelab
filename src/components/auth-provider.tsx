"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/lib/supabaseClient'; 
import type { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  initializing: boolean; 
  signOut: () => Promise<void>; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error fetching initial session:", error);
          setInitializing(false);
          return;
        }

        setSession(currentSession);
        setUser(currentSession?.user ?? null);
      } catch (e) {
        console.error("Exception fetching initial session:", e);
      } finally {
        setInitializing(false);
      }
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      console.log('Supabase auth event:', event, newSession);
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setInitializing(false); 
    });

    return () => {
      if (authListener && typeof authListener.subscription?.unsubscribe === 'function') {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  const signOut = async () => {
    setInitializing(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", error.message);
      } 
    } catch (e) {
        console.error("Exception during sign out:", e);
    } 
  };


  const value = {
    session,
    user,
    initializing,
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
