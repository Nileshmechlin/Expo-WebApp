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
      set({ user });
    } catch {
      set({ user: null });
    } finally {
      set({ isLoadingUser: false });
    }
  },

  signUp: async (email, password) => {
    set({ isLoadingUser: true, error: null });
    try {
      const user = await signUp(email, password);
      set({ user });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Signup failed';
      set({ error: message });
    } finally {
      set({ isLoadingUser: false });
    }
  },

  signIn: async (email, password) => {
    set({ isLoadingUser: true, error: null });
    try {
      const user = await signIn(email, password);
      set({ user });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      set({ error: message });
    } finally {
      set({ isLoadingUser: false });
    }
  },

  signOut: async () => {
    set({ isLoadingUser: true, error: null });
    try {
      await signOut();
      set({ user: null });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Logout failed';
      set({ error: message });
    } finally {
      set({ isLoadingUser: false });
    }
  },
}));
