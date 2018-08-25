import React from 'react';
import {
  TouchableNativeFeedback,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import { Paper } from 'react-native-paper';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';

import { ACCENT } from '../../config/theme';

const styles = StyleSheet.create({
  fabIcon: {
    alignItems: 'center',
    backgroundColor: ACCENT,
    borderRadius: Dimensions.get('window').width / 6,
    bottom: 15,
    elevation: 6,
    height: Dimensions.get('window').width / 6,
    justifyContent: 'center',
    padding: 8,
    position: 'absolute',
    right: 15,
    width: Dimensions.get('window').width / 6,
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
        style={{ borderRadius: Dimensions.get('window').width / 8 }}
        onPress={() => props.navigation.navigate('BillsDetailScrn')}
      >
        <Paper style={styles.fabIcon}>
          <Icon name="md-add" size={32} color="white" />
        </Paper>
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
