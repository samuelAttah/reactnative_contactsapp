import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Button, Alert} from 'react-native';
import Contacts from '../screens/Contacts';
import ContactDetails from '../screens/ContactDetails';
import Settings from '../screens/Settings';
import CreateContact from '../screens/CreateContact';

const HomeStack = createNativeStackNavigator();
const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="Contacts"
      screenOptions={{
        headerStyle: {backgroundColor: '#f4511e'},
        headerTintColor: 'white',
        headerTitleStyle: {fontWeight: 'bold'},
      }}>
      <HomeStack.Screen
        name="Contacts"
        component={Contacts}
        options={{
          title: 'My Home',
          headerRight: () => (
            <Button
              onPress={() => Alert.alert('This is a button!')}
              title="Info"
              color="blue"
            />
          ),
        }}
      />
      <HomeStack.Screen
        name="Details"
        component={ContactDetails}
        options={{
          title: 'Details',
        }}
      />
      <HomeStack.Screen name="Settings" component={Settings} />
      <HomeStack.Screen name="Create" component={CreateContact} />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
