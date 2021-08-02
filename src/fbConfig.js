import firebase from 'firebase';

import 'firebase/firebase-auth';
import 'firebase/firebase-firestore';
import 'firebase/firebase-storage';

export const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDTEdGsWaFMAqWlHAUoMaM_k5guDFJKJW4",
    authDomain: "jecvoting.firebaseapp.com",
    projectId: "jecvoting",
    storageBucket: "jecvoting.appspot.com",
    messagingSenderId: "195851903470",
    appId: "1:195851903470:web:a4c11acb64c8c4517f6eff",
    measurementId: "G-PJ3K4YLGJM"
})