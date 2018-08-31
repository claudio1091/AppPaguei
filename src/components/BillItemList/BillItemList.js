import React from 'react';
import { TouchableNativeFeedback, View } from 'react-native';
import { Paper, Text } from 'react-native-paper';
import PropTypes from 'prop-types';
import moment from 'moment';
import { MaskService } from 'react-native-masked-text';

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

  const money = MaskService.toMask(
    'money',
    parseFloat(props.bill.value).toFixed(2),
    {
      unit: 'R$ ',
    },
  );

  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.SelectableBackground()}
      style={{ borderRadius: 8 }}
      onPress={() => props.navigation.navigate('BillsDetailScrn', {
        title: 'Editar Conta',
        bill: props.bill,
      })
      }
    >
      <Paper style={styles.itemContainer}>
        <Paper style={styles.dateContainer}>
          <Text style={styles.selectedDay}>{selectedDate.day}</Text>
          <Text style={styles.selectedMonth}>{selectedDate.month}</Text>
        </Paper>
        <View style={styles.infoContainer}>
          <Text style={styles.billType}>{props.bill.billType.name || ''}</Text>
          <Text style={styles.billDescription}>
            {props.bill.description || ''}
          </Text>
        </View>
        <View style={styles.valueContainer}>
          <Text style={{ fontWeight: 'bold' }}>{`${money}`}</Text>
        </View>
      </Paper>
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
