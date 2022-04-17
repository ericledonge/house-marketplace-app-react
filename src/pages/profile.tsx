import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import React, { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { auth, db } from '../libs/firebase';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: auth.currentUser?.displayName || '',
    email: auth.currentUser?.email || '',
  });
  const [isChangeMode, setIsChangeMode] = useState(false);

  const navigate = useNavigate();

  const { name, email } = formData;

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  const handleSubmit = async () => {
    try {
      if (auth.currentUser && auth.currentUser?.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, {
          name,
        });
      }
    } catch (error) {
      toast.error('Could not update profile details');
    }
  };

  const handleChange = (e: SyntheticEvent) => {
    setFormData((prevState) => ({
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
