import {StyleSheet} from 'react-native';
import colorTheme from './colorTheme';

const globalStyle = StyleSheet.create({
  body: {
    padding: 20,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colorTheme.bright,
  },
  smallSection: {
    width: '100%',
    padding: 20,
    borderRadius: 50,
    borderEndWidth: 0.1,
    borderStartWidth: 0.1,
    borderBottomWidth: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'flex-end',
    marginBottom: 10,
  },
  selectionBox: {
    width: 200,
    height: 200,
  },
  section: {
    marginBottom: 15,
    padding: 12,
    minHeight: 200,
    borderRadius: 15,
    borderEndWidth: 0.1,
    borderStartWidth: 0.1,
    borderBottomWidth: 5,
  },
});

export default globalStyle;
