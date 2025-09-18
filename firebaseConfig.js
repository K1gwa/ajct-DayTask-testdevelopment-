// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3WNuRze9lcNEjuOjBDoZg4kUqdREWwDc",
  authDomain: "zen0-tracker.firebaseapp.com",
  projectId: "zen0-tracker",
  storageBucket: "zen0-tracker.firebasestorage.app",
  messagingSenderId: "39985872102",
  appId: "1:39985872102:web:ec87d481bf4ea4568d0f27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)