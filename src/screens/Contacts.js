// import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import React, {useContext, useEffect, useState, useRef} from 'react';
import ContactComponent from '../components/ContactComponent';
import {GlobalContext} from '../context/Provider';
// import {SafeAreaView} from 'react-native-safe-area-context';

const Contacts = ({navigation}) => {
  const {params} = useRoute();
  const effectRan = useRef(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [sortBy, setSortBy] = React.useState(null);

  const {
    fetchContacts,
    contactState: {data, loading},
  } = useContext(GlobalContext);

  useEffect(() => {
    fetchContacts();
  }, [params?.data]);

  const getSettings = async () => {
    const sortPref = await AsyncStorage.getItem('sortBy');
    if (sortPref) {
      setSortBy(sortPref);
    } else {
      setSortBy(null);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getSettings();

      return () => {};
    }, []),
  );

  return (
    <>
      <ContactComponent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        data={data}
        loading={loading}
        sortBy={sortBy}
      />
    </>
  );
};

export default Contacts;
