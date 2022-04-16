import React, { SyntheticEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// @ts-ignore
import KeyboardArrowRightIcon from '../../resources/assets/svg/keyboardArrowRightIcon.svg?component';
import visibilityIcon from '../../resources/assets/svg/visibilityIcon.svg';
import { signIn } from '../services/sign-in.service';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const SignIn = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

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
      const userCredential = await signIn({ email, password });
      if (userCredential.user) {
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>

        <form onSubmit={handleSubmit}>
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

          <div className="signInBar">
            <p className="signInText">Sign In</p>

            <button className="signInButton">
              <KeyboardArrowRightIcon fill="#ffffff" width="34px" height="34px" />
            </button>
          </div>
        </form>

        <Link to="/sign-up" className="registerLink">
          Sign Up Instead
        </Link>
      </div>
    </>
  );
};

export default SignIn;
