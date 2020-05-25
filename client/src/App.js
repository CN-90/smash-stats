import React, { useReducer, useEffect, useState } from 'react';
import AuthContext from './context/authContext';
import { authInitialState, authReducer } from './reducers/authReducer';
// import { UIInitialState, UIReducer } from './reducers/UIReducer';

import './App.css';
import Container from './layout/container/Container';
import Navbar from './layout/navbar/Navbar';
import Homepage from './pages/homepage/Homepage';
import Authpage from './pages/authpage/Authpage';
import TournamentModal from './components/tournamentModal/TournamentModal';
import NewPlayer from './components/newPlayerModal/NewPlayer';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);
  const [toggleModals, setToggleModals] = useState({
    playerModal: false,
    tournamentModal: false,
  });
  // const [UIState, UIDispatch] = useReducer(UIReducer, UIInitialState);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    console.log(storedData);
    if (storedData) {
      authDispatch({ type: 'LOGIN', payload: storedData });
    }
  }, []);

  let Routes;
  if (authState.user && authState.token) {
    Routes = (
      <Switch>
        <Container>
          <Route path="/" component={Homepage} />
        </Container>
      </Switch>
    );
  } else {
    Routes = (
      <Switch>
        <Route path="/" component={Authpage} />
      </Switch>
    );
  }

  return (
    <Router>
      <div className="App">
        <AuthContext.Provider value={{ authState, authDispatch }}>
          <Navbar
            toggleModals={toggleModals}
            setToggleModals={setToggleModals}
          />
          {toggleModals.tournamentModal ? (
            <TournamentModal authState={authState} />
          ) : null}
          {toggleModals.playerModal ? (
            <NewPlayer
              authDispatch={authDispatch}
              setToggleModals={setToggleModals}
            />
          ) : null}
          {Routes}
        </AuthContext.Provider>
      </div>
    </Router>
  );
}

export default App;
