import React, { SyntheticEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import googleIcon from '../../resources/assets/svg/googleIcon.svg';
import { signInWithGoogle } from '../services/sign-in.service';
import { createUserWithGoogle } from '../services/sign-up.service';

const GoogleAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isUpOrIn = location.pathname === '/sign-up' ? 'up' : 'in';

  const handleClick = async (e: SyntheticEvent) => {
    if (isUpOrIn === 'up') {
      try {
        await createUserWithGoogle();
        navigate('/');
      } catch (error) {
        toast.error('Could not sing up with Google');
      }
    }

    if (isUpOrIn === 'in') {
      try {
        await signInWithGoogle();
        navigate('/');
      } catch (error) {
        toast.error('Could not sing in with Google');
      }
    }
  };

  return (
    <div className="socialLogin">
      <p>Sign {isUpOrIn} with</p>

      <button className="socialIconDiv" onClick={handleClick}>
        <img src={googleIcon} alt="Google" className="socialIconImg" />
      </button>
    </div>
  );
};

export default GoogleAuth;
