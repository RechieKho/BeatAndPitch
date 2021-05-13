import {StyleSheet} from 'react-native';
import colorTheme from './colorTheme';

const globalStyle = StyleSheet.create({
  body: {
    padding: 20,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colorTheme.bright,
  },
  h1: {
    fontSize: 30,
    marginBottom: 5,
  },
});

export default globalStyle;
