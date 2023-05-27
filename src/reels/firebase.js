// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// import firebase from "firebase";
// import firebase from 'firebase/compat/app';
// import { initializeApp } from "firebase/app";
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
import 'firebase/compat/storage';
const firebaseConfig = {
    apiKey: "AIzaSyATSyUFC_ob2FKwCtPvt3SzFTxIT_xNBmQ",
    authDomain: "ig-reels-ec178.firebaseapp.com",
    projectId: "ig-reels-ec178",
    storageBucket: "ig-reels-ec178.appspot.com",
    messagingSenderId: "550613373452",
    appId: "1:550613373452:web:598230e02a8c26fe90d429",
    measurementId: "G-S0XC7LDLD6"
  };
  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  export default db;