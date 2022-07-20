import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useContext, useEffect} from 'react';
import {TouchableOpacity, View, Alert, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../assets/theme/colors';
import ContactDetailsComponent from '../components/ContactDetailsComponent';
import {GlobalContext} from '../context/Provider';

const ContactDetails = ({navigation}) => {
  const {params} = useRoute();
  const [loading, setLoading] = React.useState(false);

  const {setOptions} = useNavigation();
  const {deleteContact} = useContext(GlobalContext);

  useEffect(() => {
    setOptions({
      title: params?.item.first_name + ' ' + params?.item.last_name,
      headerShown: true,
      headerStyle: {backgroundColor: colors.accent},
      headerRight: () => {
        return (
          <View style={{flexDirection: 'row', paddingRight: 10}}>
            <TouchableOpacity>
              <Icon
                name={params?.item.is_favorite ? 'star' : 'star-border'}
                size={21}
                color={params?.item.is_favorite ? colors.white : colors.grey}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{paddingLeft: 10}}
              onPress={() => {
                Alert.alert(
                  'DELETE CONTACT',
                  'Are You Sure You Want To Delete This Contact?',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => {},
                    },

                    {
                      text: 'OK',
                      onPress: () => {
                        deleteContact(params?.item.id)(() =>
                          navigation.navigate('Home'),
                        );
                      },
                    },
                  ],
                );
              }}>
              {loading ? (
                <ActivityIndicator color={colors.white} size="small" />
              ) : (
                <Icon name="delete" size={21} color={colors.white} />
              )}
            </TouchableOpacity>
          </View>
        );
      },
    });
    setLoading(false);
  }, [params?.item]);

  return <ContactDetailsComponent contact={params?.item} loading={loading} />;
};
export default ContactDetails;
