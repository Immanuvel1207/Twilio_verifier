
// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyASl0xWC1YKUzGEpIbkVPITV9eKznlwqYY",
    authDomain: "phone-verification-faaa4.firebaseapp.com",
    projectId: "phone-verification-faaa4",
    storageBucket: "phone-verification-faaa4.appspot.com",
    messagingSenderId: "159438742701",
    appId: "1:159438742701:web:c43a10a902ce68358e1224",
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);

