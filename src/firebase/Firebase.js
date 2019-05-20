// Initialize Firebase
import firebase from "firebase/app";
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyBIjNqU2ZYC0fX8Y3QGuUkSNGvb3--dLf8",
    authDomain: "quichshop.firebaseapp.com",
    databaseURL: "https://quichshop.firebaseio.com",
    projectId: "quichshop",
    storageBucket: "quichshop.appspot.com",
    messagingSenderId: "646329478599"
};
firebase.initializeApp(config);
const storage = firebase.storage();

export {
    storage ,firebase as default
}
