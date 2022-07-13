import {
  View,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
  Switch,
  Image,
} from 'react-native';
import React from 'react';
import Container from '../common/Container';
import Input from '../common/Input';
// import {useNavigation} from '@react-navigation/native';
import CountryPicker from 'react-native-country-picker-modal';
import Icon from 'react-native-vector-icons/Entypo';
import colors from '../../assets/theme/colors';
import ImagePicker from '../common/ImagePicker';

const CreateContactComponent = ({
  onChangeText,
  form,
  onSubmit,
  canSave,
  setForm,
  loading,
  fetchError,
  toggleValueChange,
  sheetRef,
  openSheet,
  closeSheet,
  onSelectImage,
  localFile,
}) => {
  // const navigation = useNavigation();
  console.log('localFile', localFile);
  return (
    <View style={styles.container}>
      {localFile?.path ? (
        <Image width={120} height={120} source={{uri: localFile?.path}} />
      ) : (
        <View style={styles.avatar}>
          <Icon name="user" size={80} />
        </View>
      )}

      <TouchableOpacity onPress={openSheet}>
        <Text style={styles.chooseText}>Choose Image</Text>
      </TouchableOpacity>

      <Container>
        <Input
          label="First Name"
          placeholder="Enter First Name"
          onChangeText={value => {
            onChangeText({name: 'firstName', value});
          }}
          error={fetchError?.first_name?.[0]}
        />
        <Input
          label="Last Name"
          placeholder="Enter Last Name"
          onChangeText={value => {
            onChangeText({name: 'lastName', value});
          }}
          error={fetchError?.last_name?.[0]}
        />
        <Input
          label="Phone Number"
          placeholder="Enter Phone Number"
          iconPosition="left"
          style={styles.phoneInput}
          onChangeText={value => {
            onChangeText({name: 'phoneNumber', value});
          }}
          icon={
            <CountryPicker
              countryCode={form.countryCode || undefined}
              withFilter
              withFlag
              withCountryNameButton={false}
              withCallingCodeButton
              withCallingCode
              withEmoji
              onSelect={value => {
                const phoneCode = value.callingCode[0];
                const countryCode = value.cca2;
                setForm({...form, phoneCode, countryCode});
              }}
            />
          }
          error={fetchError?.phone_number?.[0]}
        />
        <View style={styles.viewFavorite}>
          <Text style={styles.textFavorite}>Add to favorites</Text>

          <Switch
            trackColor={{false: colors.grey, true: colors.primary}}
            thumbColor="#FFFFFF"
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleValueChange}
            value={form.isFavorite}
          />
        </View>
        <Button
          title={loading ? 'Submitting...' : 'Submit'}
          onPress={onSubmit}
          disabled={!canSave || loading}
        />
        {/* <Button title="To Contacts List" onPress={() => navigation.goBack()} /> */}
      </Container>
      <ImagePicker onSelectImage={onSelectImage} ref={sheetRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  avatar: {
    backgroundColor: colors.grey,
    paddingVertical: 10,
    borderRadius: 100,
    alignItems: 'center',
    width: 120,
    height: 120,
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  chooseText: {
    textAlign: 'center',
    color: colors.accent,
    fontWeight: 'bold',
  },
  phoneInput: {
    paddingLeft: 10,
  },
  viewFavorite: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  textFavorite: {
    fontSize: 17,
  },
  imageView: {
    width: 120,
    height: 120,
    borderRadius: 100,
    alignSelf: 'center',
  },
});

export default CreateContactComponent;
