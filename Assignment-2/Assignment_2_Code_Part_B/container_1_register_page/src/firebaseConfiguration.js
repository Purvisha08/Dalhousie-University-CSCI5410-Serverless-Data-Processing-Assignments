import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfiguration = {
    apiKey: "AIzaSyBYb8LEcn-P4QRNJNJurL-aIM1kB8J2mOA",
    authDomain: "csci5410-8d1b2.firebaseapp.com",
    projectId: "csci5410-8d1b2",
    storageBucket: "csci5410-8d1b2.appspot.com",
    messagingSenderId: "780474588541",
    appId: "1:780474588541:web:934003ea9c752f1ee20014",
    measurementId: "G-8DXWPYT48M"
  };

const app = initializeApp(firebaseConfiguration);
const firestoreDatabase = getFirestore(app);

export default firestoreDatabase