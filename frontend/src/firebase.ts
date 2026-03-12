import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDWDlTDJYs_uczHgSGCQA1t8KfWzs737bY",
  authDomain: "streamline-77320.firebaseapp.com",
  projectId: "streamline-77320",
  storageBucket: "streamline-77320.firebasestorage.app",
  messagingSenderId: "744908411681",
  appId: "1:744908411681:web:4dcfbd29cb6f92f9c2a460",
  measurementId: "G-K53PKKFXB6",
};

const app = initializeApp(firebaseConfig);

// Export auth instance
export const auth = getAuth(app);
