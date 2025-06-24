import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Button, Alert, TextInput, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { account, databases, ID, Permission, Role } from '../../api/appwrite';
import { Ionicons } from '@expo/vector-icons';

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const CONTACTS_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_CONTACTS_COLLECTION_ID!;
const USERS_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID!;

export default function ContactsScreen() {
  const navigation = useNavigation();
  const [contacts, setContacts] = useState<any[]>([]);
  const [userId, setUserId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  useEffect(() => {
    account.get().then((user) => {
      setUserId(user.$id);
      loadContacts(user.$id);
    });
  }, []);

  const loadContacts = async (ownerId: string) => {
    const res = await databases.listDocuments(DATABASE_ID, CONTACTS_COLLECTION_ID, [
      `equal("ownerId", "${ownerId}")`
    ]);
    setContacts(res.documents);
  };

  const addContactByEmail = async () => {
    if (!emailInput) return Alert.alert('Email is required');
    try {
      const res = await databases.listDocuments(DATABASE_ID, USERS_COLLECTION_ID, [
        `equal("email", "${emailInput}")`
      ]);

      if (res.documents.length === 0) {
        Alert.alert('User does not exist in app');
        return;
      }

      const contactUser = res.documents[0];
      await databases.createDocument(
        DATABASE_ID,
        CONTACTS_COLLECTION_ID,
        ID.unique(),
        {
          ownerId: userId,
          contactId: contactUser.$id,
          name: contactUser.name || emailInput,
        },
        [
          Permission.read(Role.user(userId)),
          Permission.update(Role.user(userId)),
          Permission.delete(Role.user(userId))
        ]
      );

      loadContacts(userId);
      setShowModal(false);
      setEmailInput('');
    } catch (err) {
      console.error(err);
      Alert.alert('Failed to add contact');
    }
  };

  return (
    <View className="flex-1 bg-white p-4">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-2xl font-bold">Contacts</Text>
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <Ionicons name="add-circle" size={28} color="black" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={contacts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <View className="flex-row items-center justify-between p-4 border-b border-gray-300">
            <Text className="text-lg">{item.name}</Text>
            <View className="flex-row space-x-2">
              <Button title="Chat" onPress={() => navigation.navigate('ChatScreen', {
                receiverId: item.contactId,
                receiverName: item.name,
              })} />
              <Button title="Call" onPress={() => {}} />
              <Button title="Video" onPress={() => {}} />
            </View>
          </View>
        )}
      />

      <Modal visible={showModal} animationType="slide" transparent>
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white p-6 rounded-xl w-80">
            <Text className="text-lg font-semibold mb-4">Add Contact by Email</Text>
            <TextInput
              className="border p-2 rounded mb-4"
              placeholder="Enter registered user email"
              value={emailInput}
              onChangeText={setEmailInput}
              autoCapitalize="none"
            />
            <Button title="Add" onPress={addContactByEmail} />
            <View className="mt-2" />
            <Button title="Cancel" color="gray" onPress={() => setShowModal(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
