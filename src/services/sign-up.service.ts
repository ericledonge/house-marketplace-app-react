import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
  User,
} from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

import { auth, db } from '../main';

export type UserCredential = {
  email: string;
  password: string;
};

type SignUpProps = UserCredential & {
  name: string;
};

type createFireBaseUserWithEmailAndPasswordProps = Pick<
  SignUpProps,
  'email' | 'password'
>;

type saveFireBaseUserToDBProps = Pick<SignUpProps, 'name' | 'email'> & { user: User };

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const singUp = async ({ name, email, password }: SignUpProps) => {
  const userCredential = await createFireBaseUserWithEmailAndPassword({
    email,
    password,
  });
  const user = userCredential.user;

  await saveFireBaseUserToDB({ name, email, user });

  if (auth.currentUser) {
    await updateProfile(auth.currentUser, {
      displayName: name,
    });
  }
};

const createFireBaseUserWithEmailAndPassword = async ({
  email,
  password,
}: createFireBaseUserWithEmailAndPasswordProps) => {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password);
};

const saveFireBaseUserToDB = async ({ name, email, user }: saveFireBaseUserToDBProps) => {
  await setDoc(doc(db, 'users', user.uid), {
    name,
    email,
    timestamp: serverTimestamp(),
  });
};
