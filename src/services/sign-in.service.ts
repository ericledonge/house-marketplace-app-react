import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../libs/firebase';
import { UserCredential } from './sign-up.service';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const signIn = async ({ email, password }: UserCredential) => {
  return signInWithEmailAndPassword(auth, email, password);
};
