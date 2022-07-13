import React, {useContext, useState} from 'react';
import {useRef} from 'react';

import CreateContactComponent from '../components/CreateContactComponent';
import {GlobalContext} from '../context/Provider';

const CreateContact = ({navigation}) => {
  const [form, setForm] = useState({});
  const [localFile, setLocalFile] = useState(null);

  const {firstName, lastName, phoneNumber} = form;
  const {
    createContactAction,
    contactState: {data, loading, fetchError},
  } = useContext(GlobalContext);

  const canSave = [firstName, lastName, phoneNumber].every(Boolean);

  const sheetRef = useRef(null);
  // openSheet,
  const closeSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.close();
    }
  };
  const openSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.open();
    }
  };
  const onSelectImage = image => {
    closeSheet(image);
    setLocalFile(image);
  };

  const onChangeText = ({name, value}) => {
    setForm({...form, [name]: value});
  };

  const toggleValueChange = () => {
    setForm({...form, isFavorite: !form.isFavorite});
  };

  const onSubmit = async () => {
    //do something
    try {
      await createContactAction(form);
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
      navigation={navigation}
      sheetRef={sheetRef}
      closeSheet={closeSheet}
      openSheet={openSheet}
      onSelectImage={onSelectImage}
      localFile={localFile}
    />
  );
};

export default CreateContact;
