import { getFirestore } from "firebase/firestore";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAAPrunYsTzztWWP6e-yVPxUfG-5zv1-YU",
  authDomain: "restourant-app-1.firebaseapp.com",
  databaseURL: "https://restourant-app-1-default-rtdb.firebaseio.com",
  projectId: "restourant-app-1",
  storageBucket: "restourant-app-1.appspot.com",
  messagingSenderId: "545941898252",
  appId: "1:545941898252:web:8e564a947bf2b0b6025a29",
  measurementId: "G-QNF2V5D1SL"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };