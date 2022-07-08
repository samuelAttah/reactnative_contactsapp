import {View, Text, TextInput} from 'react-native';
import React, {useState} from 'react';
import inputstyles from './styles';
import colors from '../../../assets/theme/colors';

const Input = ({
  value,
  onChangeText,
  placeholder,
  style,
  label,
  icon,
  iconPosition,
  error,
  ...props
}) => {
  const [focused, setFocused] = useState(false);

  const getFlexDirection = () => {
    if (icon && iconPosition) {
      if (iconPosition === 'left') {
        return 'row';
      } else if (iconPosition === 'right') {
        return 'row-reverse';
      }
    }
  };

  const getBorderColor = () => {
    if (error) {
      return colors.danger;
    }
    if (focused) {
      return colors.primary;
    }
    return colors.grey;
  };

  return (
    <View style={inputstyles.inputContainer}>
      {label && <Text>{label}</Text>}
      <View
        style={[
          inputstyles.wrapper,
          {alignItems: icon ? 'center' : 'baseline'},
          {flexDirection: getFlexDirection(), borderColor: getBorderColor()},
        ]}>
        <View>{icon && icon}</View>
        <TextInput
          style={[inputstyles.textInput, style]}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
      </View>
      {error && <Text style={inputstyles.error}>{error}</Text>}
    </View>
  );
};

export default Input;
