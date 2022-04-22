import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
  User,
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';

import { auth, db } from '../libs/firebase';
import { signInWithGoogle } from './sign-in.service';

export type UserCredential = {
  email: string;
  password: string;
};

export type UserProfile = {
  email?: string;
  name?: string;
};

export type UserProfileAndCredential = UserCredential & UserProfile;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const singUpWithFirebase = async ({
  name,
  email,
  password,
}: UserProfileAndCredential) => {
  const userCredential = await createFireBaseUserWithEmailAndPassword({
    email,
    password,
  });
  const user = userCredential.user;

  await saveUserToDB({ name, email, user });

  if (name) {
    await updateUserProfile(name);
  }
};

export const createUserWithGoogle = async () => {
  const result = await signInWithGoogle();
  const user = result.user;

  if (user && user.displayName) {
    await saveUserToDB({ name: undefined, email: undefined, user });
    await updateUserProfile(user.displayName);
  }
};

const createFireBaseUserWithEmailAndPassword = async ({
  email,
  password,
}: UserCredential) => {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password);
};

const saveUserToDB = async ({ name, email, user }: UserProfile & { user: User }) => {
  const docRef = doc(db, 'users', user.uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    await setDoc(doc(db, 'users', user.uid), {
      name: user.displayName || name,
      email: user.email || email,
      timestamp: serverTimestamp(),
    });
  }
};

const updateUserProfile = async (name: string) => {
  if (auth.currentUser) {
    await updateProfile(auth.currentUser, {
      displayName: name,
    });
  }
};
