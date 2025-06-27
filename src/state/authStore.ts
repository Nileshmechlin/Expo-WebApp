import { create } from 'zustand';
import {
  signUp,
  signIn,
  getCurrentUser,
  signOut,
} from '../services/auth.service';

import { AuthContextType } from '../types/auth';

export const useAuthStore = create<AuthContextType>((set) => ({
  user: null,
  isLoadingUser: false,
  error: null,

  fetchUser: async () => {
    set({ isLoadingUser: true, error: null });
    try {
      const user = await getCurrentUser();
      console.log('🔍 Fetched user:', user ? 'User found' : 'No user');
      set({ user });
    } catch (error) {
      console.log('🔍 No current user session');
      set({ user: null });
    } finally {
      set({ isLoadingUser: false });
    }
  },

  signUp: async (email, password) => {
    set({ isLoadingUser: true, error: null });
    try {
      const user = await signUp(email, password);
      console.log('✅ User signed up successfully');
      set({ user });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Signup failed';
      console.error('❌ Signup error:', error);
      set({ error: message });
    } finally {
      set({ isLoadingUser: false });
    }
  },

  signIn: async (email, password) => {
    set({ isLoadingUser: true, error: null });
    try {
      const user = await signIn(email, password);
      console.log('✅ User signed in successfully');
      set({ user });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      console.error('❌ Signin error:', error);
      set({ error: message });
    } finally {
      set({ isLoadingUser: false });
    }
  },

  signOut: async () => {
    console.log('🔄 Starting sign out process...');
    set({ isLoadingUser: true, error: null });
    try {
      await signOut();
      console.log('✅ User signed out successfully');
      set({ user: null, error: null });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Logout failed';
      console.error('❌ Signout error:', error);
      set({ error: message });
    } finally {
      set({ isLoadingUser: false });
    }
  },
}));
