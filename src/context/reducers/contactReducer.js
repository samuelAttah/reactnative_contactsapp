import {
  GET_CONTACTS_FAIL,
  GET_CONTACTS_LOADING,
  GET_CONTACTS_SUCCESS,
} from '../../constants/actionTypes';

const contactReducer = (state, action) => {
  switch (action.type) {
    case GET_CONTACTS_LOADING:
      return {...state, loading: true};
    case GET_CONTACTS_SUCCESS:
      return {...state, loading: false, data: action.payLoad};
    case GET_CONTACTS_FAIL:
      return {...state, loading: false, data: null, fetchError: action.payLoad};
    default:
      return state;
  }
};
export default contactReducer;
