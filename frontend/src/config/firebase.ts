import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBI7hdDaXtQIfGiZASGuUWBhSBy4BpnMj4",
  authDomain: "project-streamline-d19e1.firebaseapp.com",
  projectId: "project-streamline-d19e1",
  storageBucket: "project-streamline-d19e1.firebasestorage.app",
  messagingSenderId: "284496053223",
  appId: "1:284496053223:web:e1b30c6f2d3ddcf3ad3342",
  measurementId: "G-8DWC5BJF7K",
};

const app: FirebaseApp = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
