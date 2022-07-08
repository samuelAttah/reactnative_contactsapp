import {
  REGISTER_FAIL,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  CLEAR_AUTH_STATE,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInstance';

export const clearAuthState = () => dispatch => {
  dispatch({
    type: CLEAR_AUTH_STATE,
  });
};

const doSignup =
  ({
    userName: username,
    firstName: first_name,
    lastName: last_name,
    email,
    password,
  }) =>
  dispatch => {
    dispatch({
      type: REGISTER_LOADING,
    });
    axiosInstance
      .post('auth/register', {
        username,
        first_name,
        last_name,
        email,
        password,
      })
      .then(response => {
        dispatch({
          type: REGISTER_SUCCESS,
          payLoad: response.data,
        });
      })
      .catch(error => {
        dispatch({
          type: REGISTER_FAIL,
          payLoad: error.response
            ? error.response.data
            : {error: 'Something went wrong'},
        });
      });
  };

export default doSignup;
