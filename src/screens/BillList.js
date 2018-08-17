import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { Content, List } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

import firebase from 'react-native-firebase';

import { STORAGE } from '../constants';
import Container from '../components/Container';
import FabButton from '../components/FabButton';
import BillItemList from '../components/BillItemList';

let didBlurSubscription;

export default class BillList extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'PAGUEI?',
    headerRight: (
      <Icon
        name="md-more"
        style={{ padding: 10 }}
        size={30}
        color="white"
        onPress={() => navigation.navigate('BillTypeListScrn')}
      />
    ),
  });

  constructor(props) {
    super(props);
    this.state = { bills: [], notification: {} };
    const _this = this;

    didBlurSubscription = this.props.navigation.addListener('willFocus', () => _this.getFromStorage());
  }

  componentWillUnmount() {
    if (didBlurSubscription) {
      didBlurSubscription.remove();
    }
  }

  getFromStorage = async () => {
    try {
      const billsStoraged = await AsyncStorage.getItem(STORAGE.BILLS);

      this.setState({ bills: JSON.parse(billsStoraged) });
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

/**
 * <AdMobBanner
          bannerSize="fullBanner"
          adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
          testDeviceID="EMULATOR"
          onDidFailToReceiveAdWithError={this.bannerError}
        />
 */
