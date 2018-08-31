import React, { Component } from 'react';
import { Image, View, Text } from 'react-native';
import { Content, List } from 'native-base';

import firebase from 'react-native-firebase';

import { GetBills } from '../helper/billsHelper';
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
          source={require('../assets/web_hi_res_512.png')}
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
    const _this = this;
    this.state = {
      bills: [],
    };

    willFocusSubscription = this.props.navigation.addListener('willFocus', () => _this.getBills());
  }

  async componentDidMount() {
    this.notificationListener = firebase
      .notifications()
      .onNotification((notification) => {
        // Process your notification as required
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

  getBills = async () => {
    const bills = await GetBills(true);
    this.setState({ bills });
  };

  render() {
    const { bills } = this.state;
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
        />
      </Container>
    );
  }
}
