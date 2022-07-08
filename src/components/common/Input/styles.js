import {StyleSheet} from 'react-native';
import colors from '../../../assets/theme/colors';
const inputstyles = StyleSheet.create({
  textInput: {
    flex: 1,
    width: '100%',
  },
  wrapper: {
    height: 42,
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: 'row',
    paddingHorizontal: 5,

    marginTop: 5,
  },
  inputContainer: {
    marginBottom: 12,
  },
  error: {
    color: colors.danger,
    paddingTop: 4,
    fontSize: 12,
  },
});

export default inputstyles;
