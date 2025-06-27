import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { User } from '../types/contact';

interface SearchItemProps {
  user: User;
  onAdd: (email: string) => void;
  isAdding?: boolean;
  disabled?: boolean;
}

export const SearchItem: React.FC<SearchItemProps> = ({ 
  user, 
  onAdd, 
  isAdding = false, 
  disabled = false 
}) => (
  <View className="m-2 flex-row items-center rounded-xl bg-white p-4 shadow">
    <View className="flex-1">
      <Text className="text-lg font-bold">{user.email}</Text>
      <Text className="text-gray-600">{user.name || ''}</Text>
    </View>
    <TouchableOpacity
      onPress={() => onAdd(user.email)}
      disabled={isAdding || disabled}
      className={`ml-4 flex-row items-center space-x-1 rounded-lg px-3 py-1 ${
        isAdding || disabled 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-blue-600 cursor-pointer'
      }`}
    >
      {isAdding ? (
        <>
          <ActivityIndicator size="small" color="white" />
          <Text className="text-white ml-1">Adding...</Text>
        </>
      ) : (
        <Text className="text-white">Add</Text>
      )}
    </TouchableOpacity>
  </View>
);
