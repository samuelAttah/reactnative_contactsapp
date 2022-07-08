import React, {useContext} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SettingsIcon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Alert, Image, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {GlobalContext} from '../../context/Provider';

const LogoComponent = () => {
  return (
    <View>
      <Image
        height={70}
        width={70}
        source={require('../../assets/images/logo.png')}
        style={styles.logoImage}
      />
    </View>
  );
};

const SideMenu = props => {
  const navigation = useNavigation();
  const {doLogout} = useContext(GlobalContext);
  const handleLogout = () => {
    props.navigation.toggleDrawer();
    Alert.alert('LOGOUT', 'Are You Sure You Want To Logout?', [
      {
        text: 'Cancel',
        onPress: () => {},
      },

      {
        text: 'OK',
        onPress: () => {
          doLogout();
        },
      },
    ]);
  };

  return (
    <DrawerContentScrollView {...props}>
      <LogoComponent />
      <DrawerItemList {...props} />
      <DrawerItem
        label="Settings"
        icon={({size, color, focused}) => (
          <SettingsIcon
            name="settings"
            size={size}
            color={focused ? 'black' : 'black'}
          />
        )}
        onPress={() => navigation.navigate('Settings')}
      />
      <DrawerItem
        label="LogOut"
        icon={({size, color, focused}) => (
          <Icon name="logout" size={size} color={focused ? 'black' : 'red'} />
        )}
        onPress={handleLogout}
      />
    </DrawerContentScrollView>
  );
};

export default SideMenu;
