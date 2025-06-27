import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthNavigator } from './AuthNavigator';
import { AppNavigator } from './AppNavigator';
import { useAuth } from '../hooks/useAuth';
import { View, ActivityIndicator } from 'react-native';

export const RootNavigator = () => {
  const { user, isLoadingUser, fetchUser } = useAuth();

  useEffect(() => {
    console.log('🔄 RootNavigator: Fetching user on mount');
    fetchUser();
  }, []);

  useEffect(() => {
    console.log('👤 RootNavigator: User state changed:', user ? 'User logged in' : 'No user');
  }, [user]);

  if (isLoadingUser) {
    console.log('⏳ RootNavigator: Showing loading screen');
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  console.log('🎯 RootNavigator: Rendering navigator, user:', !!user);
  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
