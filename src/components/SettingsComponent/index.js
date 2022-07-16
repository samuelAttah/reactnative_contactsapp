import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React from 'react';
import AppModal from '../common/AppModal';
import colors from '../../assets/theme/colors';
import Icon from 'react-native-vector-icons/AntDesign';

const SettingsComponent = ({
  settingsOptions,
  modalVisible,
  setModalVisible,
  sortBy,
  setSortBy,
  prefArr,
}) => {
  return (
    <>
      <AppModal
        modalVisible={modalVisible}
        modalFooter={<></>}
        closeOnTouchOutside={false}
        modalBody={
          <View>
            {prefArr.map(({name, selected, onPress}) => (
              <View key={name}>
                <TouchableOpacity
                  onPress={onPress}
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 5,
                    alignItems: 'center',
                  }}>
                  {selected && <Icon size={17} name="check" />}
                  <Text style={{fontSize: 17, paddingLeft: selected ? 15 : 30}}>
                    {name}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        }
        title="Sort by"
        setModalVisible={setModalVisible}
      />
      <ScrollView style={styles.containerView}>
        {settingsOptions.map(({title, subTitle, onPress}, index) => (
          <TouchableOpacity key={title} onPress={onPress}>
            <View style={styles.textView}>
              <Text style={styles.titleText}>{title}</Text>
              {subTitle && <Text style={styles.subtitleText}>{subTitle}</Text>}
            </View>
            <View style={styles.lineView} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  lineView: {
    height: 0.5,
    backgroundColor: colors.grey,
  },
  titleText: {
    fontSize: 17,
    color: 'black',
  },
  subtitleText: {
    fontSize: 14,
    opacity: 0.5,
    paddingTop: 5,
  },
  containerView: {
    backgroundColor: colors.white,
  },
  textView: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 20,
  },
});

export default SettingsComponent;
