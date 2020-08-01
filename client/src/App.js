import React, { useReducer, useEffect, useState } from 'react';
import AuthContext from './context/authContext';
import { authInitialState, authReducer } from './reducers/authReducer';

import './App.css';
import Container from './layout/container/Container';
import Navbar from './layout/navbar/Navbar';
import Homepage from './pages/homepage/Homepage';
import Authpage from './pages/authpage/Authpage';

import MatchModal from './components/matchModal/MatchModal';

import NewPlayer from './components/newPlayerModal/NewPlayer';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Playerpage from './pages/playerPage/Playerpage';
import SetPage from './pages/setPage/SetPage';

function App() {
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);
  const [toggleModals, setToggleModals] = useState({
    playerModal: false,
    matchModal: false,
  });

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
          <Route path="/" exact component={Homepage} />
          <Route path="/player/:id" component={Playerpage} />
          <Route path="/set/:id" component={SetPage} />
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
          {toggleModals.matchModal ? (
            <MatchModal
              authState={authState}
              authDispatch={authDispatch}
              setToggleModals={setToggleModals}
            />
          ) : null}
          {toggleModals.playerModal ? (
            <NewPlayer
              authDispatch={authDispatch}
              setToggleModals={setToggleModals}
            />
          ) : null}
          <div
            className="container"
            onClick={() =>
              setToggleModals({ playerModal: false, matchModal: false })
            }
          >
            {Routes}
          </div>
        </AuthContext.Provider>
      </div>
    </Router>
  );
}

export default App;
