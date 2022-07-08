import React, {createContext, useReducer} from 'react';
import authReducer from './reducers/authReducer';
import authInitialState from './initialState/authState';
import contactReducer from './reducers/contactReducer';
import * as contactInitialState from './initialState/contactState';
import {
  CLEAR_AUTH_STATE,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from '../constants/actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../helpers/axiosInstance';

export const GlobalContext = createContext();

const GlobalProvider = ({children}) => {
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);
  const [contactState, contactDispatch] = useReducer(
    contactReducer,
    contactInitialState,
  );
  //AUTH RELATED ACTIONS
  //CLEARING AUTH STATE
  const clearAuthState = () => {
    authDispatch({
      type: CLEAR_AUTH_STATE,
    });
  };

  //SIGNUP ACTIONS
  const doSignup = async ({
    userName: username,
    firstName: first_name,
    lastName: last_name,
    email,
    password,
  }) => {
    authDispatch({
      type: REGISTER_LOADING,
    });
    try {
      const response = await axiosInstance.post('auth/register', {
        username,
        first_name,
        last_name,
        email,
        password,
      });
      authDispatch({type: REGISTER_SUCCESS, payLoad: response.data});
    } catch (error) {
      authDispatch({
        type: REGISTER_FAIL,
        payLoad: error.response ? error.response.data : error.message,
      });
    }
  };

  //LOGIN ACTIONS
  const doLogin = async ({username, password}) => {
    authDispatch({
      type: LOGIN_LOADING,
    });
    try {
      const response = await axiosInstance.post('auth/login', {
        username,
        password,
      });
      authDispatch({type: LOGIN_SUCCESS, payLoad: response.data});
      AsyncStorage.setItem('token', response.data.token);
      AsyncStorage.setItem('user', JSON.stringify(response.data.user));
    } catch (error) {
      authDispatch({
        type: LOGIN_FAIL,
        payLoad: error.response ? error.response : error.message,
      });
    }
  };

  //LOGOUT ACTIONS
  const doLogout = () => {
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('user');
    authDispatch({type: LOGOUT});
  };

  return (
    <GlobalContext.Provider
      value={{
        authState,
        clearAuthState,
        doSignup,
        contactState,
        contactDispatch,
        doLogin,
        doLogout,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
