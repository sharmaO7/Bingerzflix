// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAez0Gph-uQ32sCjnp2aniwAX8dqM1ctXY",
  authDomain: "bingerzflix.firebaseapp.com",
  projectId: "bingerzflix",
  storageBucket: "bingerzflix.appspot.com",
  messagingSenderId: "379043831982",
  appId: "1:379043831982:web:0b8e5a87599571f91b8d3f",
  measurementId: "G-4T6Z29ELJE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();