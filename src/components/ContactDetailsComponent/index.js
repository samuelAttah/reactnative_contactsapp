import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Button,
  ActivityIndicator,
} from 'react-native';
import colors from '../../assets/theme/colors';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import ImageComponent from './ImageComponent';
import Avataricon from 'react-native-vector-icons/Entypo';
import ImagePicker from '../common/ImagePicker';

const ContactDetailsComponent = ({
  contact,
  openSheet,
  sheetRef,
  onFileSelected,
  localFile,
  loading,
}) => {
  const navigation = useNavigation();

  const {contact_picture, first_name, country_code, phone_number, last_name} =
    contact;

  return (
    <ScrollView style={styles.scrollView}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={styles.container}>
          {contact_picture && (
            <ImageComponent src={contact_picture || localFile?.path} />
          )}

          {!contact_picture && (
            <View
              style={{
                alignItems: 'center',
                paddingVertical: 20,
                height: 300,
                width: '100%',
              }}>
              <View
                style={{
                  backgroundColor: colors.grey,
                  height: 250,
                  width: '60%',
                  borderRadius: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Avataricon name="user" size={180} />
              </View>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                No Image to display
              </Text>
            </View>
          )}
          <View style={styles.content}>
            <Text style={styles.names}>{`${first_name} ${last_name}`}</Text>
          </View>

          <View style={styles.hrLine} />

          <View style={styles.topCallOptions}>
            <TouchableOpacity style={styles.topCallOption}>
              <IonIcon name="call-outline" color={colors.primary} size={27} />
              <Text style={styles.middleText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.topCallOption}>
              <MaterialIcon
                name="message-text"
                color={colors.primary}
                size={27}
              />
              <Text style={styles.middleText}>Text</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.topCallOption}>
              <MaterialIcon name="video" color={colors.primary} size={27} />
              <Text style={styles.middleText}>Video</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.middleCallOptions}>
            <IonIcon name="call-outline" color={colors.grey} size={27} />
            <View style={styles.phoneMobile}>
              <Text>{phone_number}</Text>
              <Text>Mobile</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialIcon name="video" color={colors.primary} size={27} />
              <MaterialIcon
                name="message-text"
                color={colors.primary}
                size={27}
                style={[styles.msgIcon]}
              />
            </View>
          </View>
          <View
            style={{
              alignSelf: 'flex-end',
              marginRight: 10,
              width: 200,
              backgroundColor: colors.accent,
              borderRadius: 20,
              marginBottom: 10,
            }}>
            <Button
              title="Edit Contact"
              onPress={() => {
                navigation.navigate('Edit', {contact, editing: true});
              }}
            />
          </View>
        </View>
      )}

      <ImagePicker onFileSelected={onFileSelected} ref={sheetRef} />
    </ScrollView>
  );
};

export default ContactDetailsComponent;
