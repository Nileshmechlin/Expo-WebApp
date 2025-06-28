import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './navigation/RootNavigator';
import '../global.css';
import { debugConfig } from './utils/debug';

// Debug configuration on app startup
debugConfig();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#2563eb"
        translucent={false}
      />
      <RootNavigator />
    </SafeAreaProvider>
  );
}
