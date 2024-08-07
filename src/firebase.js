// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6sbHcCerN5xBtem_Y8z0Lmmvjjx-Lmqw",
  authDomain: "recetar-26802.firebaseapp.com",
  projectId: "recetar-26802",
  storageBucket: "recetar-26802.appspot.com",
  messagingSenderId: "704702826543",
  appId: "1:704702826543:web:eb6862ceb0de9f19c81eda",
  measurementId: "G-VDMGB7YXFB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const firestore = getFirestore(app);