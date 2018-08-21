import { StyleSheet, Dimensions } from 'react-native';
import { PRIMARY, FONT } from '../../config/theme';

export default StyleSheet.create({
  itemContainer: {
    height: Dimensions.get('window').height / 10,
    width: Dimensions.get('window').width - 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 20,
    paddingVertical: 10,
    backgroundColor: FONT,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 8,
    borderColor: PRIMARY,
    borderWidth: 1,
  },
  iconContainer: {
    flex: 1,
    borderRadius: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 3,
    flexDirection: 'column',
    padding: 12,
  },
  billType: {
    fontSize: 20,
  },
});
