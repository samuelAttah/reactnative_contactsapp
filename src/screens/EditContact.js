import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {useRef} from 'react';

import EditContactComponent from '../components/EditContactComponent';
import {GlobalContext} from '../context/Provider';
import uploadImage from '../helpers/uploadImage';
import countryCodes from '../utils/countryCodes';

const EditContact = ({navigation}) => {
  const {params} = useRoute();

  const [form, setForm] = useState({});
  const [localFile, setLocalFile] = useState(params?.contact?.contact_picture);
  const [redirect, setRedirect] = useState(false);
  const [uploading, setIsUploading] = useState(false);
  const [username, setUsername] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const {firstName, lastName, phoneNumber, isFavorite, countryCode} = form;
  const {
    editContactAction,
    contactState: {data, loading, fetchError},
  } = useContext(GlobalContext);

  const canSave = [firstName, lastName, phoneNumber].every(Boolean);

  //useEffect to load contact in if we are editing contact
  useEffect(() => {
    if (params?.contact) {
      const {first_name, last_name, phone_number, is_favorite, country_code} =
        params?.contact;

      setForm(prev => {
        return {
          ...prev,
          firstName: first_name,
          lastName: last_name,
          phoneNumber: phone_number,
          isFavorite: is_favorite,
        };
      });
      const country = countryCodes.find(item => {
        return item.value.replace('+', '') === country_code;
      });
      if (country) {
        setForm(prev => {
          return {
            ...prev,
            phoneCode: country.value.replace('+', ''),
            countryCode: country.key.toUpperCase(),
          };
        });
      }
      if (params?.contact?.contact_picture) {
        setLocalFile(params?.contact?.contact_picture);
      }
      setIsLoading(false);
      console.log('form', form);
    }

    setIsLoading(false);
  }, []);

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
      if (localFile) {
        if (localFile.size) {
          setIsUploading(true);
          uploadImage(
            username,
            localFile,
          )(async url => {
            console.log('username', username);
            console.log('url', url);
            setIsUploading(false);
            await editContactAction(
              {...form, contactPicture: url},
              params?.contact?.id,
            )(() => {
              setRedirect(true);
              setTimeout(() => navigation.navigate('Home', {data}), 3000);
            });
          })(error => {
            console.error(error);
            setIsUploading(false);
          });
        } else {
          await editContactAction(
            {...form, contactPicture: localFile},
            params?.contact?.id,
          )(() => {
            setRedirect(true);
            setTimeout(() => navigation.navigate('Home', {data}), 3000);
          });
        }
      }
      await editContactAction(
        form,
        params?.contact?.id,
      )(() => {
        setRedirect(true);
        setTimeout(() => navigation.navigate('Home', {data}), 4000);
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <EditContactComponent
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
      isLoading={isLoading}
    />
  );
};

export default EditContact;
