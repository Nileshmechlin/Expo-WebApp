import {
    Databases,
    Query,
    ID,
    Permission,
    Role,
  } from 'react-native-appwrite';
  import { client } from '../api/appwrite';
  import {
    APPWRITE_DB_ID,
    USERS_COLLECTION_ID,
    CONTACTS_COLLECTION_ID
  }from '../api/appwrite-ids';
  import { User } from '@/types/contact';

const databases = new Databases(client);

// Validate environment variables
const validateConfig = () => {
  if (!APPWRITE_DB_ID) {
    throw new Error('APPWRITE_DB_ID is not configured');
  }
  if (!USERS_COLLECTION_ID) {
    throw new Error('USERS_COLLECTION_ID is not configured');
  }
  if (!CONTACTS_COLLECTION_ID) {
    throw new Error('CONTACTS_COLLECTION_ID is not configured');
  }
};

// Safe API call wrapper
const safeApiCall = async <T>(apiCall: () => Promise<T>): Promise<T> => {
  try {
    validateConfig();
    return await apiCall();
  } catch (error) {
    console.error('Appwrite API Error:', error);
    if (error instanceof Error) {
      if (error.message.includes('JSON Parse error')) {
        throw new Error('Invalid response from server. Please check your Appwrite configuration.');
      }
      if (error.message.includes('Network')) {
        throw new Error('Network error. Please check your internet connection.');
      }
      if (error.message.includes('Unauthorized')) {
        throw new Error('Authentication error. Please log in again.');
      }
    }
    throw new Error('Failed to fetch data. Please try again.');
  }
};

export const searchUsersByEmail = async(
    email:string,
    myUserId:string
) => {
    return safeApiCall(async () => {
      const res = await databases.listDocuments(
          APPWRITE_DB_ID,
          USERS_COLLECTION_ID,
          [
              Query.equal('email',email),
              Query.notEqual('userId',myUserId),
          ]
      );
      return res.documents || [];
    });
};

export const addContact = async(ownerId:string, contactId:string)=>{
    return safeApiCall(async () => {
      return await databases.createDocument(
          APPWRITE_DB_ID,
          CONTACTS_COLLECTION_ID,
          ID.unique(),
          {ownerId,contactId},
          [
              Permission.read(Role.user(ownerId)),
              Permission.write(Role.user(ownerId))
          ]
      );
    });
};

export const getContactIds = async(ownerId:string) => {
    return safeApiCall(async () => {
      const res = await databases.listDocuments(
          APPWRITE_DB_ID,
          CONTACTS_COLLECTION_ID,
          [Query.equal('ownerId',ownerId)]
      );
      return (res.documents || []).map((doc)=> doc.contactId);
    });
};

export const getUserById = async (userId: string): Promise<User | null> => {
    return safeApiCall(async () => {
      const res = await databases.listDocuments(
        APPWRITE_DB_ID,
        USERS_COLLECTION_ID,
        [Query.equal('userId', userId)]
      );
    
      const doc = res.documents?.[0];
      return doc ? (doc as unknown as User) : null;
    });
};

export const listAllUsers = async (excludeUserId: string) => {
  return safeApiCall(async () => {
    const res = await databases.listDocuments(
      APPWRITE_DB_ID,
      USERS_COLLECTION_ID,
      [Query.notEqual('userId', excludeUserId)]
    );
    return res.documents || [];
  });
};

export const getContactsForUser = async (ownerId: string) => {
  return safeApiCall(async () => {
    const res = await databases.listDocuments(
      APPWRITE_DB_ID,
      CONTACTS_COLLECTION_ID,
      [Query.equal('ownerId', ownerId)]
    );
    return res.documents || [];
  });
};
