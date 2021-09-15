// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBy4oUwzsABADQllB6gT_9aQOqBYR5WGI0",
  authDomain: "unichat-35ef0.firebaseapp.com",
  projectId: "unichat-35ef0",
  storageBucket: "unichat-35ef0.appspot.com",
  messagingSenderId: "858321918638",
  appId: "1:858321918638:web:906bdcfc2578693658ab3f",
  measurementId: "G-7KDHEW6DMT",
};

// Initialize Firebase
const auth = initializeApp(firebaseConfig).auth();
export default auth;
