import firebase from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCOZwBeFDPCHd2CQStqsAUGY5kvzcfhVBg",
  authDomain: "fb-pcstore.firebaseapp.com",
  projectId: "fb-pcstore",
  storageBucket: "fb-pcstore.appspot.com",
  messagingSenderId: "788028218905",
  appId: "1:788028218905:web:67aeffbeccca3eb1d79488",
};
// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig);
export const dataBase = Firebase.firestore();
