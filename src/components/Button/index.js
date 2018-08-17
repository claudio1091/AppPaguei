import React from 'react';
import {
  TouchableNativeFeedback, StyleSheet, View, Text,
} from 'react-native';
import PropTypes from 'prop-types';

import { THEME } from '../../constants';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 2,
    marginVertical: 10,
  },
  buttonPadding: {
    padding: 20,
  },
  buttonPrimary: {
    backgroundColor: THEME.PRIMARY,
    elevation: 3,
  },
  buttonCancel: {
    backgroundColor: THEME.CANCEL,
    elevation: 3,
  },
  textStyle: {
    color: THEME.FONT,
    fontFamily: 'Roboto',
    fontSize: 20,
    includeFontPadding: false,
    lineHeight: 20,
  },
  textStyleCustom: {
    color: THEME.FONT_COLOR,
  },
});

function Button(props) {
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.SelectableBackground()}
      onPress={() => props.onPress()}
    >
      <View
        style={[
          styles.button,
          props.primary ? styles.buttonPrimary : {},
          props.cancel ? styles.buttonCancel : {},
          props.padding ? styles.buttonPadding : {},
        ]}
      >
        <Text
          style={[
            styles.textStyle,
            props.primary || props.cancel ? styles.textStyleCustom : {},
          ]}
        >
          {props.text || ''}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
}

Button.propTypes = {
  // type: PropTypes.oneOf(['NORMAL', 'BIG']),
  text: PropTypes.string,
  onPress: PropTypes.func,
  primary: PropTypes.bool,
  cancel: PropTypes.bool,
  padding: PropTypes.bool,
};

Button.defaultProps = {
  // type: 'NORMAL',
  text: 'Sample Button',
  onPress: () => {},
  primary: false,
  cancel: false,
  padding: false,
};

export default Button;
