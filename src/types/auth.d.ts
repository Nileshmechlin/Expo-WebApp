import { Models } from 'react-native-appwrite';

export type AppwriteUser = Models.User<Models.Preferences>;

export type AuthContextType = {
  user: AppwriteUser | null;
  isLoadingUser: boolean;
  error: string | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  fetchUser: () => Promise<void>;mj
};
