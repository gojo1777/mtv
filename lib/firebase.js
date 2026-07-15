import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDmMAV2QXHxR8c_2vLMt9JgO5KlLH971Ek",
  authDomain: "movie-7fae6.firebaseapp.com",
  projectId: "movie-7fae6",
  storageBucket: "movie-7fae6.firebasestorage.app",
  messagingSenderId: "659548876964",
  appId: "1:659548876964:web:b4f820126cea5912127631",
  measurementId: "G-B92KHJ2VEZ"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { app, auth, storage, db };
