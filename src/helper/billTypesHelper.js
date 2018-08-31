import Store from 'react-native-fs-store';
import firebase from 'react-native-firebase';

const BILLS_STORAGE_ID = '_BILL_TYPES_STORAGE';
const AsyncStorage = new Store('default');

export const BILL_TYPE_MODEL = {
  icon: '',
  name: '',
};

export const GetBillTypesFromFirebase = async () => {
  console.log('Get BillTypes from Firebase');

  const billTypes = await firebase
    .firestore()
    .collection('config')
    .doc('default')
    .get();

  await AsyncStorage.setItem(
    BILLS_STORAGE_ID,
    JSON.stringify(billTypes.get('billType')),
  );
  return billTypes.get('billType');
};

export const GetBillTypes = async () => {
  try {
    let billTypesStorage = await AsyncStorage.getItem(BILLS_STORAGE_ID);

    if (billTypesStorage && billTypesStorage.length > 0) billTypesStorage = JSON.parse(billTypesStorage);
    else billTypesStorage = [];

    if (billTypesStorage.length === 0) {
      billTypesStorage = await GetBillTypesFromFirebase();
    }

    if (billTypesStorage && billTypesStorage.length > 0) {
      billTypesStorage.sort((billType1, billType2) => {
        if (billType1.name > billType2.name) return 1;
        if (billType1.name < billType2.name) return -1;
        return 0;
      });
    }

    return billTypesStorage;
  } catch (error) {
    console.log('error storage');
    console.log(error);
    return [];
  }
};
