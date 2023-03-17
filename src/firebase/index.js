import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCrucl7h9kwCKZLZWWr8rjPBktyQSwBt2w",
  authDomain: "management-gts.firebaseapp.com",
  projectId: "management-gts",
  storageBucket: "management-gts.appspot.com",
  messagingSenderId: "484043874860",
  appId: "1:484043874860:web:b7bc9b390c0747d6996789"
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

const db = getFirestore(app)


export { auth, db }
  




