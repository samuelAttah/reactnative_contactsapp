import React, {useContext, useState} from 'react';

import CreateContactComponent from '../components/CreateContactComponent';
import {GlobalContext} from '../context/Provider';

const CreateContact = ({navigation}) => {
  const [form, setForm] = useState({});

  const {firstName, lastName, phoneNumber} = form;
  const {
    createContactAction,
    contactState: {data, loading, fetchError},
  } = useContext(GlobalContext);

  const canSave = [firstName, lastName, phoneNumber].every(Boolean);

  const onChangeText = ({name, value}) => {
    setForm({...form, [name]: value});
  };

  const toggleValueChange = () => {
    setForm({...form, isFavorite: !form.isFavorite});
  };

  const onSubmit = () => {
    //do something
    try {
      createContactAction(form);
      console.log('data', data);
      if (data) {
        navigation.navigate('Home', {data: data});
      }
    } catch (error) {}
  };

  return (
    <CreateContactComponent
      onChangeText={onChangeText}
      form={form}
      canSave={canSave}
      onSubmit={onSubmit}
      setForm={setForm}
      loading={loading}
      fetchError={fetchError}
      toggleValueChange={toggleValueChange}
    />
  );
};

export default CreateContact;
