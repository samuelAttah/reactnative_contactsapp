import React from 'react';
import {View, Text, SafeAreaView, Button} from 'react-native';

const ContactDetails = ({navigation}) => {
  return (
    <SafeAreaView>
      <View>
        <Text>This is the Details Page</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    </SafeAreaView>
  );
};
export default ContactDetails;
