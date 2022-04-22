import React, { SyntheticEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// @ts-ignore
import KeyboardArrowRightIcon from '../../resources/assets/svg/keyboardArrowRightIcon.svg?component';
import visibilityIcon from '../../resources/assets/svg/visibilityIcon.svg';
import GoogleAuth from '../components/google-auth';
import { singUpWithFirebase } from '../services/sign-up.service';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const SignUp = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { name, email, password } = formData;

  const navigate = useNavigate();

  const handleChange = (e: SyntheticEvent) => {
    setFormData((prevState) => ({
      ...prevState,
      // @ts-ignore
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await singUpWithFirebase({ name, email, password });
      navigate('/');
    } catch (error) {
      toast.error('Something went wrong with registration');
    }
  };

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Sign Up</p>
        </header>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleChange}
            placeholder="Name"
            className="nameInput"
          />

          <input
            type="email"
            id="email"
            value={email}
            onChange={handleChange}
            placeholder="Email"
            className="emailInput"
          />

          <div className="passwordInputDiv">
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={handleChange}
              placeholder="Password"
              className="passwordInput"
            />

            <input
              type="image"
              src={visibilityIcon}
              alt="show password"
              onClick={() => setIsPasswordVisible((prevState) => !prevState)}
              className="showPassword"
            />
          </div>

          <Link to="/forgot-password" className="forgotPasswordLink">
            Forgot Password
          </Link>

          <div className="signUpBar">
            <p className="signUpText">Sign Up</p>

            <button className="signUpButton">
              <KeyboardArrowRightIcon fill="#ffffff" width="34px" height="34px" />
            </button>
          </div>
        </form>

        <GoogleAuth />

        <Link to="/sign-in" className="registerLink">
          Sign In Instead
        </Link>
      </div>
    </>
  );
};

export default SignUp;
