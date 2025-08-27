// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmLQmv9Tr-NDh9utbdRkdMjdCnxrt5GOs",
  authDomain: "dsva-c1598.firebaseapp.com",
  projectId: "dsva-c1598",
  storageBucket: "dsva-c1598.firebasestorage.app",
  messagingSenderId: "457250853003",
  appId: "1:457250853003:web:1674d875ab2422118c848e",
  measurementId: "G-GFSF8MWQMJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);