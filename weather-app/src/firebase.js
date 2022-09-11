// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getFirestore,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2eZr7nTpOmcoH_x3qmzl12-Mofxom8lA",
  authDomain: "weather-api-7c25c.firebaseapp.com",
  projectId: "weather-api-7c25c",
  storageBucket: "weather-api-7c25c.appspot.com",
  messagingSenderId: "193273105204",
  appId: "1:193273105204:web:994463ec7eef8e86f3f361"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)