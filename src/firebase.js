// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries





// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQCiACol30pppTwkxnRCBVv_uv6xNEIII",
  authDomain: "financely-b2260.firebaseapp.com",
  projectId: "financely-b2260",
  storageBucket: "financely-b2260.appspot.com",
  messagingSenderId: "823090315876",
  appId: "1:823090315876:web:50c4e047eebf0d1acb5571",
  measurementId: "G-8QDQ42Z6BT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };