import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc, writeBatch  } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3bPjoEWShUOoRbqLZHMtk61muIJDEaCU",
  authDomain: "financely-96542.firebaseapp.com",
  projectId: "financely-96542",
  storageBucket: "financely-96542.appspot.com",
  messagingSenderId: "931205186977",
  appId: "1:931205186977:web:6e86424046f0b59cd677e0",
  measurementId: "G-3ZCDPBZV6Z"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc, writeBatch };