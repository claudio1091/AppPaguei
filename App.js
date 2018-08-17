import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { Root } from 'native-base';

import { AppStack } from './src/routes';

/**
 * Add to AppStack render:
 *  persistenceKey={navigationPersistenceKey}
 */
const navigationPersistenceKey = __DEV__ ? 'NavigationStateDEV' : null;

export default class App extends Component {
  render() {
    return (
      <Root>
        <AppStack renderLoadingExperimental={() => <ActivityIndicator />} />
      </Root>
    );
  }
}
