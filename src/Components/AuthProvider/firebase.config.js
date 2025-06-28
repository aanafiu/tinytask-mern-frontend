// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDatQZ39TyRUj9M055-pibB5_tjqTNdqQk",
  authDomain: "tinytask-mern.firebaseapp.com",
  projectId: "tinytask-mern",
  storageBucket: "tinytask-mern.firebasestorage.app",
  messagingSenderId: "51819651218",
  appId: "1:51819651218:web:878872d1486d6f3b89064b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;