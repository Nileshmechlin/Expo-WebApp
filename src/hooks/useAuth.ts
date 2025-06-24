import { useAuthStore } from '../state/authStore';

export const useAuth = () => {
  const {
    user,
    isLoadingUser,
    error,
    signUp,
    signIn,
    signOut,
    fetchUser,
  } = useAuthStore();

  const isLoggedIn = !!user;

  return {
    user,
    isLoadingUser,
    error,
    isLoggedIn,
    signUp,
    signIn,
    signOut,
    fetchUser,
  };
};
