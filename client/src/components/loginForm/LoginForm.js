import React, { useState } from 'react';
import './LoginForm.css';
import { signIn, signUp } from '../../utils/Auth';

const LoginForm = ({ auth }) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('pressed')
    if (auth.authState.signUpMode) {
      signUp(user, auth.authDispatch);
    } else {
      signIn(user, auth.authDispatch);
    }
  };

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="loginContainer">
      {/* <img src="https://www.pngfind.com/pngs/m/8-82285_open-super-smash-logo-hd-png-download.png" /> */}
      <h1 className="welcomeMsg">
        {!auth.authState.signUpMode ? 'Sign In' : 'Sign up'}
      </h1>

      <form onSubmit={onSubmit}>
        <div className="formGroup">
          <label htmlFor="email">Email</label>
          <input
            onChange={onChange}
            type="email"
            placeholder="Email"
            name="email"
            value={user.email}
            required
          />
        </div>

        <div className="formGroup">
          <label htmlFor="password">Password</label>
          <input
            onChange={onChange}
            type="password"
            placeholder="Password"
            name="password"
            value={user.password}
            required
          />
        </div>

        {auth.authState.signUpMode ? (
          <div className="formGroup">
            <label htmlFor="password">Confirm Password</label>
            <input
              onChange={onChange}
              type="password"
              placeholder="Confirm Password"
              name="passwordConfirm"
              value={user.passwordConfirm}
              required
            />
          </div>
        ) : null}
        {auth.authState.error ? (
          <small className="errorMsg">{auth.authState.error}</small>
        ) : null}
        <div className="btnContainer">
          <button className="submitBtn">Sign In</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
