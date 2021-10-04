
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDQB-WmJQIYv3Oc2UJF1hnvc2quIajEg9Q",
  authDomain: "moonshinewebsite21.firebaseapp.com",
  projectId: "moonshinewebsite21",
  storageBucket: "moonshinewebsite21.appspot.com",
  messagingSenderId: "667557371509",
  appId: "1:667557371509:web:4b5910c35b7c9a8017e23c",
  measurementId: "G-ERCHZ5G6LN"
};

const app = initializeApp(firebaseConfig);

export default getFirestore()