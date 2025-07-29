// 'use client';

// import { createContext, useContext, useEffect, useState } from 'react';
// import { supabase } from '@/app/(site)/lib/supabaseClient';
// import { Session, User } from '@supabase/supabase-js';
// import toast from 'react-hot-toast';

// interface AuthContextType {
//     session: Session | null;
//     user: User | null;
//     setSession: (session: Session | null) => void;
//     signUp: (email: string, password: string, username: string) => Promise<void>;
//     signIn: (email: string, password: string) => Promise<void>;
//     signOut: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType>({
//     session: null,
//     user: null,
//     setSession: () => { },
//     signUp: async () => { },
//     signIn: async () => { },
//     signOut: async () => { },
// });

// export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
//     const [session, setSession] = useState<Session | null>(null);

//     useEffect(() => {
//         const getSession = async () => {
//             const { data } = await supabase.auth.getSession();
//             setSession(data.session);
//         };

//         getSession();

//         const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
//             setSession(session);
//         });

//         return () => {
//             listener.subscription.unsubscribe();
//         };
//     }, []);

//     // ✅ signUp
//     const signUp = async (email: string, password: string, username: string) => {
//         const { data, error } = await supabase.auth.signUp({
//             email,
//             password,
//             options: {
//                 data: { username },
//             },
//         });

//         if (error) {
//             toast.error(`Sign up error: ${error.message}`);
//             throw error;
//         } else {
//             toast.success('Account created! Check your email to confirm.');
//         }
//     };

//     // ✅ signIn
//     const signIn = async (email: string, password: string) => {
//         const { data, error } = await supabase.auth.signInWithPassword({
//             email,
//             password,
//         });

//         if (error) {
//             toast.error(`Sign in failed: ${error.message}`);
//             throw error;
//         } else {
//             setSession(data.session);
//             toast.success('Signed in successfully!');
//         }
//     };

//     // ✅ signOut
//     const signOut = async () => {
//         const { error } = await supabase.auth.signOut();

//         if (error) {
//             toast.error(`Sign out failed: ${error.message}`);
//         } else {
//             setSession(null);
//             toast.success('Signed out successfully!');
//         }
//     };

//     return (
//         <AuthContext.Provider
//             value={{
//                 session,
//                 user: session?.user || null,
//                 setSession,
//                 signUp,
//                 signIn,
//                 signOut,
//             }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);

'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '../app/(site)/lib/supabaseClient';
import { Session, User } from '@supabase/supabase-js';
import toast from 'react-hot-toast';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  setSession: (session: Session | null) => void;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signIn: (email: string, password: string, remember?: boolean) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const initSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session ?? null);
    };

    initSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        localStorage.setItem('rememberedSession', JSON.stringify(session));
      } else {
        localStorage.removeItem('rememberedSession');
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // ✅ Реєстрація
  const signUp = async (email: string, password: string, username: string): Promise<void> => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
      },
    });

    if (error) {
      toast.error(`Sign up error: ${error.message}`);
      throw error;
    }

    toast.success('Account created! Check your email to confirm.');
  };

  // ✅ Вхід
  const signIn = async (email: string, password: string, remember = false): Promise<void> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(`Sign in failed: ${error.message}`);
      throw error;
    }

    setSession(data.session);

    if (remember) {
      localStorage.setItem('rememberedSession', JSON.stringify(data.session));
    }

    toast.success('Signed in successfully!');
  };

  // ✅ Вихід
  const signOut = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(`Sign out failed: ${error.message}`);
      throw error;
    }

    setSession(null);
    localStorage.removeItem('rememberedSession');
    toast.success('Signed out successfully!');
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        setSession,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};
