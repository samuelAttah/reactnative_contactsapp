// import {useFocusEffect} from '@react-navigation/native';
import React, {useContext, useEffect, useState, useRef} from 'react';
import ContactComponent from '../components/ContactComponent';
import {GlobalContext} from '../context/Provider';
// import {SafeAreaView} from 'react-native-safe-area-context';

const Contacts = ({navigation}) => {
  const effectRan = useRef(false);
  const [modalVisible, setModalVisible] = useState(false);
  const {
    fetchContacts,
    contactState: {data, loading},
  } = useContext(GlobalContext);

  useEffect(() => {
    if (effectRan.current === false) {
      fetchContacts();

      return () => {
        effectRan.current = true;
      };
    }
  }, [fetchContacts]);

  return (
    <>
      <ContactComponent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        data={data}
        loading={loading}
      />
    </>
  );
};

export default Contacts;
