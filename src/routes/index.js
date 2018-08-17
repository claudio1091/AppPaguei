import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import AppLoading from '../screens/AppLoading';
import BillList from '../screens/BillList';
import BillDetail from '../screens/BillDetail';
import BillTypeDetail from '../screens/BillTypeDetail';
import BillTypeList from '../screens/BillTypeList';

import { THEME } from '../constants';

const RootStack = createStackNavigator(
  {
    BillListScrn: BillList,
    BillsDetailScrn: BillDetail,
    BillTypeListScrn: BillTypeList,
    BillTypeDetailScrn: BillTypeDetail,
  },
  {
    initialRouteName: 'BillListScrn',
    navigationOptions: {
      headerStyle: {
        backgroundColor: THEME.PRIMARY,
      },
      headerTintColor: '#FFF',
      headerTitleContainerStyle: {
        padding: 8,
      },
      headerTitleStyle: {
        fontWeight: '300',
      },
    },
  },
);

export const AppStack = createSwitchNavigator(
  {
    AppLoading,
    RootStack,
  },
  {
    initialRouteName: 'AppLoading',
  },
);
