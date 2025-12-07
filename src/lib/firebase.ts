import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDuxF-OYcps8e4NudAoexd5Ik6ZcDFgYGw",
    authDomain: "portfolio-website-b6bf2.firebaseapp.com",
    projectId: "portfolio-website-b6bf2",
    storageBucket: "portfolio-website-b6bf2.appspot.com",
    messagingSenderId: "11911323854",
    appId: "1:11911323854:web:3c16316b0760515483f09f",
    measurementId: "G-ZVYTBP6ETD"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
