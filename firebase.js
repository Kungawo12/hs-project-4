// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGxbvG-vlXg5mzdzgh2wzfyGcco_5DGqk",
  authDomain: "flashcard-min.firebaseapp.com",
  projectId: "flashcard-min",
  storageBucket: "flashcard-min.appspot.com",
  messagingSenderId: "268082538266",
  appId: "1:268082538266:web:213878517c620daf47aea3",
  measurementId: "G-RPEVP2P6HK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export {db}