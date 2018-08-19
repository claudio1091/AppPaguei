import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Dimensions,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import firebase from 'react-native-firebase';

import { THEME, STORAGE } from '../constants';

class AppLoading extends Component {
  constructor(props) {
    super(props);
    this.bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  bootstrapAsync = async () => {
    try {
      const userToken = await AsyncStorage.getItem('USER_TOKEN');

      if (!userToken) {
        const FCM = firebase.messaging();

        const uid = await this.logInAnonymous();
        const FcmToken = await FCM.getToken();

        await AsyncStorage.setItem(
          'USER_TOKEN',
          JSON.stringify({ token: FcmToken, createAt: new Date(), uid }),
        );
      }

      const listBillType = await firebase
        .firestore()
        .collection('config')
        .doc('default')
        .get();

      await AsyncStorage.setItem(
        STORAGE.BILL_TYPE,
        JSON.stringify(listBillType.get('billType')),
      );

      await this.grantNotificationPermission();

      this.props.navigation.navigate('RootStack');
    } catch (error) {
      console.log('error storage');
      console.log(error);
    }
  };

  logInAnonymous = async () => {
    const credential = await firebase.auth().signInAnonymouslyAndRetrieveData();
    console.log('logIn ->', credential);
    return credential.user ? credential.user.uid || null : null;
  };

  grantNotificationPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    console.log('messaging permission ->', enabled);
    if (enabled) {
      // user has permissions
      await firebase.messaging().requestPermission();
    } else {
      // user doesn't have permission
      await firebase.messaging().requestPermission();
    }
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/web_hi_res_512.png')}
          style={{
            width: Dimensions.get('window').width / 2,
            height: Dimensions.get('window').width / 2,
          }}
        />
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: THEME.FONT_COLOR,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

AppLoading.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default AppLoading;
