import { StyleSheet, Dimensions } from 'react-native';
import { ACCENT, BACKGROUND, FONT_ACCENT } from '../../config/theme';

export default StyleSheet.create({
  itemContainer: {
    backgroundColor: 'white',
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    elevation: 2,
    flex: 1,
    flexDirection: 'row',
    height: Dimensions.get('window').height / 8,
    padding: 8,
    width: Dimensions.get('window').width,
  },
  dateContainer: {
    alignItems: 'center',
    backgroundColor: ACCENT,
    borderRadius: 8,
    elevation: 2,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  selectedDay: {
    color: FONT_ACCENT,
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 30,
    includeFontPadding: false,
  },
  selectedMonth: {
    color: FONT_ACCENT,
    fontSize: 14,
    fontWeight: '300',
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
    width: 90,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
