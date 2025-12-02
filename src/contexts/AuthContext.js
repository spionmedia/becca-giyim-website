import React, { createContext, useState, useEffect, useContext } from 'react';
import supabase from '../services/supabaseClient';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Check active sessions and sets the user
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    };

    getSession();

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email, password, metadata = {}) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });
    if (error) throw error;
    return data;
  };

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };



  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const resetPassword = async (email) => {
    const redirectTo = `${window.location.origin}/#/reset-password`;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo
    });
    if (error) throw error;
  };

  const updatePassword = async (password) => {
    const { data, error } = await supabase.auth.updateUser({ password });
    if (error) throw error;
    return data;
  };

  const updateProfile = async (updates) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert(updates);

      if (error) {
        throw error;
      }

      // Update local state
      setProfile((prev) => ({ ...prev, ...updates }));
    } catch (error) {
      throw error;
    }
  };

  const deleteAccount = async () => {
    // Note: Supabase client-side deletion of users requires service_role key or specific RLS/Edge Function.
    // For security, usually we mark as deleted or use an Edge Function.
    // Here we will just sign out for now and maybe call an RPC if implemented.
    // Or we can delete the profile data.

    // For this implementation, we'll assume an Edge Function or RPC is needed for full user deletion
    // but we can delete the profile row.

    /* 
    const { error } = await supabase.rpc('delete_user'); 
    if (error) throw error;
    */

    alert("Hesap silme işlemi için yönetici ile iletişime geçiniz veya backend fonksiyonu eklenmelidir.");
  };

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    deleteAccount,
    resetPassword,
    updatePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
