import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTO2tmKq45BMr1NHbWKcOpxWBVQvLnICg",
  authDomain: "ecommerce-web-99b69.firebaseapp.com",
  projectId: "ecommerce-web-99b69",
  storageBucket: "ecommerce-web-99b69.appspot.com",
  messagingSenderId: "310757610773",
  appId: "1:310757610773:web:504b93681a6a0674ce851c",
  measurementId: "G-NQHLQ7TWYN"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };
export default app;
