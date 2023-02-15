import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAp7q2T07VOPchctK0RVVFfdNU9KAjo1Uc",
  authDomain: "lachagarden.firebaseapp.com",
  projectId: "lachagarden",
  storageBucket: "lachagarden.appspot.com",
  messagingSenderId: "904516436073",
  appId: "1:904516436073:web:a348ba6fac45f5076c62f8",
  measurementId: "G-HMF1YHRT6P"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();