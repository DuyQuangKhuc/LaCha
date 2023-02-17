import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { getMessaging, getToken } from "firebase/messaging";

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
export const storage = getStorage(app);


function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      const app = initializeApp(firebaseConfig);
      
      const messaging = getMessaging(app);
      getToken(messaging, {
        vapidKey:
          "BPXxYXdfdlcvx_PGjjM6QUson0u4BSZQ1pA38rBQ5wg7H5xRUoSAHe0HmcYvCvJ5r2BrIvukonr2LNi99a1i9XY",
      }).then((currentToken) => {
        if (currentToken) {
          console.log("currentToken: ", currentToken);
          
        } else {
          console.log("Can not get token");
        }
      });
    } else {
      console.log("Do not have permission!");
    }
  });
}

requestPermission();
