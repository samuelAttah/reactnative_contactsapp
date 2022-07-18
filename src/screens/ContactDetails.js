import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../assets/theme/colors';
import ContactDetailsComponent from '../components/ContactDetailsComponent';

const ContactDetails = ({navigation}) => {
  const {
    params: {item},
  } = useRoute();

  const {setOptions} = useNavigation();

  useEffect(() => {
    if (item) {
      setOptions({
        title: item.first_name + ' ' + item.last_name,
        headerRight: () => {
          return (
            <View style={{flexDirection: 'row', paddingRight: 10}}>
              <TouchableOpacity>
                <Icon
                  name={item.is_favorite ? 'star' : 'star-border'}
                  size={21}
                  color={colors.grey}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{paddingLeft: 10}}>
                <Icon name="delete" size={21} color={colors.grey} />
              </TouchableOpacity>
            </View>
          );
        },
      });
    }
  }, [item]);

  return <ContactDetailsComponent contact={item} />;
};
export default ContactDetails;
