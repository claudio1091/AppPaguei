import React from 'react';
import {
  TouchableNativeFeedback,
  StyleSheet,
  View,
  Dimensions,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';

import { THEME } from '../../constants';

const styles = StyleSheet.create({
  itemContainer: {
    height: Dimensions.get('window').height / 8,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    flex: 1,
    padding: 10,
    backgroundColor: THEME.FONT_COLOR,
    borderBottomColor: THEME.BACKGROUND,
    borderBottomWidth: 2,
  },
  dateContainer: {
    flex: 1,
    backgroundColor: THEME.PRIMARY,
    borderRadius: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  selectedDay: {
    color: THEME.FONT_COLOR,
    fontSize: 30,
    lineHeight: 30,
    includeFontPadding: false,
  },
  selectedMonth: {
    color: THEME.FONT_COLOR,
    fontSize: 14,
    lineHeight: 14,
    includeFontPadding: false,
  },
  infoContainer: {
    flex: 3,
    flexDirection: 'column',
    padding: 12,
  },
  billType: {
    fontSize: 20,
  },
  billDescription: {
    fontSize: 14,
  },
  valueContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function BillItemList(props) {
  moment.updateLocale('pt-br', {
    months: 'janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro'.split(
      '_',
    ),
    monthsShort: 'JAN_FEV_MAR_ABR_MAI_JUN_JUL_AGO_SET_OUT_NOV_DEZ'.split('_'),
    weekdays: 'Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado'.split(
      '_',
    ),
    weekdaysShort: 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
    weekdaysMin: 'Do_2ª_3ª_4ª_5ª_6ª_Sá'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D [de] MMMM [de] YYYY',
      LLL: 'D [de] MMMM [de] YYYY [às] HH:mm',
      LLLL: 'dddd, D [de] MMMM [de] YYYY [às] HH:mm',
    },
    calendar: {
      sameDay: '[Hoje às] LT',
      nextDay: '[Amanhã às] LT',
      nextWeek: 'dddd [às] LT',
      lastDay: '[Ontem às] LT',
      sameElse: 'L',
    },
    relativeTime: {
      future: 'em %s',
      past: 'há %s',
      s: 'poucos segundos',
      ss: '%d segundos',
      m: 'um minuto',
      mm: '%d minutos',
      h: 'uma hora',
      hh: '%d horas',
      d: 'um dia',
      dd: '%d dias',
      M: 'um mês',
      MM: '%d meses',
      y: 'um ano',
      yy: '%d anos',
    },
    dayOfMonthOrdinalParse: /\d{1,2}º/,
    ordinal: '%dº',
  });

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
