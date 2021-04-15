

import  firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCQGfjUN65NsmAijeo6yfFQO0C9CiPMIeQ",
    authDomain: "burger-app-94815.firebaseapp.com",
    projectId: "burger-app-94815",
    storageBucket: "burger-app-94815.appspot.com",
    messagingSenderId: "1016989182693",
    appId: "1:1016989182693:web:0b873b5a42042d1233020c",
    measurementId: "G-YYRNKJ5V4H"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;