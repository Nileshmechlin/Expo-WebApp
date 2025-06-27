import React from 'react';
import { View } from 'react-native';
import { Input } from './Input';
import { Button } from './Button';

interface SearchBarProps {
  email: string;
  onEmailChange: (email: string) => void;
  onAdd: () => void;
  loading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  email, 
  onEmailChange, 
  onAdd, 
  loading 
}) => (
  <View className="flex-row items-center mb-4 space-x-2">
    <View className="flex-1">
      <Input
        value={email}
        onChangeText={onEmailChange}
        placeholder="Search or add by email"
        autoCapitalize="none"
        editable={!loading}
      />
    </View>
    <Button
      title={loading ? 'Adding...' : 'Add'}
      onPress={onAdd}
      loading={loading}
      disabled={!email.trim()}
      style={{ width: 80, marginLeft: 8 }}
    />
  </View>
); 