import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import {
  Content,
  Form,
  Item,
  Label,
  Input,
  Button,
  Text,
  ActionSheet,
} from 'native-base';
import { STORAGE, THEME } from '../constants';

const BUTTONS = [
  { text: 'Option 0', icon: 'water', iconColor: THEME.PRIMARY },
  { text: 'Option 1', icon: 'flash', iconColor: THEME.PRIMARY },
  { text: 'Option 2', icon: 'phone-portrait', iconColor: THEME.PRIMARY },
  { text: 'Option 0', icon: 'american-football', iconColor: THEME.PRIMARY },
  { text: 'Option 1', icon: 'analytics', iconColor: THEME.PRIMARY },
  { text: 'Option 2', icon: 'aperture', iconColor: THEME.PRIMARY },
  { text: 'Cancelar', icon: 'close', iconColor: THEME.PRIMARY },
];
const DESTRUCTIVE_INDEX = 3;
const CANCEL_INDEX = BUTTONS.length - 1;

export default class BillTypeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: '',
      name: '',
    };
  }

  persistBillType = async () => {
    try {
      await AsyncStorage.getItem(STORAGE.BILL_TYPE, (err, result) => {
        const storagedValue = JSON.parse(result);

        storagedValue.push(this.state);

        AsyncStorage.setItem(
          STORAGE.BILL_TYPE,
          JSON.stringify(storagedValue),
          (setErr, setResult) => {
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

  render() {
    return (
      <View style={styles.container}>
        <Content padder>
          <Form>
            <Item floatingLabel>
              <Label>Nome</Label>
              <Input onChangeText={value => this.setState({ name: value })} />
            </Item>
            <Button
              onPress={() => ActionSheet.show(
                {
                  options: BUTTONS,
                  cancelButtonIndex: CANCEL_INDEX,
                  title: 'Selecione um ícone',
                },
                (buttonIndex) => {
                  this.setState({ icon: BUTTONS[buttonIndex].icon });
                },
              )
              }
            >
              <Text>Actionsheet</Text>
            </Button>
          </Form>

          <Button block onPress={() => this.persistBillType()}>
            <Text>Salvar</Text>
          </Button>
        </Content>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#FFF',
  },
  listContainer: {
    flex: 1,
  },
  fabIcon: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    // height: 60,
    // width: 60,
    borderRadius: 10,
    // padding: 10,
  },
});
