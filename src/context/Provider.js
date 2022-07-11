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
  GET_CONTACTS_LOADING,
  GET_CONTACTS_SUCCESS,
  GET_CONTACTS_FAIL,
  CREATE_CONTACTS_LOADING,
  CREATE_CONTACTS_SUCCESS,
  CREATE_CONTACTS_FAIL,
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

  //CONTACT ACTIONS
  //FETCH CONTACTS ACTIONS
  const fetchContacts = async () => {
    contactDispatch({type: GET_CONTACTS_LOADING});
    try {
      const response = await axiosInstance.get('contacts/');
      contactDispatch({type: GET_CONTACTS_SUCCESS, payLoad: response.data});
    } catch (error) {
      contactDispatch({
        type: GET_CONTACTS_FAIL,
        payLoad: error.response ? error.response?.data : error.message,
      });
    }
  };

  //CREATE CONTACTS ACTIONS
  const createContactAction = form => {
    const requestPayLoad = {
      country_code: form.phoneCode || '',
      first_name: form.firstName || '',
      last_name: form.lastName || '',
      phone_number: form.phoneNumber || '',
      contact_picture: form.contactPicture || null,
      is_favorite: form.isFavorite || false,
    };
    contactDispatch({type: CREATE_CONTACTS_LOADING});
    try {
      const response = axiosInstance.post('/contacts/', requestPayLoad);
      contactDispatch({type: CREATE_CONTACTS_SUCCESS, payLoad: response.data});
    } catch (error) {
      contactDispatch({
        type: CREATE_CONTACTS_FAIL,
        payLoad: error.response ? error.response.data : error.message,
      });
    }
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
        fetchContacts,
        createContactAction,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
