// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASwbOMyuiEFFG45rFFUABhg9uBX3VEGMM",
  authDomain: "codepen-688f2.firebaseapp.com",
  projectId: "codepen-688f2",
  storageBucket: "codepen-688f2.appspot.com",
  messagingSenderId: "1095744877640",
  appId: "1:1095744877640:web:21d085225f7387e1f1147d",
  measurementId: "G-LE7QD2E9XD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);