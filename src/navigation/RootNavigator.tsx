import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthNavigator } from './AuthNavigator';
import { AppNavigator } from './AppNavigator';
import { useAuth } from '../hooks/useAuth';
import { View, ActivityIndicator } from 'react-native';

export const RootNavigator = () => {
  const { user, isLoadingUser, fetchUser } = useAuth();

  useEffect(() => {
    fetchUser();
  }, []);

  if (isLoadingUser) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
