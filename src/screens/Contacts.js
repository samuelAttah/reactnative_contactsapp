import React from 'react';
import Container from '../components/common/Container';
import {Text, Button} from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';

const Contacts = ({navigation}) => {
  return (
    <Container>
      <Text>Contacts</Text>
      <Button
        title="To Details Page"
        onPress={() => navigation.navigate('Details')}
      />
    </Container>
  );
};

export default Contacts;
