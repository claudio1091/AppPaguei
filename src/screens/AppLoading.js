import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import firebase from 'react-native-firebase';

import { STORAGE } from '../constants';

class AppLoading extends Component {
  constructor(props) {
    super(props);
    this.bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  bootstrapAsync = async () => {
    try {
      await AsyncStorage.clear();
      const userToken = await AsyncStorage.getItem('USER_TOKEN');
      console.log(userToken);

      if (!userToken) {
        const FCM = firebase.messaging();
        console.log('fetch user id');

        const uid = await this.logInAnonymous();
        const FcmToken = await FCM.getToken();
        console.log('default app user ->', uid);
        console.log('token ->', FcmToken);


        await AsyncStorage.setItem(
          'USER_TOKEN',
          JSON.stringify({ token: FcmToken, createAt: new Date() }),
        );
      }

      const listBillType = await firebase
        .firestore()
        .collection('default')
        .doc('billType')
        .get();
      console.log('firestore billType ->', listBillType);
      await AsyncStorage.setItem(
        STORAGE.BILL_TYPE,
        JSON.stringify(listBillType),
      );

      this.props.navigation.navigate('RootStack');
    } catch (error) {
      console.log('error storage');
      console.log(error);
    }
  };

  logInAnonymous = async () => {
    const credential = await firebase.auth().signInAnonymouslyAndRetrieveData();
    return credential.user ? credential.user.uid || null : null;
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

AppLoading.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default AppLoading;
