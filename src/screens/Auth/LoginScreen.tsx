// src/screens/LoginScreen.tsx

import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { AuthLink } from '../../components/AuthLink';
import { useAuth } from '../../hooks/useAuth';

export const LoginScreen = () => {
  const { signIn, isLoadingUser, error } = useAuth();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    await signIn(email, password);
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-3xl font-bold mb-6">Login</Text>

        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {error && <Text className="text-red-500 mb-2">{error}</Text>}

        <Button title="Login" onPress={handleLogin} loading={isLoadingUser} />

        <AuthLink
          text="Don't have an account? Register"
          onPress={() => navigation.navigate('Register' as never)}
        />
      </View>
    </SafeAreaView>
  );
};
