import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDRFd8GhhQvWSNE68J9nJ6LqYfou_MNZdM",
  authDomain: "skills-hub-anwar.firebaseapp.com",
  projectId: "skills-hub-anwar",
  storageBucket: "skills-hub-anwar.appspot.com",
  messagingSenderId: "299113781443",
  appId: "1:299113781443:web:a77b7f8792d2ad2cc72a76"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);