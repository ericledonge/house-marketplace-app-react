import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

// @ts-ignore
import KeyboardArrowRightIcon from '../../resources/assets/svg/keyboardArrowRightIcon.svg?component';
import { sendForgotPassword } from '../services/forgot-password.service';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleChange = (e: SyntheticEvent) => {
    // @ts-ignore
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await sendForgotPassword(email);
      toast.success('Email was sent');
    } catch (error) {
      toast.error('Could not send reset email');
    }
  };

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Forgot Password</p>
      </header>

      <main>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="emailInput"
            value={email}
            onChange={handleChange}
          />

          <Link className="forgotPasswordLink" to="/sign-in">
            Sign In
          </Link>

          <div className="signInBar">
            <div className="signInText">Send Reset Link</div>

            <button className="signInButton">
              <KeyboardArrowRightIcon fill="#ffffff" width="34px" height="34px" />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ForgotPassword;
