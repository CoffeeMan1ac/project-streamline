import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

const firebaseConfig = {
  apiKey: "AIzaSyDIowfi9XS-bYj9L4Igd5l7UasvbA7taK0",
  authDomain: "streamline-488500.firebaseapp.com",
  projectId: "streamline-488500",
  storageBucket: "streamline-488500.firebasestorage.app",
  messagingSenderId: "312037930726",
  appId: "1:312037930726:web:090f8814d6045b9e6d6d27",
};

const app: FirebaseApp = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
