import React from 'react';
import {
  TouchableNativeFeedback,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  fabIcon: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    height: Dimensions.get('window').width / 6,
    width: Dimensions.get('window').width / 6,
    borderRadius: Dimensions.get('window').width / 6,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function FabButton(props) {
  return (
    <View>
      <TouchableNativeFeedback
        hitSlop={{
          top: 20,
          left: 20,
          bottom: 20,
          right: 20,
        }}
        onPress={() => props.navigation.navigate('BillsDetailScrn')}
      >
        <View>
          <Icon name="md-add" size={32} color="white" />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

/*
 * <LinearGradient colors={['#0076DD', '#00CDE9']} style={styles.fabIcon}>
 * </LinearGradient>
 */

FabButton.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default FabButton;
