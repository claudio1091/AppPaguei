import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  itemContainer: {
    height: Dimensions.get('window').height / 10,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderColor: '#DDDDDD',
    borderBottomWidth: 1,
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
