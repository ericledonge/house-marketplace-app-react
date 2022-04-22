import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Navbar from './components/navbar';
import PrivateRoute from './components/private-route';
import Explore from './pages/explore';
import ForgotPassword from './pages/forgot-password';
import Offers from './pages/offers';
import Profile from './pages/profile';
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>

        <Navbar />
      </Router>

      <ToastContainer />
    </>
  );
};

export default App;
