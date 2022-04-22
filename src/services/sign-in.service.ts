import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

import { auth, googleProvider } from '../libs/firebase';
import { UserCredential } from './sign-up.service';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const signInWithFirebase = async ({ email, password }: UserCredential) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const signInWithGoogle = async () => {
  return signInWithPopup(auth, googleProvider);
};
