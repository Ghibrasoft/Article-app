import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBx1QjMKy67foZQ643EF28YRLDMcAYdSMo",
  authDomain: "article-app-7320d.firebaseapp.com",
  projectId: "article-app-7320d",
  storageBucket: "article-app-7320d.appspot.com",
  messagingSenderId: "200633612218",
  appId: "1:200633612218:web:01aff59c2cccdaca5acf83",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export {auth, db, storage};