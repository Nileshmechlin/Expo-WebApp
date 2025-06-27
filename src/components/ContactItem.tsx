import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { User } from '../types/contact';

interface ContactItemProps {
  contact: User;
  onMessage: (contact: User) => void;
}

export const ContactItem: React.FC<ContactItemProps> = ({ contact, onMessage }) => (
  <View className="flex-row items-center bg-white p-4 m-2 rounded-xl shadow">
    <View className="flex-1">
      <Text className="text-lg font-bold">{contact.email}</Text>
      <Text className="text-gray-600">{contact.name || ''}</Text>
    </View>
    <TouchableOpacity onPress={() => onMessage(contact)} className="ml-4">
      <Text style={{ fontSize: 24 }}>💬</Text>
    </TouchableOpacity>
  </View>
); 