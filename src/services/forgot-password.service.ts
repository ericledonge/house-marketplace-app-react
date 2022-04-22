import { sendPasswordResetEmail } from 'firebase/auth';

import { auth } from '../libs/firebase';

export const sendForgotPassword = async (email: string) => {
  return sendPasswordResetEmail(auth, email);
};
