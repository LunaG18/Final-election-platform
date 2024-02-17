import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBg_IRrHlvqeYcT7PoalUQ_w8SCGmyOSWI",
    authDomain: "votingplatform-10089.firebaseapp.com",
    projectId: "votingplatform-10089",
    storageBucket: "votingplatform-10089.appspot.com",
    messagingSenderId: "783880361527",
    appId: "1:783880361527:web:5f63bc5d534879c5fa91b2",
    measurementId: "G-VVG2TSNXX0"
  };


// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { app, db, auth }