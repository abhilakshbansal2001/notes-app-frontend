import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";



const firebaseConfig = {
    apiKey: "AIzaSyCkxfWc-eqbcss7yjaRqYyuAd34x4YcZkY",
    authDomain: "virtualnote-35254.firebaseapp.com",
    databaseURL: "https://virtualnote-35254.firebaseio.com",
    projectId: "virtualnote-35254",
    storageBucket: "virtualnote-35254.appspot.com",
    messagingSenderId: "611746800725",
    appId: "1:611746800725:web:4c00348e546c0f98ce60dc",
    measurementId: "G-76FXSCSYKL"
  };


  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth()

  export {auth}