// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjql6HUvhUo7m1miAJoRgzLHW3bJVOyQw",
  authDomain: "enivesh-cloud.firebaseapp.com",
  databaseURL:
    "https://enivesh-cloud-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "enivesh-cloud",
  storageBucket: "enivesh-cloud.appspot.com",
  messagingSenderId: "966140757385",
  appId: "1:966140757385:web:0dec3b797dc453a45a4d58",
  measurementId: "G-1ZZ5EW75Q9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const database = getDatabase(app);
const storage = getStorage(app);
const authentication = getAuth(app);

export { firestore, database, storage, analytics, app, authentication };
