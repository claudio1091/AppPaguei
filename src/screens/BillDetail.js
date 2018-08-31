import React, { Component } from 'react';
import { View } from 'react-native';
import { Content, Form, DatePicker } from 'native-base';
import {
  TextInput, Checkbox, TouchableRipple, Text,
} from 'react-native-paper';
import moment from 'moment';
import { MaskService } from 'react-native-masked-text';

import firebase from 'react-native-firebase';

import { PersistBill, RemoveBill } from '../helper/billsHelper';
import Button from '../components/Button';
import Container from '../components/Container';
import BillTypeButton from '../components/BillTypeButton';

import { STORAGE, THEME } from '../constants';

export default class BillDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title', 'Nova Conta'),
  });

  constructor(props) {
    super(props);

    const { navigation } = this.props;
    const billParam = navigation.getParam('bill', {});

    this.state = {
      id: billParam.id || '',
      dueDate: billParam.dueDate || new Date(),
      billType: billParam.billType || {},
      description: billParam.description || '',
      value: billParam.value || 0,
      notify: false,
      repeat: false,
      maskedValue: '',
      formValidate: {
        billType: false,
        description: false,
        value: false,
      },
    };

    this.setDate = this.setDate.bind(this);

    if (billParam.value) {
      const money = MaskService.toMask(
        'money',
        parseFloat(billParam.value).toFixed(2),
        {
          unit: 'R$ ',
          separator: ',',
          delimiter: '.',
        },
      );

      this.state.maskedValue = money;
    }
  }

  setDate(newDate) {
    this.setState({ dueDate: newDate });
  }

  validateForm = () => {
    const inputError = {};

    if (!this.state.description || this.state.description.length === 0) {
      inputError.description = true;
    }
    if (!this.state.value || this.state.value === 0) {
      inputError.value = true;
    }
    if (!this.state.billType || Object.keys(this.state.billType).length === 0) {
      inputError.billType = true;
    }

    if (Object.keys(inputError).length > 0) {
      this.setState({ formValidate: inputError });
      return false;
    }

    return true;
  };

  persistBill = async () => {
    const billToSave = {
      id: this.state.id,
      dueDate: this.state.dueDate,
      billType: this.state.billType,
      description: this.state.description,
      value: this.state.value.toString().replace('R$ ', ''),
      notify: this.state.notify,
      repeat: this.state.repeat,
    };

    const billSaved = await PersistBill(billToSave);

    if (billSaved instanceof Object && billSaved.error) {
      this.setState({ formValidate: billSaved.error });
      return;
    }

    this.props.navigation.goBack();
  };

  removeBill = async () => {
    const billId = this.state.id;
    const billRemoved = await RemoveBill(billId);

    if (billRemoved) {
      this.props.navigation.goBack();
    }
  };

  formatBillDate = date => moment(date).format('DD/MM/YYYY');

  handleValueChange = (valueData) => {
    const formValidate = this.state.formValidate;
    formValidate.value = false;

    const money = MaskService.toMask('money', valueData, {
      unit: 'R$ ',
      separator: ',',
      delimiter: '.',
    });

    this.setState({
      value: parseFloat(MaskService.toRawValue('money', money)).toFixed(2),
      maskedValue: money,
      formValidate,
    });
  };

  selectBillType(billType) {
    const formValidate = this.state.formValidate;
    formValidate.billType = false;
    this.setState({ billType, formValidate });
  }

  render() {
    const {
      id,
      dueDate,
      billType,
      description,
      notify,
      repeat,
      maskedValue,
      formValidate,
    } = this.state;

    return (
      <Container padding>
        <Content style={{ backgroundColor: 'white' }}>
          <Form>
            <BillTypeButton
              billType={billType}
              error={formValidate.billType}
              onSelectBillType={this.selectBillType.bind(this)}
            />

            <TextInput
              label="Descrição"
              value={description}
              onChangeText={data => this.setState({ description: data })}
              error={formValidate.description}
            />

            <TextInput
              label="Valor"
              value={maskedValue}
              onChangeText={data => this.handleValueChange(data)}
              keyboardType="numeric"
              error={formValidate.value}
            />

            <View
              style={{
                backgroundColor: 'transparent',
                flexDirection: 'column',
                borderBottomColor: '#DDDDDD',
                borderBottomWidth: 1,
                paddingTop: 15,
                marginBottom: 20,
              }}
            >
              <Text style={{ color: '#606060', fontSize: 12 }}>
                Data de Vencimento
              </Text>
              <DatePicker
                defaultDate={new Date(dueDate) || new Date()}
                minimumDate={new Date(2018, 1, 1)}
                maximumDate={new Date(2060, 12, 31)}
                formatChosenDate={this.formatBillDate}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType="fade"
                androidMode="calendar"
                textStyle={{
                  color: THEME.FONT,
                  fontFamily: 'Roboto',
                  fontSize: 18,
                  includeFontPadding: false,
                  lineHeight: 18,
                }}
                onDateChange={this.setDate}
              />
            </View>

            <TouchableRipple
              onPress={() => this.setState({ repeat: !repeat })}
              rippleColor="rgba(0, 0, 0, .32)"
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 50,
                }}
              >
                <Text
                  style={{
                    flex: 4,
                    color: THEME.FONT,
                    fontFamily: 'Roboto',
                    fontSize: 15,
                    includeFontPadding: false,
                    lineHeight: 15,
                  }}
                >
                  Repetir todo mês
                </Text>
                <Checkbox checked={repeat} style={{ flex: 1 }} />
              </View>
            </TouchableRipple>

            <TouchableRipple
              onPress={() => this.setState({ notify: !notify })}
              rippleColor="rgba(0, 0, 0, .32)"
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 50,
                }}
              >
                <Text
                  style={{
                    flex: 4,
                    color: THEME.FONT,
                    fontFamily: 'Roboto',
                    fontSize: 15,
                    includeFontPadding: false,
                    lineHeight: 15,
                  }}
                >
                  Notificar próx. ao vencimento
                </Text>
                <Checkbox checked={notify} style={{ flex: 1 }} />
              </View>
            </TouchableRipple>
          </Form>

          <Button
            primary
            padding
            text="Salvar Conta"
            onPress={this.persistBill.bind(this)}
          />

          {id !== '' && (
            <View style={{ flex: 1 }}>
              <Button
                cancel
                padding
                text="Excluir Conta"
                onPress={this.removeBill.bind(this)}
              />
            </View>
          )}
        </Content>
      </Container>
    );
  }
}
