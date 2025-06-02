// cf.firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where, WhereFilterOp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDNy1EfIMLlmprIf47xpcuDEuuA2GKhseU",
  authDomain: "open-numeric.firebaseapp.com",
  projectId: "open-numeric",
  storageBucket: "open-numeric.appspot.com",
  messagingSenderId: "329212134656",
  appId: "1:329212134656:web:9df9a0b2c2b45f795a5fe5",
  measurementId: "G-W33E6WLHRP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, getDocs, query, where };
export type { WhereFilterOp };