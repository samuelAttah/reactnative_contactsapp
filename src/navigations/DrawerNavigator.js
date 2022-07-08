import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeNavigator from './HomeNavigator';
import SideMenu from './SideMenu';
import Icon from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={props => <SideMenu {...props} />}>
      <Drawer.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          drawerIcon: ({size, focused}) => (
            <Icon name="home" size={size} color={focused ? 'black' : '#ccc'} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
