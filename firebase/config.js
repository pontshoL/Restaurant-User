// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyASghKykcGF8QiGkCKbPxhrplQsBZIwPLo",
  authDomain: "restaurant-app-1abfd.firebaseapp.com",
  projectId: "restaurant-app-1abfd",
  storageBucket: "restaurant-app-1abfd.appspot.com",
  messagingSenderId: "609681681009",
  appId: "1:609681681009:web:ba07a0898f69e5bda789d0",
  measurementId: "G-DEQMCPEF5V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)
const auth = getAuth(app);
const storage = getStorage(app);
export {auth,db,storage};