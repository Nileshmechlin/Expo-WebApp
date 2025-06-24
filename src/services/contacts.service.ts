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

const databases = new Databases(client);

export const searchUsersByEmail = async(
    email:string,
    myUserId:string
) => {
    const res = await databases.listDocuments(
        APPWRITE_DB_ID,
        USERS_COLLECTION_ID,
        [
            Query.equal('email',email),
            Query.notEqual('userId',myUserId),
        ]
    );
    return res.documents;
};

export const addContact = async(ownerId:string, contactId:string)=>{
    return databases.createDocument(
        APPWRITE_DB_ID,
        CONTACTS_COLLECTION_ID,
        ID.unique(),
        {ownerId,contactId},
    [
        Permission.read(Role.user(ownerId)),
        Permission.write(Role.user(ownerId),)
    ]
    );
};

export const getContactIds = async(ownerId:string) => {
    const res = await databases.listDocuments(
        APPWRITE_DB_ID,
        CONTACTS_COLLECTION_ID,
        [Query.equal('ownerId',ownerId)]
    );
    return res.documents.map((doc)=> doc.contactId);
};

export const getUserById = async(userId: string) => {
    const res = await databases.listDocuments(
        APPWRITE_DB_ID,
        USERS_COLLECTION_ID,
        [Query.equal('userId',userId)]
    );

    return res.documents[0] || null;
};
