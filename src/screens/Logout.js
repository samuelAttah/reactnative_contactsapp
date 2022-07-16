import {ActivityIndicator} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {GlobalContext} from '../context/Provider';

const Logout = () => {
  const {doLogout} = useContext(GlobalContext);

  useEffect(() => {
    doLogout();
  }, []);

  return <ActivityIndicator />;
};

export default Logout;
