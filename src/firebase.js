import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBLEuETVSJJBzZWZtKtBde-u4wE_o0cKL4",
  authDomain: "pgsih-dec70.firebaseapp.com",
  projectId: "pgsih-dec70",
  storageBucket: "pgsih-dec70.appspot.com",
  messagingSenderId: "374378740369",
  appId: "1:374378740369:web:112dd52fe2ba0696ac1d30",
  measurementId: "G-6LPW8GRECG"
};

// Initialize Firebase
const app=firebase.initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

export const firebaseAuth=firebase.auth();
export const storage=getStorage(app);

export default firebase;