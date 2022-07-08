import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from '../screens/Register';
import Login from '../screens/Login';

const AuthStack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
    </AuthStack.Navigator>
  );
};
export default AuthNavigator;
