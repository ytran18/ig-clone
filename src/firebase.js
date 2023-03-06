import { initializeApp } from "firebase/app"
import { getDatabase, ref } from "firebase/database"
import "firebase/compat/auth"
import "firebase/auth"
import "firebase/storage"
import "firebase/analytics"
import "firebase/performance"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyD31N1I7DTgAU4YuxY95KJgeZxPrDgD3YU",
    authDomain: "ig-clone-6d3e1.firebaseapp.com",
    databaseURL: "https://ig-clone-6d3e1-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ig-clone-6d3e1",
    storageBucket: "ig-clone-6d3e1.appspot.com",
    messagingSenderId: "1065885857238",
    appId: "1:1065885857238:web:72a46e73e2ed794a1b6077",
    measurementId: "G-6EDNCQ2NR0"
  };

//   init firebase

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getDatabase(app)
const storage = getStorage(app)

export {app, auth, db, storage}