import { useCallback, useState, useRef } from 'react';
import { useContactStore } from '../state/contactStore';
import {
  getContactsForUser,
  getUserById,
  addContact as addContactAPI,
  searchUsersByEmail,
} from '../services/contacts.service';
import { Contact, User } from '../types/contact'; // Import this to help TS

export const useContacts = (myUserId: string) => {
  const [isLoadingContacts, setIsLoadingContacts] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isLoadingRef = useRef(false);
  
  const {
    contacts,
    contactUsers,
    setContacts,
    setContactUsers,
    addContact: addContactToStore,
    resetContacts,
  } = useContactStore();

  const loadContacts = useCallback(async () => {
    if (!myUserId || isLoadingRef.current) return;
    
    isLoadingRef.current = true;
    setIsLoadingContacts(true);
    setError(null);
    
    try {
      // Fetch all contact documents for the user
      const contactDocs = await getContactsForUser(myUserId);
      
      // Map to Contact type
      const contacts: Contact[] = contactDocs.map((doc: any) => ({
        $id: doc.$id,
        ownerId: doc.ownerId,
        contactId: doc.contactId,
      }));
      
      setContacts(contacts);
      
      // Fetch user details for each contactId
      const users = await Promise.all(
        contacts.map((doc) => getUserById(doc.contactId))
      );
      
      const validUsers = users.filter((u): u is User => Boolean(u));
      setContactUsers(validUsers);
      
    } catch (error) {
      console.error('Error loading contacts:', error);
      
      // Set user-friendly error message
      if (error instanceof Error) {
        if (error.message.includes('JSON Parse error') || error.message.includes('Invalid response')) {
          setError('Server configuration issue. Please check your Appwrite setup.');
        } else if (error.message.includes('Network')) {
          setError('Network error. Please check your internet connection.');
        } else if (error.message.includes('Unauthorized')) {
          setError('Authentication error. Please log in again.');
        } else if (error.message.includes('not configured')) {
          setError('App configuration error. Please contact support.');
        } else {
          setError('Failed to load contacts. Please try again.');
        }
      } else {
        setError('An unexpected error occurred.');
      }
      
      // Clear contacts on error
      setContacts([]);
      setContactUsers([]);
    } finally {
      isLoadingRef.current = false;
      setIsLoadingContacts(false);
    }
  }, [myUserId]);

  const addContactByEmail = useCallback(async (email: string): Promise<string | null> => {
    if (!email.trim()) return 'Email is required';
    if (!myUserId) return 'User not authenticated';
  
    try {
      const foundUsers = await searchUsersByEmail(email.trim(), myUserId);
      const foundDoc = foundUsers[0];
    
      if (!foundDoc || typeof foundDoc.userId !== 'string' || typeof foundDoc.email !== 'string') {
        return 'User not found';
      }
    
      const found = foundDoc as unknown as User;
    
      const contact = await addContactAPI(myUserId, found.userId) as unknown as Contact;
    
      addContactToStore(contact, found);
      return null;
    } catch (error) {
      console.error('Error adding contact:', error);
      
      if (error instanceof Error) {
        if (error.message.includes('JSON Parse error')) {
          return 'Server configuration issue. Please try again later.';
        } else if (error.message.includes('Network')) {
          return 'Network error. Please check your connection.';
        } else if (error.message.includes('Unauthorized')) {
          return 'Authentication error. Please log in again.';
        }
      }
      
      return 'Failed to add contact. Please try again.';
    }
  }, [myUserId, addContactToStore]);
  
  return {
    contacts,
    contactUsers,
    loadContacts,
    addContactByEmail,
    resetContacts,
    isLoadingContacts,
    error,
  };
};
