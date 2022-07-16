import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Contacts from '../screens/Contacts';
import ContactDetails from '../screens/ContactDetails';
import Settings from '../screens/Settings';
import CreateContact from '../screens/CreateContact';
import Logout from '../screens/Logout';

const HomeStack = createNativeStackNavigator();
const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {backgroundColor: '#f4511e'},
        headerTintColor: 'white',
        headerTitleStyle: {fontWeight: 'bold'},
        headerShown: false,
      }}>
      <HomeStack.Screen
        name="Home"
        component={Contacts}
        // options={{
        //   title: 'My Home',
        //   headerRight: () => (
        //     <Button
        //       onPress={() => Alert.alert('This is a button!')}
        //       title="Info"
        //       color="blue"
        //     />
        //   ),
        // }}
      />
      <HomeStack.Screen
        name="Details"
        component={ContactDetails}
        options={{
          title: 'Details',
        }}
      />
      <HomeStack.Screen
        name="Settings"
        component={Settings}
        options={{headerShown: true}}
      />
      <HomeStack.Screen name="Create" component={CreateContact} />
      <HomeStack.Screen name="Logout" component={Logout} />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
