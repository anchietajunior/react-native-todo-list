import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Suas configurações do Firebase aqui
const firebaseConfig = {
  // Cole aqui as configurações do seu projeto Firebase
  // Você pode encontrar essas informações no console do Firebase
  // Project Settings > General > Your apps > Web app (</>)
  apiKey: "AIzaSyAh8lTHFtpc-t-QhlbEe-c48R88mNaaAaQ",
    authDomain: "uniriostodo.firebaseapp.com",
    projectId: "uniriostodo",
    storageBucket: "uniriostodo.firebasestorage.app",
    messagingSenderId: "56290243431",
    appId: "1:56290243431:web:febe3e937dcf8a3dc135c2",
    measurementId: "G-ZGKL29HHP9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 