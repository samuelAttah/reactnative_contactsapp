import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import colors from '../../../assets/theme/colors';
import Icon from 'react-native-vector-icons/Entypo';
import ImagePickerCropper from 'react-native-image-crop-picker';

const ImagePicker = React.forwardRef(({onSelectImage}, ref) => {
  const options = [
    {
      name: 'Take from camera',
      icon: <Icon color={colors.grey} size={21} name="camera" />,
      onPress: () => {
        ImagePickerCropper.openCamera({
          width: 300,
          height: 300,
          cropping: true,
          freeStyleCropEnabled: true,
        })
          .then(image => {
            onSelectImage(image);
          })
          .catch(error => console.log('error', error));
      },
    },
    {
      name: 'Choose from Gallery',
      icon: <Icon color={colors.grey} size={21} name="image" />,
      onPress: () => {
        ImagePickerCropper.openPicker({
          width: 300,
          height: 300,
          cropping: true,
          freeStyleCropEnabled: true,
        })
          .then(image => {
            onSelectImage(image);
          })
          .catch(error => console.log('error', error));
      },
    },
  ];
  return (
    <RBSheet
      ref={ref}
      height={200}
      openDuration={250}
      closeOnDragDown={true}
      closeOnPressMask={false}
      customStyles={{
        wrapper: {
          backgroundColor: 'transparent',
        },
        container: {
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        },
        draggableIcon: {
          backgroundColor: '#000',
        },
      }}>
      <View style={styles.optionsWrapper}>
        {options.map(({name, icon, onPress}) => (
          <TouchableOpacity
            onPress={onPress}
            key={name}
            style={styles.pickerOption}>
            {icon}
            <Text style={styles.textOption}>{name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </RBSheet>
  );
});

const styles = StyleSheet.create({
  pickerOption: {
    flexDirection: 'row',
    paddingTop: 20,
    alignItems: 'center',
  },
  optionsWrapper: {
    paddingHorizontal: 20,
  },
  textOption: {
    fontSize: 17,
    marginLeft: 17,
    color: 'black',
  },
});

export default ImagePicker;
