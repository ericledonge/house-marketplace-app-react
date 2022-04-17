import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

import { auth, db } from '../libs/firebase';

export const updateUserProfile = async (name: string): Promise<void> => {
  if (auth.currentUser) {
    await updateProfile(auth.currentUser, {
      displayName: name,
    });

    const userRef = doc(db, 'users', auth.currentUser.uid);
    await updateDoc(userRef, {
      name,
    });
  }
};
