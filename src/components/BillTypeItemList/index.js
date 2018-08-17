import React from 'react';
import {
  TouchableNativeFeedback,
  StyleSheet,
  View,
  Dimensions,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';

import { THEME } from '../../constants';

const styles = StyleSheet.create({
  itemContainer: {
    height: Dimensions.get('window').height / 8,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    flex: 1,
    padding: 20,
    paddingVertical: 10,
    backgroundColor: THEME.FONT_COLOR,
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

function BillTypeItemList(props) {
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.SelectableBackground()}
      onPress={() => props.onPress(props.billType)}
    >
      <View style={styles.itemContainer}>
        <View style={styles.iconContainer}>
          <Icon name={props.billType.icon} size={32} color="black" />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.billType}>{props.billType.name || ''}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

BillTypeItemList.propTypes = {
  billType: PropTypes.object.isRequired,
  onPress: PropTypes.func,
};

BillTypeItemList.defaultProps = {
  onPress: () => {},
};

export default BillTypeItemList;
