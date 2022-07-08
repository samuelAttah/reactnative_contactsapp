import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LOGIN_FAIL,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  CLEAR_AUTH_STATE,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInstance';

export const clearAuthState = () => dispatch => {
  dispatch({
    type: CLEAR_AUTH_STATE,
  });
};

const doLogin =
  ({username, password}) =>
  dispatch => {
    dispatch({
      type: LOGIN_LOADING,
    });
    axiosInstance
      .post('auth/login', {
        username,
        password,
      })
      .then(response => {
        AsyncStorage.setItem('token', response.data.token);
        AsyncStorage.setItem('user', JSON.stringify(response.data.user));
        dispatch({
          type: LOGIN_SUCCESS,
          payLoad: response.data,
        });
      })
      .catch(error => {
        dispatch({
          type: LOGIN_FAIL,
          payLoad: error.response
            ? error.response.data
            : {error: 'Something went wrong'},
        });
      });
  };

export default doLogin;
