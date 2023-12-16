import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAoRkiObkXnCmLLXTTmyJ3bqLLHPmmsbGQ",
    authDomain: "instagram-clone-6ca6e.firebaseapp.com",
    projectId: "instagram-clone-6ca6e",
    storageBucket: "instagram-clone-6ca6e.appspot.com",
    messagingSenderId: "800860798199",
    appId: "1:800860798199:web:3dcfff77cd69f3f40e27f2",
    measurementId: "G-CK302L575K"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };