import firebase from 'react-native-firebase';
import moment from 'moment';

/**
 * Set notification to 1 day before dueDate of bill.
 * Notifications always show on 9:00AM
 *
 * @memberof BillDetail
 */
export const CreateScheduleNotification = async (bill) => {
  const dueDateFormated = moment(bill.dueDate).format('DD/MM/YYYY');
  const notificationObj = new firebase.notifications.Notification()
    .setTitle('Conta perto do vencimento')
    .setBody(
      `Sua conta de ${bill.billType.name} ira vencer dia ${dueDateFormated}`,
    )
    .setNotificationId(bill.id)
    .android.setChannelId('paguei-app')
    .android.setSmallIcon('ic_launcher');

  const fireDate = moment(bill.dueDate)
    .subtract(1, 'days')
    .hour(9)
    .minute(0)
    .valueOf();

  await firebase.notifications().scheduleNotification(notificationObj, {
    fireDate,
  });
};

export const CancelScheduleNotification = async (notificationId) => {
  firebase.notifications().cancelNotification(notificationId);
};
