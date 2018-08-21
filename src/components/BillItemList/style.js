import { StyleSheet, Dimensions } from 'react-native';
import { THEME } from '../../constants';

export default StyleSheet.create({
  itemContainer: {
    height: Dimensions.get('window').height / 8,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    flex: 1,
    padding: 10,
    backgroundColor: THEME.FONT_COLOR,
    borderBottomColor: THEME.BACKGROUND,
    borderBottomWidth: 2,
  },
  dateContainer: {
    flex: 1,
    backgroundColor: THEME.PRIMARY,
    borderRadius: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  selectedDay: {
    color: THEME.FONT_COLOR,
    fontSize: 30,
    lineHeight: 30,
    includeFontPadding: false,
  },
  selectedMonth: {
    color: THEME.FONT_COLOR,
    fontSize: 14,
    lineHeight: 14,
    includeFontPadding: false,
  },
  infoContainer: {
    flex: 3,
    flexDirection: 'column',
    padding: 12,
  },
  billType: {
    fontSize: 20,
  },
  billDescription: {
    fontSize: 14,
  },
  valueContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
