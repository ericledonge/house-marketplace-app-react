import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: 'AIzaSyCnYclqpfdUfG5LaAj3qETBTTDOC3Agnjk',
  authDomain: 'house-marketplace-app-f20fb.firebaseapp.com',
  projectId: 'house-marketplace-app-f20fb',
  storageBucket: 'house-marketplace-app-f20fb.appspot.com',
  messagingSenderId: '450151090160',
  appId: '1:450151090160:web:f7a55d1fe0fc5a45273f35',
};

const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

export const googleProvider = new GoogleAuthProvider();
