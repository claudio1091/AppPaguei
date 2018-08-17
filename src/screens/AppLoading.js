import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import { STORAGE } from '../constants';

const CLEAR_STORAGE = true;

class AppLoading extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const initialBillTypes = [
      { name: 'ÁGUA', icon: 'ios-water' },
      { name: 'ENERGIA', icon: 'ios-flash' },
      { name: 'CELULAR', icon: 'ios-phone-portrait' },
      { name: 'TRANSPORTE', icon: 'ios-bus' },
    ];
    const initialBills = [
      {
        id: Math.floor(Math.random() * 10000),
        dueDate: new Date(),
        description: 'Conta de Teste 01',
        billType: { name: 'ÁGUA', icon: 'ios-water' },
        value: 39.5,
      },
      {
        id: Math.floor(Math.random() * 10000),
        dueDate: new Date(),
        description: 'Conta de Teste 02',
        billType: { name: 'ENERGIA', icon: 'ios-flash' },
        value: 159.32,
      },
    ];

    try {
      if (CLEAR_STORAGE) {
        await AsyncStorage.clear();
      }

      const billTypeStoraged = await AsyncStorage.getItem(STORAGE.BILL_TYPE);
      if (!billTypeStoraged) {
        await AsyncStorage.setItem(
          STORAGE.BILL_TYPE,
          JSON.stringify(initialBillTypes),
        );
      }

      const billStoraged = await AsyncStorage.getItem(STORAGE.BILLS);
      if (!billStoraged) {
        console.log('persist in storage');
        await AsyncStorage.setItem(STORAGE.BILLS, JSON.stringify(initialBills));
      }

      this.props.navigation.navigate('RootStack');
    } catch (error) {
      console.log('error storage');
      console.log(error);
    }
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="default" />
        <ActivityIndicator />
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
});

export default AppLoading;
