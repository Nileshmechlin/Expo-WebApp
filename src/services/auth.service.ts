import { ID, Permission, Role, Databases } from 'react-native-appwrite';
import { AppwriteUser } from '../types/auth';
import { account, databases } from '../api/appwrite';
import { APPWRITE_DB_ID, USERS_COLLECTION_ID } from '@/api/appwrite-ids';

export const signUp = async (email: string, password: string): Promise<AppwriteUser> => {
  await account.create(ID.unique(), email, password);
  await signIn(email, password);
  const user = await account.get();

  await databases.createDocument(
    APPWRITE_DB_ID,
    USERS_COLLECTION_ID,
    ID.unique(),
    {
      userId:user.$id,
      email: user.email,
      name: user.name || '',
    },
    [
      Permission.read(Role.users()),
      Permission.write(Role.user(user.$id)),
    ]
  )
  return user;
};

export const signIn = async (email: string, password: string): Promise<AppwriteUser> => {
  await account.createEmailPasswordSession(email, password);
  return await account.get();
};

export const getCurrentUser = async (): Promise<AppwriteUser> => {
  return await account.get();
};

export const signOut = async (): Promise<void> => {
  await account.deleteSession('current');
};
