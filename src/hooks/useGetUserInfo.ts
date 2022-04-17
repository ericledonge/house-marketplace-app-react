import { Dispatch, SetStateAction, useState } from 'react';

import { auth } from '../libs/firebase';

type UserInfo = {
  name: string;
  displayName: string | null | undefined;
  email: string;
  setUserInfo: Dispatch<SetStateAction<{ name: string; email: string }>>;
};

export const useGetUserInfo = (): UserInfo => {
  const [userInfo, setUserInfo] = useState({
    name: auth.currentUser?.displayName || '',
    email: auth.currentUser?.email || '',
  });

  const displayName = auth.currentUser?.displayName;

  const { name, email } = userInfo;

  return { name, displayName, email, setUserInfo };
};
