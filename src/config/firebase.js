import { initializeApp } from 'firebase/app';
import { getAuth, browserLocalPersistence, setPersistence } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyCQrb88WqvpQFHRfIWeAM3umAN6RJFPMb8',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'garments-6bb93.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'garments-6bb93',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'garments-6bb93.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '117909003744',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:117909003744:web:a2587aae86298705951f85'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence
export const auth = getAuth(app);

// Set persistence to local (survives browser restart)
setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error('Auth persistence error:', error);
  });

export default app;
