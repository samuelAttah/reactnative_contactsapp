import {StyleSheet} from 'react-native';
import colors from '../../assets/theme/colors';

const styles = StyleSheet.create({
  logoImage: {
    height: 70,
    width: 70,
    alignSelf: 'center',
    marginTop: 50,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: 20,
    fontSize: 19,
  },
  subtitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    paddingVertical: 20,
    paddingBottom: 40,
  },
  createSection: {
    flexDirection: 'row',
  },
  linkBtn: {
    paddingLeft: 17,
    color: colors.primary,
    fontSize: 16,
  },
  infoText: {
    fontSize: 17,
  },
});

export default styles;
