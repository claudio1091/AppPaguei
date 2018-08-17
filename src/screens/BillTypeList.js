import React, { Component } from 'react';
import {
  View, AsyncStorage, StyleSheet, Text,
} from 'react-native';
import { Content, List, ListItem } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

import { STORAGE } from '../constants';

export default class BillTypeList extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title', 'Tipos de Contas'),
    headerRight: (
      <Icon
        name="add"
        onPress={() => navigation.navigate('BillTypeDetailScrn')}
      />
    ),
  });

  constructor(props) {
    super(props);
    this.state = { billTypes: [] };
  }

  componentWillMount() {
    this.getFromStorage();
  }

  getFromStorage = async () => {
    try {
      const billTypeStoraged = await AsyncStorage.getItem(STORAGE.BILL_TYPE);
      this.setState({ billTypes: JSON.parse(billTypeStoraged) });
      return billTypeStoraged;
    } catch (error) {
      console.log('error storage');
      console.log(error);
      return [];
    }
  };

  render() {
    const { billTypes } = this.state;

    return (
      <View style={styles.container}>
        <Content>
          <List>
            {billTypes.map((object, i) => (
              <ListItem key={i}>
                <Text>{object.name}</Text>
              </ListItem>
            ))}
          </List>
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
