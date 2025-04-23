import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

export const firebaseConfig = {
  apiKey: "AIzaSyAAl3mVOQKa0rEesixiftQ4H3TQP_0FXCU",
  authDomain: "portafolio-1110a.firebaseapp.com",
  projectId: "portafolio-1110a",
  storageBucket: "portafolio-1110a.firebasestorage.app",
  messagingSenderId: "103294635951",
  appId: "1:103294635951:web:4cb1d47b67980334f1295a",
  measurementId: "G-Z8L350HRNJ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);