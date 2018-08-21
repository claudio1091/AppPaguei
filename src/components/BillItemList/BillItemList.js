import React from 'react';
import { TouchableNativeFeedback, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';

import styles from './style';
import { MomentPtBr } from './util';

function BillItemList(props) {
  moment.updateLocale('pt-br', MomentPtBr);
  moment().locale('pt-br');

  const chooseDate = moment(props.bill.dueDate);
  const selectedDate = {
    day: chooseDate.format('DD'),
    month: chooseDate.format('MMM').toUpperCase(),
  };

  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.SelectableBackground()}
      onPress={() => props.navigation.navigate('BillsDetailScrn', {
        title: 'Editar Conta',
        bill: props.bill,
      })
      }
    >
      <View style={styles.itemContainer}>
        <View style={styles.dateContainer}>
          <Text style={styles.selectedDay}>{selectedDate.day}</Text>
          <Text style={styles.selectedMonth}>{selectedDate.month}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.billType}>{props.bill.billType.name || ''}</Text>
          <Text style={styles.billDescription}>
            {props.bill.description || ''}
          </Text>
        </View>
        <View style={styles.valueContainer}>
          <Text>{`R$ ${props.bill.value}`}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

BillItemList.propTypes = {
  bill: PropTypes.object.isRequired,
  navigation: PropTypes.object,
};

BillItemList.defaultProps = {
  navigation: {},
};

export default BillItemList;
