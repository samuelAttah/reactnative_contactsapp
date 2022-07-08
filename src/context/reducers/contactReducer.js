const contactReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CONTACTS':
      return {...state};
    default:
      return state;
  }
};
export default contactReducer;
