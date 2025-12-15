// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAtSzmmdfAgm_al9nay1Wc6P6f24_ruAPU",
    authDomain: "lbo-website-35a76.firebaseapp.com",
    databaseURL: "https://lbo-website-35a76-default-rtdb.firebaseio.com",
    projectId: "lbo-website-35a76",
    storageBucket: "lbo-website-35a76.firebasestorage.app",
    messagingSenderId: "87614023736",
    appId: "1:87614023736:web:708bcbf6d191db53b95ecd",
    measurementId: "G-MK8KSFCXCE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Enable offline persistence (Disabled for debugging)
/*
enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
        console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
        console.warn('The current browser does not support all of the features required to enable persistence.');
    }
});
*/

export const storage = getStorage(app);
export const auth = getAuth(app);
export default app;