import {View, Button} from 'react-native';
import React from 'react';
import AppModal from '../common/AppModal';

const ContactComponent = ({modalVisible, setModalVisible}) => {
  return (
    <View>
      <AppModal setModalVisible={setModalVisible} modalVisible={modalVisible} />
      <Button
        title="Open Modal"
        onPress={() => {
          setModalVisible(true);
        }}
      />
    </View>
  );
};

export default ContactComponent;
