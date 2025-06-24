import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/useAuth';

export const RegisterScreen = () => {
  const { signUp, isLoadingUser, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    await signUp(email, password);
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-3xl font-bold mb-6">Register</Text>

      <TextInput
        className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 text-base"
        placeholder="Email"
        placeholderTextColor="#999"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 text-base"
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {error && <Text className="text-red-500 mb-2">{error}</Text>}

      <TouchableOpacity
        onPress={handleRegister}
        className="bg-black w-full rounded-xl py-3 items-center"
        disabled={isLoadingUser}
      >
        {isLoadingUser ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white text-lg font-medium">Register</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Login' as never)}
        className="mt-4"
      >
        <Text className="text-blue-500 underline">Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};
