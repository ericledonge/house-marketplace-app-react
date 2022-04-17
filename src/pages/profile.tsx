import React, { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useGetUserInfo } from '../hooks/useGetUserInfo';
import { signOut } from '../services/sign-out.service';
import { updateUserProfile } from '../services/update-profile.service';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Profile = () => {
  const { name, displayName, email, setUserInfo } = useGetUserInfo();
  const [isChangeMode, setIsChangeMode] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const handleSubmit = async () => {
    try {
      if (displayName !== name) {
        await updateUserProfile(name);
      }
    } catch (error) {
      toast.error('Could not update profile details');
    }
  };

  const handleChange = (e: SyntheticEvent) => {
    setUserInfo((prevState) => ({
      ...prevState,
      // @ts-ignore
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button type="button" className="logOut" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
          <button
            onClick={() => {
              isChangeMode && handleSubmit();
              setIsChangeMode((prevState) => !prevState);
            }}>
            <p className="changePersonalDetails">{isChangeMode ? 'done' : 'change'}</p>
          </button>
        </div>

        <div className="profileCard">
          <form>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleChange}
              className={!isChangeMode ? 'profileName' : 'profileNameActive'}
              disabled={!isChangeMode}
            />

            <input
              type="text"
              id="email"
              value={email}
              onChange={handleChange}
              className={!isChangeMode ? 'profileEmail' : 'profileEmailActive'}
              disabled={!isChangeMode}
            />
          </form>
        </div>
      </main>
    </div>
  );
};

export default Profile;
