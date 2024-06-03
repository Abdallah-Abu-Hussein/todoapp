import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAOJrhS485szIODB0BTKqcAswGuPhhoOW8",
  authDomain: "todo-6885d.firebaseapp.com",
  projectId: "todo-6885d",
  storageBucket: "todo-6885d.appspot.com",
  messagingSenderId: "633188836323",
  appId: "1:633188836323:web:b5cabeb3a461e57e4276d6"
};

export const app = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(app);
export const FIREBASE_AUTH = getAuth(app)
