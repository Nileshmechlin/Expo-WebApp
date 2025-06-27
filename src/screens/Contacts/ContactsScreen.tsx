import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { View, Text, Alert } from 'react-native';
import { useContacts } from '../../hooks/useContact';
import { useContactSearch } from '../../hooks/useContactSearch';
import { useAuthStore } from '../../state/authStore';
import { User } from '../../types/contact';
import { SearchBar, ContactsTable, SearchResults } from '../../components';

const ContactScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const hasLoadedRef = useRef(false);

  const { user } = useAuthStore();
  const { contactUsers, loadContacts, addContactByEmail, isLoadingContacts, error } = useContacts(user?.$id || '');
  
  const { searchResults, searching, searchWithDebounce } = useContactSearch({
    currentUserId: user?.$id || '',
    contactUsers,
  });

  // Deduplicate contacts based on userId
  const uniqueContacts = useMemo(() => {
    const seen = new Set<string>();
    return contactUsers.filter(contact => {
      if (seen.has(contact.userId)) {
        return false;
      }
      seen.add(contact.userId);
      return true;
    });
  }, [contactUsers]);

  // Deduplicate search results based on userId
  const uniqueSearchResults = useMemo(() => {
    const seen = new Set<string>();
    return searchResults.filter(result => {
      if (seen.has(result.userId)) {
        return false;
      }
      seen.add(result.userId);
      return true;
    });
  }, [searchResults]);

  // Load contacts on mount - only once per user
  useEffect(() => {
    if (user?.$id && !hasLoadedRef.current) {
      console.log('🔄 Loading contacts for user:', user.$id);
      hasLoadedRef.current = true;
      loadContacts();
    }
  }, [user?.$id]); // Removed loadContacts from dependencies

  // Reset the ref when user changes
  useEffect(() => {
    hasLoadedRef.current = false;
  }, [user?.$id]);

  // Search functionality with debouncing
  useEffect(() => {
    const cleanup = searchWithDebounce(email);
    return cleanup;
  }, [email, searchWithDebounce]);

  // Event handlers
  const handleAddContact = useCallback(async (targetEmail?: string) => {
    const emailToAdd = (targetEmail ?? email).trim();
    if (!emailToAdd || loading) return; // Prevent multiple clicks

    setLoading(true);
    try {
      const error = await addContactByEmail(emailToAdd);
      if (error) {
        Alert.alert('Error', error);
      } else {
        Alert.alert('Success', 'Contact added successfully!');
        setEmail('');
        await loadContacts();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to add contact');
    } finally {
      setLoading(false);
    }
  }, [email, addContactByEmail, loadContacts, loading]);

  const handleMessage = useCallback((contact: User) => {
    Alert.alert('Message', `Start chat with ${contact.email}`);
  }, []);

  const handleEmailChange = useCallback((newEmail: string) => {
    if (!loading) { // Only allow changes when not loading
      setEmail(newEmail);
    }
  }, [loading]);

  // Early return if no user
  if (!user?.$id) {
    return (
      <View className="flex-1 bg-gray-100 px-4 pt-4 justify-center items-center">
        <Text className="text-lg text-gray-600">Please log in to view contacts</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100 px-4 pt-4">
      <Text className="text-2xl font-bold mb-4">My Contacts</Text>

      {/* Error Display */}
      {error && (
        <View className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <Text className="text-red-700 font-medium">Error:</Text>
          <Text className="text-red-600">{error}</Text>
          <Text 
            className="text-red-500 underline mt-2"
            onPress={() => loadContacts()}
          >
            Tap to retry
          </Text>
        </View>
      )}

      <SearchBar
        email={email}
        onEmailChange={handleEmailChange}
        onAdd={() => handleAddContact()}
        loading={loading}
      />

      {isLoadingContacts ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-600">Loading contacts...</Text>
        </View>
      ) : email.trim().length > 0 ? (
        <SearchResults
          results={uniqueSearchResults}
          searching={searching}
          onAdd={handleAddContact}
        />
      ) : (
        <ContactsTable
          contacts={uniqueContacts}
          onMessage={handleMessage}
        />
      )}
    </View>
  );
};

export default ContactScreen;
