import React from 'react';
import { View, Text } from 'react-native';

export const ChatBubble = ({ text, isMine }: { text: string; isMine: boolean }) => {
  return (
    <View className={`px-4 py-2 my-1 rounded-lg ${isMine ? 'bg-blue-500 self-end' : 'bg-gray-300 self-start'}`}>
      <Text className={`${isMine ? 'text-white' : 'text-black'}`}>{text}</Text>
    </View>
  );
};