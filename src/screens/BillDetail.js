import React, { Component } from 'react';
import { AsyncStorage, View, Text } from 'react-native';
import {
  Form, Item, Label, Input, DatePicker,
} from 'native-base';
import moment from 'moment';
import { TextInputMask } from 'react-native-masked-text';

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
    console.log(billParam);

    this.state = {
      id: billParam.id || '',
      dueDate: billParam.dueDate || new Date(),
      billTypesList: [],
      billType: billParam.billType || {},
      description: billParam.description || '',
      value: billParam.value || 0,
      modalVisible: false,
    };
    console.log(this.state);
    this.setDate = this.setDate.bind(this);
  }

  componentDidMount() {
    this.getFromStorage();
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

  setDate(newDate) {
    this.setState({ dueDate: newDate });
  }

  setModalVisible() {
    this.setState({ modalVisible: true });
  }

  setModalInvisible() {
    this.setState({ modalVisible: false });
  }

  persistBill = async () => {
    try {
      await AsyncStorage.getItem(STORAGE.BILLS, (err, result) => {
        const {
          id, dueDate, billType, description, value,
        } = this.state;
        const newBill = {
          id,
          dueDate,
          billType,
          description,
          value,
        };
        let storagedValue = [];

        if (result) {
          storagedValue = JSON.parse(result);
        }

        if (!newBill.id || newBill.id === '') {
          newBill.id = Date.now().toString();
        } else {
          storagedValue = storagedValue.filter(bill => bill.id !== newBill.id);
        }

        storagedValue.push(newBill);

        console.log(storagedValue);

        AsyncStorage.setItem(
          STORAGE.BILLS,
          JSON.stringify(storagedValue),
          (setErr, setResult) => {
            console.log(setResult);
            if (!setErr) {
              this.props.navigation.goBack();
            }
          },
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  removeBill = async () => {
    try {
      await AsyncStorage.getItem(STORAGE.BILLS, (err, result) => {
        const {
          id, dueDate, billType, description, value,
        } = this.state;

        const newBill = {
          id,
          dueDate,
          billType,
          description,
          value,
        };
        let storagedValue = [];

        if (result) {
          storagedValue = JSON.parse(result);
        }
        storagedValue = storagedValue.filter(bill => bill.id !== newBill.id);

        console.log(storagedValue);

        AsyncStorage.setItem(
          STORAGE.BILLS,
          JSON.stringify(storagedValue),
          (setErr, setResult) => {
            console.log(setResult);
            if (!setErr) {
              this.props.navigation.goBack();
            }
          },
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  formatBillDate = date => moment(date).format('DD/MM/YYYY');

  selectBillType(billType) {
    this.setState({ billType });
  }

  render() {
    const {
      id, billType, dueDate, description, value,
    } = this.state;

    return (
      <Container padding>
        <Form>
          <BillTypeButton
            billType={billType}
            onSelectBillType={this.selectBillType.bind(this)}
          />

          <Item stackedLabel>
            <Label>Descrição</Label>
            <Input
              value={description}
              onChangeText={value => this.setState({ description: value })}
            />
          </Item>

          <Item stackedLabel>
            <Label>Valor</Label>
            <TextInputMask
              value={value}
              type="money"
              customTextInput={Input}
              onChangeText={value => this.setState({ value })}
              options={{
                unit: 'R$ ',
              }}
            />
          </Item>

          <View
            style={{
              backgroundColor: 'transparent',
              flexDirection: 'column',
              borderBottomColor: '#DDDDDD',
              borderBottomWidth: 1,
              paddingBottom: 3,
              paddingTop: 15,
              marginLeft: 5,
              marginBottom: 20,
            }}
          >
            <Text style={{ color: '#606060', fontSize: 15, marginLeft: 10 }}>
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
      </Container>
    );
  }
}
