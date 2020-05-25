import React, { Fragment } from 'react';
import AuthContext from '../../context/authContext';
import { signOut } from '../../utils/Auth';
import './Navbar.css';

const Navbar = ({ toggleModals, setToggleModals }) => {
  const toggleTournamentModal = () => {
    setToggleModals({
      playerModal: false,
      tournamentModal: !toggleModals.tournamentModal,
    });
  };

  const togglePlayerModal = () => {
    setToggleModals({
      tournamentModal: false,
      playerModal: !toggleModals.playerModal,
    });
  };

  return (
    <AuthContext.Consumer>
      {(auth) => {
        return (
          <nav>
            <div className="navContainer">
              <div className="brand">
                {/* <div className="brand-img">
            <img src="" alt="" />
          </div> */}
                <h1>SMASH STATS</h1>
              </div>
              <ul>
                {auth.authState.user ? (
                  <Fragment>
                    <li onClick={toggleTournamentModal}>Create Tournament</li>
                    <li onClick={togglePlayerModal} className="mr-10">
                      Add Player
                    </li>
                    <li onClick={signOut}>Sign Out</li>
                  </Fragment>
                ) : auth.authState.signUpMode ? (
                  <li onClick={() => auth.authDispatch({ type: 'SignUp' })}>
                    Sign In
                  </li>
                ) : (
                  <li onClick={() => auth.authDispatch({ type: 'SignUp' })}>
                    Sign Up
                  </li>
                )}
              </ul>
            </div>
          </nav>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default Navbar;
