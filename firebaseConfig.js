// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOvR5zdtIM9oaI-kdQ554kSl652eLAQZE",
  authDomain: "ajc-tasker-dev1.firebaseapp.com",
  projectId: "ajc-tasker-dev1",
  storageBucket: "ajc-tasker-dev1.firebasestorage.app",
  messagingSenderId: "171536641375",
  appId: "1:171536641375:web:4f83ccaa8c022f1966daea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)