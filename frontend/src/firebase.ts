import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBREjk7pV-3ZcUvwJjPqmNGF9lJ_4RB7ZU",
  authDomain: "project-streamline-auth.firebaseapp.com",
  projectId: "project-streamline-auth",
  storageBucket: "project-streamline-auth.firebasestorage.app",
  messagingSenderId: "1071331161645",
  appId: "1:1071331161645:web:31bd1aacedb3262b9c6aa4",
};

const app = initializeApp(firebaseConfig);

// Export auth instance
export const auth = getAuth(app);
