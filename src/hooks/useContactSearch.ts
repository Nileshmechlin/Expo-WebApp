import { useState, useCallback } from 'react';
import { User } from '../types/contact';
import { listAllUsers } from '../services/contacts.service';

interface UseContactSearchProps {
  currentUserId: string;
  contactUsers: User[];
}

export const useContactSearch = ({ currentUserId, contactUsers }: UseContactSearchProps) => {
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [searching, setSearching] = useState(false);

  const performSearch = useCallback(async (searchEmail: string) => {
    if (!searchEmail.trim()) {
      setSearchResults([]);
      setSearching(false);
      return;
    }

    setSearching(true);
    try {
      const allUsers = await listAllUsers(currentUserId);
      
      // Create a set of existing contact user IDs for faster lookup
      const existingContactIds = new Set(contactUsers.map(u => u.userId));
      
      const filtered = allUsers
        .filter((u: any) => {
          // Validate user data structure
          const isValidUser = typeof u.userId === 'string' && 
                             typeof u.email === 'string' &&
                             typeof u.$id === 'string';
          
          // Check if user is not already a contact
          const notAlreadyAdded = !existingContactIds.has(u.userId);
          
          // Check if email matches search query
          const matchesSearch = u.email.toLowerCase().includes(searchEmail.trim().toLowerCase());
          
          // Check if it's not the current user
          const notCurrentUser = u.userId !== currentUserId;
          
          return isValidUser && notAlreadyAdded && matchesSearch && notCurrentUser;
        })
        .map((u: any) => ({
          ...u,
          $id: u.$id || `temp-${u.userId}`, // Ensure $id exists
        } as User))
        .filter((user, index, self) => 
          // Remove duplicates based on userId
          index === self.findIndex(u => u.userId === user.userId)
        );
      
      setSearchResults(filtered);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  }, [currentUserId, contactUsers]);

  const searchWithDebounce = useCallback((email: string) => {
    const debounceTimer = setTimeout(() => performSearch(email), 300);
    return () => clearTimeout(debounceTimer);
  }, [performSearch]);

  return {
    searchResults,
    searching,
    searchWithDebounce,
  };
}; 