import React from 'react';
import { TouchableNativeFeedback, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './style';

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
