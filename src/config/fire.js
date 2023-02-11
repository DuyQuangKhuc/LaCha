import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, GithubAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAp7q2T07VOPchctK0RVVFfdNU9KAjo1Uc",
  authDomain: "lachagarden.firebaseapp.com",
  projectId: "lachagarden",
  storageBucket: "lachagarden.appspot.com",
  messagingSenderId: "904516436073",
  appId: "1:904516436073:web:a348ba6fac45f5076c62f8",
  measurementId: "G-HMF1YHRT6P"
};

initializeApp(firebaseConfig);
export const auth = getAuth()
export const google = new GoogleAuthProvider()
// export const facebook = new FacebookAuthProvider()
// export const twitter = new TwitterAuthProvider()
// export const github = new GithubAuthProvider()