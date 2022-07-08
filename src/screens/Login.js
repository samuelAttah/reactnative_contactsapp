import {useRoute} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import LoginComponent from '../components/LoginComponent';
import {GlobalContext} from '../context/Provider';

const Login = ({navigation}) => {
  const [username, onChangeUsername] = useState(null);
  const [password, onChangePassword] = useState(null);
  const [justSignedUp, setJustSignedUp] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(true);

  const {params} = useRoute();

  const canSave = [username, password].every(Boolean);

  React.useEffect(() => {
    if (params?.data) {
      setJustSignedUp(true);
      onChangeUsername(params?.data.username);
    }
  }, [params?.data]);

  const {
    doLogin,
    authState: {fetchError, loading, data, isLoggedIn},
  } = useContext(GlobalContext);

  const onSubmit = async () => {
    if (username && password) {
      try {
        const credentials = {username, password};
        console.log('username', username);
        console.log('data', data);
        await doLogin(credentials);
        console.log('data', data);
        console.log('isLoggedIn', isLoggedIn);
        console.log('fetchError', fetchError);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const passwordVisibility = () => {
    setVisiblePassword(prev => !prev);
  };

  return (
    <LoginComponent
      username={username}
      onChangeUsername={onChangeUsername}
      password={password}
      onChangePassword={onChangePassword}
      canSave={canSave}
      navigation={navigation}
      onSubmit={onSubmit}
      fetchError={fetchError}
      loading={loading}
      justSignedUp={justSignedUp}
      passwordVisibility={passwordVisibility}
      visiblePassword={visiblePassword}
    />
  );
};

export default Login;
