import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import React from 'react';
import colors from '../../assets/theme/colors';
import Icon from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';

const ListEmptyComponent = () => (
  <View style={styles.emptyComponent}>
    <Text>No Contacts to Display</Text>
  </View>
);

const ContactComponent = ({data, loading, fetchError, sortBy}) => {
  const navigation = useNavigation();

  const renderItem = ({item}) => {
    console.log('first', item);
    const {first_name, last_name, phone_number, country_code} = item;
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          navigation.navigate('Details', {item});
        }}>
        <View style={styles.item}>
          {item?.contact_picture ? (
            <Image
              style={styles.profileImage}
              source={{uri: item?.contact_picture}}
            />
          ) : (
            <View style={styles.noImage}>
              <Icon name="user" size={32} />
            </View>
          )}

          <View style={{paddingLeft: 20}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.name}>{first_name}</Text>
              <Text style={styles.name}>{last_name}</Text>
            </View>
            <Text
              style={
                styles.phoneNumber
              }>{`${country_code} ${phone_number}`}</Text>
          </View>
        </View>
        <Icon name="chevron-right" size={18} color={colors.grey} />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={{backgroundColor: colors.white}}>
        {loading && (
          <View style={styles.emptyComponent}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        )}
        {!loading && (
          <View style={[{paddingVertical: 20}]}>
            <FlatList
              data={
                data
                  ? data.sort((a, b) => {
                      if (sortBy === 'First Name') {
                        if (b.first_name > a.first_name) {
                          return -1;
                        } else {
                          return 1;
                        }
                      }
                      if (sortBy === 'Last Name') {
                        if (b.last_name > a.last_name) {
                          return -1;
                        } else {
                          return 1;
                        }
                      }
                      if (sortBy === null) {
                        return data;
                      }
                    })
                  : null
              }
              ListEmptyComponent={!loading && ListEmptyComponent}
              renderItem={renderItem}
              keyExtractor={item => String(item?.id)}
              ListFooterComponent={<View style={{height: 150}} />}
              ItemSeparatorComponent={() => (
                <View style={{height: 0.3, backgroundColor: colors.grey}} />
              )}
            />
          </View>
        )}
      </View>
      <TouchableOpacity
        style={styles.floatingActionButton}
        onPress={() => navigation.navigate('Create')}>
        <Icon name="plus" color={colors.white} size={25} />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  emptyComponent: {
    paddingVertical: 100,
    paddingHorizontal: 100,
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 100,
  },
  noImage: {
    width: 45,
    height: 45,
    backgroundColor: colors.grey,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20,
    alignItems: 'center',
  },
  name: {
    fontSize: 17,
    marginRight: 10,
  },
  phoneNumber: {
    opacity: 0.6,
    fontSize: 14,
    paddingVertical: 5,
  },
  floatingActionButton: {
    backgroundColor: 'red',
    width: 55,
    height: 55,
    position: 'absolute',
    bottom: 45,
    right: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ContactComponent;
