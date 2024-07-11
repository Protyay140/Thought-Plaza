// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blogspot-94c26.firebaseapp.com",
  projectId: "blogspot-94c26",
  storageBucket: "blogspot-94c26.appspot.com",
  messagingSenderId: "731976391002",
  appId: "1:731976391002:web:506bc6febff2093f797b63"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
