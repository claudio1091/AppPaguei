import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  billTypeButton: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    marginLeft: 20,
    paddingBottom: 8,
    paddingTop: 20,
  },
  billTypeButtonText: {
    color: '#606060',
    fontFamily: 'Roboto',
    fontSize: 18,
    includeFontPadding: false,
    lineHeight: 18,
  },
  containerTextDefault: {
    flex: 6,
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  containerArrowIcon: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 10,
  },
});
