import Store from 'react-native-fs-store';
import moment from 'moment';

import {
  CreateScheduleNotification,
  CancelScheduleNotification,
} from './notificationHelper';

const BILLS_STORAGE_ID = '_BILLS_STORAGE';
const AsyncStorage = new Store('default');

export const BILL_MODEL = {
  id: '',
  dueDate: new Date(),
  billType: {},
  description: '',
  value: 0.0,
  notify: false,
  repeat: false,
};

export const GetBills = async (sortDate) => {
  try {
    let billsStorage = await AsyncStorage.getItem(BILLS_STORAGE_ID);

    if (billsStorage && billsStorage.length > 0) billsStorage = JSON.parse(billsStorage);
    else billsStorage = [];

    if (billsStorage && billsStorage.length > 0) {
      if (sortDate) {
        billsStorage.sort((bill1, bill2) => {
          const momentA = moment(bill1.dueDate);
          const momentB = moment(bill2.dueDate);
          if (momentA > momentB) return 1;
          if (momentA < momentB) return -1;
          return 0;
        });
      }
    }

    return billsStorage;
  } catch (error) {
    console.log('error storage');
    console.log(error);
    return [];
  }
};

export const validateForm = (bill) => {
  const inputError = {};

  if (!bill.description || bill.description.length === 0) {
    inputError.description = true;
  }
  if (!bill.value || bill.value === 0 || bill.value === '0') {
    inputError.value = true;
  }
  if (!bill.billType || Object.keys(bill.billType).length === 0) {
    inputError.billType = true;
  }

  if (Object.keys(inputError).length > 0) {
    return inputError;
  }

  return {};
};

export const PersistBill = async (bill) => {
  try {
    const formValid = validateForm(bill);

    const billSave = Object.assign({}, bill);
    billSave.value = billSave.value
      .toString()
      .replace('R$', '')
      .trim();

    if (formValid instanceof Object && Object.keys(formValid).length > 0) {
      return {
        error: formValid,
      };
    }

    let billsStorage = await GetBills();

    if (!billSave.id || billSave.id === '') {
      billSave.id = moment()
        .valueOf()
        .toString();
    } else {
      // remove exists bill from storaged bills
      billsStorage = billsStorage.filter(
        billSelected => billSelected.id !== billSave.id,
      );
      await CancelScheduleNotification(billSave.id);
    }
    billsStorage.push(billSave);
    await AsyncStorage.setItem(BILLS_STORAGE_ID, JSON.stringify(billsStorage));

    if (bill.notify) {
      await CreateScheduleNotification(billSave);
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const RemoveBill = async (billId) => {
  try {
    let storageBills = await GetBills();

    storageBills = storageBills.filter(bill => bill.id !== billId);
    await AsyncStorage.setItem(BILLS_STORAGE_ID, JSON.stringify(storageBills));
    await CancelScheduleNotification(billId);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const UpdateBillsDueDate = async () => {
  try {
    const storageBills = await GetBills();

    if (storageBills.length > 0) {
      const updatedBills = storageBills.map((bill) => {
        if (bill.repeat && moment(bill.dueDate) < moment()) {
          // update bill due date
          bill.dueDate = moment(bill.dueDate).add(1, 'M');
        }

        return bill;
      });

      await AsyncStorage.setItem(
        BILLS_STORAGE_ID,
        JSON.stringify(updatedBills),
      );
    }

    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
};
