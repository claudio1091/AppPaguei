export const MomentPtBr = {
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
};