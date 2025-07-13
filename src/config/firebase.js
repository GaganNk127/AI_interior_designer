
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCS5P8rSRwjXbn2HMjLvxx872vTWrG_CbE",
  authDomain: "airooms-52eee.firebaseapp.com",
  projectId: "airooms-52eee",
  storageBucket: "airooms-52eee.firebasestorage.app",
  messagingSenderId: "327972314792",
  appId: "1:327972314792:web:932443d2203d0f6070ec9d",
  measurementId: "G-J394ZW7VML"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const autho = getAuth(app);
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app); 
