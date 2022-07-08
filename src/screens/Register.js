import React, {useContext, useState} from 'react';
import SignupComponent from '../components/SignupComponent';
import {GlobalContext} from '../context/Provider';

const Register = ({navigation}) => {
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({});
  const [visibleToast, setvisibleToast] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(true);

  const {doSignup, clearAuthState, authState} = useContext(GlobalContext);

  const {loading, fetchError, data} = authState;

  const {userName, password, firstName, lastName, email} = form;

  const canSave = [userName, password, firstName, lastName, email].every(
    Boolean,
  );

  const onChange = ({name, value}) => {
    setForm({...form, [name]: value});

    if (value !== '') {
      if (name === 'password') {
        if (value.length < 6) {
          setErrors(prev => {
            return {...prev, [name]: 'This field needs min 6 characters'};
          });
        } else {
          setErrors(prev => {
            return {...prev, [name]: null};
          });
        }
      } else {
        setErrors(prev => {
          return {...prev, [name]: null};
        });
      }
    } else {
      setErrors(prev => {
        return {...prev, [name]: 'This field is required'};
      });
    }
  };

  const onSubmit = async () => {
    if (!form.userName) {
      setErrors(prev => {
        return {...prev, userName: 'Please add a username'};
      });
    }
    if (!form.firstName) {
      setErrors(prev => {
        return {...prev, firstName: 'Please add a  first name'};
      });
    }
    if (!form.lastName) {
      setErrors(prev => {
        return {...prev, lastName: 'Please add a last name'};
      });
    }
    if (!form.email) {
      setErrors(prev => {
        return {...prev, email: 'Please add a email'};
      });
    }
    if (!form.password) {
      setErrors(prev => {
        return {...prev, password: 'Please add a password'};
      });
    }

    if (
      Object.values(form).length === 5 &&
      Object.values(form).every(item => item.trim().length > 0) &&
      Object.values(errors).every(item => !item)
    ) {
      try {
        await doSignup(form);
        console.log('authState', authState);
        if (data !== null) {
          setvisibleToast(true);
          setForm({});

          navigation.navigate('Login', {data: data});
          return clearAuthState();
        }

        console.log('authState', authState);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const passwordVisibility = () => {
    setVisiblePassword(prev => !prev);
  };

  return (
    <SignupComponent
      canSave={canSave}
      navigation={navigation}
      errors={errors}
      onSubmit={onSubmit}
      form={form}
      onChange={onChange}
      loading={loading}
      fetchError={fetchError}
      visibleToast={visibleToast}
      visiblePassword={visiblePassword}
      passwordVisibility={passwordVisibility}
    />
  );
};

export default Register;
