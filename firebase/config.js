import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCbbtGjnszRIUR8SEdgEOxZa8kAR9o_eug",
  authDomain: "e-learning-981e1.firebaseapp.com",
  projectId: "e-learning-981e1",
  storageBucket: "e-learning-981e1.appspot.com",
  messagingSenderId: "741278426313",
  appId: "1:741278426313:web:aed66d39b8f53355935918"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);