import {
  View,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
  Switch,
  Image,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import Container from '../common/Container';
import Input from '../common/Input';
// import {useNavigation} from '@react-navigation/native';
import CountryPicker from 'react-native-country-picker-modal';
import Icon from 'react-native-vector-icons/Entypo';
import colors from '../../assets/theme/colors';
import ImagePicker from '../common/ImagePicker';

const EditContactComponent = ({
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
  redirect,
  isLoading,
}) => {
  // const navigation = useNavigation();
  console.log('localFile', localFile);
  return (
    <View style={styles.container}>
      {isLoading && <ActivityIndicator size="large" color={colors.primary} />}
      <Container>
        {localFile ? (
          <Image
            width={150}
            height={150}
            source={{uri: localFile?.path || localFile}} //added or to the localFile for when we will be editing the page
            style={styles.imageView}
          />
        ) : (
          <View style={styles.avatar}>
            <Icon name="user" size={100} />
          </View>
        )}

        <TouchableOpacity onPress={openSheet}>
          <Text style={styles.chooseText}>Choose Image</Text>
        </TouchableOpacity>

        <Input
          label="First Name"
          placeholder="Enter First Name"
          value={form.firstName || ''}
          onChangeText={value => {
            onChangeText({name: 'firstName', value});
          }}
          error={fetchError?.first_name?.[0]}
        />
        <Input
          label="Last Name"
          placeholder="Enter Last Name"
          value={form.lastName || ''}
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
          value={form.phoneNumber || ''}
          onChangeText={value => {
            onChangeText({name: 'phoneNumber', value});
          }}
          icon={
            <CountryPicker
              countryCode={form.countryCode}
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
          title={
            loading ? 'Submitting...' : redirect ? 'Please Wait...' : 'Submit'
          }
          onPress={onSubmit}
          disabled={!canSave || redirect || loading}
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
    borderRadius: 100,
    alignItems: 'center',
    width: 150,
    height: 150,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  chooseText: {
    textAlign: 'center',
    color: colors.accent,
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 15,
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
    width: 150,
    height: 150,
    borderRadius: 100,
    alignSelf: 'center',
  },
});

export default EditContactComponent;
