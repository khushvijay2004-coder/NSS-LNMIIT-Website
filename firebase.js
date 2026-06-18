// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAeF27tfqm3SgbMP3Tfi8d87m0RVbppapk",
    authDomain: "nss-app-29eca.firebaseapp.com",
    projectId: "nss-app-29eca",
    storageBucket: "nss-app-29eca.firebasestorage.app",
    messagingSenderId: "393677173229",
    appId: "1:393677173229:web:ac58d061918fbf6fce77e4",
    measurementId: "G-795NKB3FFW",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
