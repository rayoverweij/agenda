import firebase from 'firebase/app';

import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDkBVEKsvocYgwyg3ZBWN5w7NzvNq7RBRw",
    authDomain: "rayo-agenda.firebaseapp.com",
    databaseURL: "https://rayo-agenda.firebaseio.com",
    projectId: "rayo-agenda",
    storageBucket: "rayo-agenda.appspot.com",
    messagingSenderId: "206004637965",
    appId: "1:206004637965:web:11d3a987b51fb49f2e6044",
    measurementId: "G-3WTF7G7K5R"
};

firebase.initializeApp(firebaseConfig);

export default firebase;