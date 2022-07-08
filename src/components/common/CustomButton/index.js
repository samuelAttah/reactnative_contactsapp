import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
// import inputstyles from './styles';
// import colors from '../../../assets/theme/colors';

const CustomButton = ({
  disabled,
  title,
  loading,
  secondary,
  primary,
  danger,
}) => {
  return (
    <TouchableOpacity disabled={disabled}>
      {title && <Text>{title.toUpperCase()}</Text>}
    </TouchableOpacity>
  );
};

export default CustomButton;
