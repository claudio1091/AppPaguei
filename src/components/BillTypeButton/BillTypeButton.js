import React, { Component } from 'react';
import {
  TouchableNativeFeedback,
  View,
  Text,
  AsyncStorage,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

import styles from './style';
import ModalContentBillTypes from '../ModalContentBillTypes';

import { STORAGE, THEME } from '../../constants';

class BillTypeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      billType: this.props.billType || {},
      billTypesList: [],
      modalVisible: false,
    };
  }

  getFromStorage = async () => {
    try {
      const billTypeStoraged = await AsyncStorage.getItem(STORAGE.BILL_TYPE);
      this.setState({ billTypesList: JSON.parse(billTypeStoraged) });
      return billTypeStoraged;
    } catch (error) {
      console.log('error storage');
      console.log(error);
      return [];
    }
  };

  setBillType(billType) {
    this.props.onSelectBillType(billType);
    this.setState({ billType, modalVisible: false });
  }

  setModalVisible = async () => {
    if (this.state.billTypesList.length === 0) {
      await this.getFromStorage();
    }

    this.setState({ modalVisible: true });
  };

  setModalInvisible() {
    this.setState({ modalVisible: false });
  }

  render() {
    const { billType, billTypesList, modalVisible } = this.state;
    const { error } = this.props;

    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}
        >
          <ModalContentBillTypes
            billTypes={billTypesList}
            hideModal={this.setModalInvisible.bind(this)}
            onPress={this.setBillType.bind(this)}
          />
        </Modal>

        <TouchableNativeFeedback
          background={TouchableNativeFeedback.SelectableBackground()}
          onPress={() => this.setModalVisible()}
        >
          <View
            style={[
              styles.billTypeButton,
              error ? { borderBottomColor: 'red' } : {},
            ]}
          >
            <View style={styles.containerTextDefault}>
              {billType.icon && (
                <Icon name={billType.icon} size={25} color={THEME.FONT} />
              )}
              <Text
                style={[
                  styles.billTypeButtonText,
                  billType.name ? { marginLeft: 15, color: THEME.FONT } : {},
                  error ? { color: 'red' } : {},
                ]}
              >
                {billType.name ? billType.name : 'Selecione o Tipo de Conta'}
              </Text>
            </View>
            <View style={styles.containerArrowIcon}>
              <Icon name="md-arrow-dropdown" size={25} color="#606060" />
            </View>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

BillTypeButton.propTypes = {
  onSelectBillType: PropTypes.func,
  billType: PropTypes.object,
  error: PropTypes.bool,
};

BillTypeButton.defaultProps = {
  onSelectBillType: () => {},
  billType: {},
  error: false,
};

export default BillTypeButton;
