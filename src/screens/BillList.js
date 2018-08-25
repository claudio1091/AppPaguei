import React, { Component } from 'react';
import {
  AsyncStorage, Image, View, Text,
} from 'react-native';
import { Content, List } from 'native-base';

import moment from 'moment';
import firebase from 'react-native-firebase';

import { STORAGE } from '../constants';
import Container from '../components/Container';
import FabButton from '../components/FabButton';
import BillItemList from '../components/BillItemList';

let willFocusSubscription;

export default class BillList extends Component {
  static navigationOptions = {
    // headerTitle instead of title
    headerTitle: (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={require('../../assets/web_hi_res_512.png')}
          style={{ width: 35, height: 35 }}
        />
        <Text style={{ color: 'white', fontSize: 25, marginLeft: 10 }}>
          Paguei?
        </Text>
      </View>
    ),
  };

  constructor(props) {
    super(props);
    this.state = { bills: [], notification: {} };
    const _this = this;

    willFocusSubscription = this.props.navigation.addListener('willFocus', () => _this.getFromStorage());
  }

  componentDidMount() {
    /*
    // Build a channel
    const channel = new firebase.notifications.Android.Channel(
      'paguei-app',
      'Test Channel',
      firebase.notifications.Android.Importance.Default,
    ).setDescription('My apps test channel');

    // Create the channel
    firebase.notifications().android.createChannel(channel);
    */

    this.notificationDisplayedListener = firebase
      .notifications()
      .onNotificationDisplayed((notification) => {
        // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
        console.log('notification ->', notification);
      });
    this.notificationListener = firebase
      .notifications()
      .onNotification((notification) => {
        // Process your notification as required
        console.log('notification ->', notification);
        firebase.notifications().displayNotification(notification);
      });
  }

  componentWillUnmount() {
    if (willFocusSubscription) {
      willFocusSubscription.remove();
    }

    this.notificationDisplayedListener();
    this.notificationListener();
  }

  getFromStorage = async () => {
    try {
      let billsStoraged = await AsyncStorage.getItem(STORAGE.BILLS);

      console.log('billsStoraged ->', billsStoraged);
      if (billsStoraged) {
        billsStoraged = JSON.parse(billsStoraged);

        console.log('billsStoraged parsed ->', billsStoraged);
        billsStoraged.sort((bill1, bill2) => {
          const momentA = moment(bill1.dueDate);
          const momentB = moment(bill2.dueDate);
          if (momentA > momentB) return 1;
          if (momentA < momentB) return -1;
          return 0;
        });
      }

      console.log('bills storage ->', billsStoraged);

      this.setState({ bills: billsStoraged });
      return billsStoraged;
    } catch (error) {
      console.log('error storage');
      console.log(error);
      return [];
    }
  };

  navigateToDetails = () => {
    this.props.navigation.navigate('BillsDetailScrn');
  };

  render() {
    let { bills } = this.state;

    if (!bills) {
      bills = [];
    }

    const Banner = firebase.admob.Banner;
    const AdRequest = firebase.admob.AdRequest;
    const request = new AdRequest();
    request.addKeyword('foobar');

    return (
      <Container>
        <Content>
          <List>
            {bills.map(billObj => (
              <BillItemList
                key={billObj.id}
                navigation={this.props.navigation}
                bill={billObj}
              />
            ))}
          </List>
        </Content>

        <FabButton navigation={this.props.navigation} />

        <Banner
          unitId="ca-app-pub-3940256099942544/6300978111"
          size="FULL_BANNER"
          request={request.build()}
          onAdLoaded={() => {
            console.log('Advert loaded');
          }}
        />
      </Container>
    );
  }
}
