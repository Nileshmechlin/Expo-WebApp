import React, { useState } from 'react';
import { Modal, View, TextInput, Button, Text, Alert } from 'react-native';

export const AddContactModal = ({ visible, onClose, onSave }: any) => {
  const [email, setEmail] = useState('');

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className="bg-white p-6 rounded-xl w-80">
          <Text className="text-lg font-semibold mb-4">Add New Contact by Email</Text>
          <TextInput
            className="border p-2 rounded mb-4"
            placeholder="Enter user's email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <Button title="Save Contact" onPress={() => {
            if (!email) return Alert.alert('Please enter an email.');
            onSave(email);
            setEmail('');
            onClose();
          }} />
          <Button title="Cancel" color="gray" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};