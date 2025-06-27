// src/components/Header.tsx
import React from 'react';
import { View, Text, Alert } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { Button } from './Button';

const Header = () => {
  const { user, signOut, isLoadingUser } = useAuth();

  const handleSignOut = async () => {
    try {
      console.log('🔄 Starting sign out...');
      await signOut();
      console.log('✅ Sign out completed');
    } catch (error) {
      console.error('❌ Sign out error:', error);
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    }
  };

  return (
    <View className="bg-blue-600 px-4 py-3 flex-row justify-between items-center">
      <Text className="text-white text-xl font-bold">MyApp</Text>

      {user ? (
        <Button
          title="Sign Out"
          onPress={handleSignOut}
          disabled={isLoadingUser}
          loading={isLoadingUser}
          style={{ 
            backgroundColor: '#FF6B35',
            paddingVertical: 8,
            paddingHorizontal: 12,
            width: 'auto',
            borderRadius: 8
          }}
        />
      ) : (
        <View className="flex-row space-x-4">
          <Text className="text-white text-sm">Not signed in</Text>
        </View>
      )}
    </View>
  );
};

export default Header;
