import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import firebase from 'react-native-firebase';

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
      await AsyncStorage.clear();
      const userStoraged = await AsyncStorage.getItem('user');

      const billTypeStoraged = await AsyncStorage.getItem(STORAGE.BILL_TYPE);
      if (!billTypeStoraged) {
        await AsyncStorage.setItem(
          STORAGE.BILL_TYPE,
          JSON.stringify(initialBillTypes),
        );
      }

      if (!userStoraged) {
        console.log('fetch user id');

        firebase
          .auth()
          .signInAnonymouslyAndRetrieveData()
          .then((credential) => {
            if (credential) {
              console.log('default app user ->', credential.user.toJSON());
              const userUid = credential.user.uid;

              firebase
                .firestore()
                .collection('users')
                .add({ uid: userUid })
                .then((dataInserted) => {
                  console.log('add Firestore ->', dataInserted);
                  console.log(dataInserted._documentPath._parts[1]);

                  const databaseId = dataInserted._documentPath._parts[1];

                  AsyncStorage.setItem(
                    'USER_UID',
                    JSON.stringify({ userUid, databaseId }),
                  ).then(() => this.props.navigation.navigate('RootStack'));
                });
            }

            return null;
          });
      }

      /* firebase
        .auth()
        .signInAnonymouslyAndRetrieveData()
        .then((credential) => {
          if (credential) {
            console.log('default app user ->', credential.user.toJSON());
          }

          const FCM = firebase.messaging();
          const ref = firebase.firestore().collection('users');

          // requests permissions from the user
          FCM.requestPermissions();

          FCM.onMessage((payload) => {
            console.log('On Message ->', payload);
          });

          FCM.getInitialNotification().then((payload) => {
            console.log('Inicial Notification ->', payload);
          });

          // gets the device's push token
          FCM.getToken().then((token) => {
            // stores the token in the user's document
            console.log('token ->', token);
            firebase
              .firestore()
              .collection('bills')
              .doc('notification')
              .update({ pushToken: token });
          });
        }); */

      /* if (CLEAR_STORAGE) {
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
      } */
    } catch (error) {
      console.log('error storage');
      console.log(error);
    }
  };

  logInAnonymous = async () => {
    firebase
      .auth()
      .signInAnonymouslyAndRetrieveData()
      .then((credential) => {
        if (credential) {
          console.log('default app user ->', credential.user.toJSON());
          return credential.user.uid;
        }

        return null;
      });
  };

  backupUserUidFirestore = async (uid) => {
    firebase
      .firestore()
      .collection('users')
      .add({ uid })
      .then((dataInserted) => {
        console.log('add Firestore ->', dataInserted);
      });
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
});

export default AppLoading;
