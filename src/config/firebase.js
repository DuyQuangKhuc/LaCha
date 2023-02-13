import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

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
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {auth,provider};