import React from 'react';
import LoginForm from '../../components/loginForm/LoginForm';
import './Authpage.css';
import AuthContext from './../../context/authContext';

const Authpage = (props) => {
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <div className="authpage">
          <div className="flex">
            <div className="siteDetails">
              <div className="previewImg"></div>
              <h1 className="previewText">
                Track matches between you and your friends
              </h1>
            </div>
            <LoginForm auth={auth} />
          </div>
        </div>
      )}
    </AuthContext.Consumer>
  );
};

export default Authpage;
