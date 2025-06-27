import React, { useState } from 'react';
import { Text, FlatList } from 'react-native';
import { User } from '../types/contact';
import { SearchItem } from './SearchItem';
import { generateSearchKey } from '../utils/keys';

interface SearchResultsProps {
  results: User[];
  searching: boolean;
  onAdd: (email: string) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ results, searching, onAdd }) => {
  const [addingEmails, setAddingEmails] = useState<Set<string>>(new Set());

  const handleAdd = async (email: string) => {
    if (addingEmails.has(email)) return; // Prevent multiple clicks
    
    setAddingEmails(prev => new Set(prev).add(email));
    
    try {
      await onAdd(email);
    } finally {
      setAddingEmails(prev => {
        const newSet = new Set(prev);
        newSet.delete(email);
        return newSet;
      });
    }
  };

  return (
    <FlatList
      data={results}
      keyExtractor={(item, index) => generateSearchKey(item)}
      renderItem={({ item }) => (
        <SearchItem 
          user={item} 
          onAdd={handleAdd}
          isAdding={addingEmails.has(item.email)}
          disabled={addingEmails.size > 0} // Disable all buttons when any is adding
        />
      )}
      ListEmptyComponent={
        searching ? 
          <Text className="text-center text-gray-500 mt-10">Searching...</Text> : 
          <Text className="text-center text-gray-500 mt-10">No users found.</Text>
      }
    />
  );
}; 