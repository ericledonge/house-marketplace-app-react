import { auth } from '../libs/firebase';

export const signOut = async (): Promise<void> => {
  await auth.signOut();
};
