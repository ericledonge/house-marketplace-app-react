import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useRef, useState } from 'react';

import { auth } from '../libs/firebase';

const useAuthStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsLoggedIn(true);
        }
        setIsCheckingStatus(false);
      });
    }

    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  return {
    isLoggedIn,
    isCheckingStatus,
  };
};

export default useAuthStatus;
