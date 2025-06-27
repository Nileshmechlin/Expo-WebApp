// src/navigation/AppNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContactsScreen from '@/screens/Contacts/ContactsScreen';
import Layout from '@/components/Layout';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Contact">
        {() => (
          <Layout>
            <ContactsScreen />
          </Layout>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
