import firebase from 'firebase/compat/app';
import'firebase/compat/analytics';
import'firebase/compat/auth';
import'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDlvkDwbZjUZARPbqISdxlXO-Ujwd6KuAM",
    authDomain: "zalochat-ae61b.firebaseapp.com",
    databaseURL: "https://zalochat-ae61b-default-rtdb.firebaseio.com",
    projectId: "zalochat-ae61b",
    storageBucket: "zalochat-ae61b.appspot.com",
    messagingSenderId: "214148542606",
    appId: "1:214148542606:web:60d7808aefddf4e5c8d9df",
    measurementId: "G-427CB058PJ"
  };

  firebase.initializeApp(firebaseConfig)
  firebase.analytics();

  const auth = firebase.auth();
  const db = firebase.firestore();

  export {db , auth};
  export default firebase;