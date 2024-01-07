import { initializeApp, getApp, getApps } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    // Your Firebase configuration here
    apiKey: "AIzaSyACCC38h8w3V6sLDCgDx5taf41CaqAtjsc",
    authDomain: "perfectchat-1dc66.firebaseapp.com",
    databaseURL: "https://perfectchat-1dc66-default-rtdb.firebaseio.com",
    projectId: "perfectchat-1dc66",
    storageBucket: "perfectchat-1dc66.appspot.com",
    messagingSenderId: "137058990652",
    appId: "1:137058990652:web:389d412658aa3766b4a139",
    measurementId: "G-6J7PD9KM95"

};
let app;

if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}

export const db = getDatabase(app);