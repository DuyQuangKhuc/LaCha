import { getApp,  getApps, initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAp7q2T07VOPchctK0RVVFfdNU9KAjo1Uc",
  authDomain: "lachagarden.firebaseapp.com",
  databaseURL: "https://lachagarden-default-rtdb.firebaseio.com",
  projectId: "lachagarden",
  storageBucket: "lachagarden.appspot.com",
  messagingSenderId: "904516436073",
  appId: "1:904516436073:web:a348ba6fac45f5076c62f8",
  measurementId: "G-HMF1YHRT6P"
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export {app, firestore, storage};