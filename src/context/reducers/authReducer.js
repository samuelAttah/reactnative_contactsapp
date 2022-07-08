import {
  CLEAR_AUTH_STATE,
  LOGIN_FAIL,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
} from '../../constants/actionTypes';

const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_LOADING:
    case REGISTER_LOADING:
      return {...state, loading: true};
    case LOGIN_SUCCESS:
      return {...state, loading: false, data: action.payLoad, isLoggedIn: true};
    case REGISTER_SUCCESS:
      return {...state, loading: false, data: action.payLoad};
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {...state, loading: false, fetchError: action.payLoad};
    case CLEAR_AUTH_STATE:
      return {
        ...state,
        loading: false,
        data: null,
        fetchError: null,
      };
    case LOGOUT:
      return {...state, loading: false, data: null, isLoggedIn: false};
    default:
      return state;
  }
};
export default authReducer;
