import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCQrb88WqvpQFHRfIWeAM3umAN6RJFPMb8",
  authDomain: "garments-6bb93.firebaseapp.com",
  projectId: "garments-6bb93",
  storageBucket: "garments-6bb93.firebasestorage.app",
  messagingSenderId: "117909003744",
  appId: "1:117909003744:web:a2587aae86298705951f85",
  measurementId: "G-N0S945Y0JW"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);

export default app;
