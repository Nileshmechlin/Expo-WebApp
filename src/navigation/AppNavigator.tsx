import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContactsScreen from '@/screens/Contacts/ContactsScreen';


const Stack = createNativeStackNavigator();

export const AppNavigator = ()  =>{
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name ="chat" component={ContactsScreen}/>
        </Stack.Navigator>
    )
}