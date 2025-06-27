import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { User } from '../types/contact';
import { ContactItem } from './ContactItem';
import { generateContactKey } from '../utils/keys';

interface ContactsTableProps {
  contacts: User[];
  onMessage: (contact: User) => void;
}

export const ContactsTable: React.FC<ContactsTableProps> = ({ contacts, onMessage }) => (
  <>
    <View className="flex-row px-2 py-2 border-b border-gray-300 bg-gray-200 rounded-t-lg">
      <Text className="flex-1 font-bold">Email</Text>
      <Text className="flex-1 font-bold">Name</Text>
      <Text className="w-12 font-bold text-center">Message</Text>
    </View>
    <FlatList
      data={contacts}
      keyExtractor={(item, index) => generateContactKey(item)}
      renderItem={({ item }) => <ContactItem contact={item} onMessage={onMessage} />}
      ListEmptyComponent={
        <Text className="text-center text-gray-500 mt-10">No contacts found.</Text>
      }
    />
  </>
); 