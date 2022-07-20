import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useState} from 'react';
import {useRef} from 'react';

import CreateContactComponent from '../components/CreateContactComponent';
import {GlobalContext} from '../context/Provider';
import uploadImage from '../helpers/uploadImage';

const CreateContact = ({navigation}) => {
  const [form, setForm] = useState({});
  const [localFile, setLocalFile] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [uploading, setIsUploading] = useState(false);
  const [username, setUsername] = useState(null);

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
  const openSheet = async () => {
    const user = await AsyncStorage.getItem('user');
    setUsername(JSON.parse(user).username);
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
    setForm(prev => {
      return {...prev, isFavorite: !form.isFavorite};
    });
  };

  const onSubmit = async () => {
    //do something
    try {
      if (localFile?.size) {
        setIsUploading(true);
        uploadImage(
          username,
          localFile,
        )(async url => {
          console.log('username', username);
          console.log('url', url);
          setIsUploading(false);
          await createContactAction({...form, contactPicture: url})(() => {
            setRedirect(true);
            setTimeout(() => navigation.navigate('Home', {data: data}), 3000);
          });
        })(error => {
          console.error(error);
          setIsUploading(false);
        });
      }
      await createContactAction(form)(() => {
        setRedirect(true);
        setTimeout(() => navigation.navigate('Home', {data: data}), 4000);
      });
      // console.log('data', data);
      // if (data) {
      //   setRedirect(true);
      //   setTimeout(() => navigation.navigate('Home', {data: data}), 3000);
      // }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <CreateContactComponent
      onChangeText={onChangeText}
      form={form}
      canSave={canSave}
      onSubmit={onSubmit}
      setForm={setForm}
      loading={loading || uploading}
      fetchError={fetchError}
      toggleValueChange={toggleValueChange}
      navigation={navigation}
      sheetRef={sheetRef}
      closeSheet={closeSheet}
      openSheet={openSheet}
      onSelectImage={onSelectImage}
      localFile={localFile}
      redirect={redirect}
    />
  );
};

export default CreateContact;
