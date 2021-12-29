import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyA-Bgv0OJyEoKbLYGU8xPdcYjdASOLNazI",
    authDomain: "db-hvnn-images.firebaseapp.com",
    projectId: "db-hvnn-images",
    storageBucket: "db-hvnn-images.appspot.com",
    messagingSenderId: "784929248443",
    appId: "1:784929248443:web:5d5f8f4e2b742f0832c59e",
    measurementId: "G-QCDE5YG16F",
};
firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();
export default storage;
