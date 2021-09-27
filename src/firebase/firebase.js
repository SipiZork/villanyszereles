import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const { REACT_APP_FIREBASE_API_KEY } = process.env;

export const firebaseApp = initializeApp({
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: "siposvillany-44891.firebaseapp.com",
  projectId: "siposvillany-44891",
  storageBucket: "siposvillany-44891.appspot.com",
  messagingSenderId: "27377695191",
  appId: "1:27377695191:web:9c79130b0e83054b817392",
  measurementId: "G-2Y4RNXP653"
});

export const db = getFirestore();

export const addCustomer = async (size, rooms, livingroom, kitchen, bathroom,
  hall, phone, email, name, dishwasher, washingmachine, electricoven, dryer,
  typeofwork, zipcode, numberOfRooms, offers, allCircuit) => {
  console.log('name', name);
  const customerData = {
    newCustomer: true, callBack: false, size, rooms, livingroom, kitchen, bathroom,
    hall, phone, email, name, dishwasher, washingmachine,
    electricoven, dryer, typeofwork, zipcode, numberOfRooms, offers, allCircuit
  }
  const customersRef = doc(collection(db, 'customers'));
  await setDoc(customersRef, customerData);
};

export default firebaseApp;