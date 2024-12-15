// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVkWGwvtPvyUaRvXUwSgOpm6Dpzr16EPE",
  authDomain: "greenhouse-monitoring-acb4f.firebaseapp.com",
  databaseURL: "https://greenhouse-monitoring-acb4f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "greenhouse-monitoring-acb4f",
  storageBucket: "greenhouse-monitoring-acb4f.firebasestorage.app",
  messagingSenderId: "807492928780",
  appId: "1:807492928780:web:171586daa6a7bb4be17529",
  measurementId: "G-WEMH2FRFB0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);