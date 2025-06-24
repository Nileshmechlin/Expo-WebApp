import { client, databases, ID } from '../api/appwrite';
const DATABASE_ID = '6859996500305a41de63';
const COLLECTION_ID = '685999bb0024318441ae';

export const sendMessage = async (senderId: string, receiverId: string, text: string) => {
  return await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
    senderId,
    receiverId,
    text,
    timestamp: new Date().toISOString(),
  });
};

export const fetchMessages = async () => {
  return await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
};

export const subscribeToMessages = (callback: Function) => {
  return client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`, (response) => {
    callback(response.payload);
  });
};
