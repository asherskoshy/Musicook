import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB_fyyxVDDaVO79Kg7pI7Rh9biBgkaCRRA",
  authDomain: "musicook-44fec.firebaseapp.com",
  projectId: "musicook-44fec",
  storageBucket: "musicook-44fec.firebasestorage.app",
  messagingSenderId: "1065799514993",
  appId: "1:1065799514993:web:d00c28f3a77ab91e0394d0",
  measurementId: "G-SD4WR8XCRM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

export default app; 