import React from 'react';
import Table from '../../components/table/Table';
import AuthContext from './../../context/authContext';

import './Homepage.css';
import SetHistory from '../../components/setHistory/SetHistory';

const Homepage = () => {
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <main className="homepage">
          <Table players={auth.authState.user.players} />
          <SetHistory matches={auth.authState.user.matches} />
        </main>
      )}
    </AuthContext.Consumer>
  );
};

export default Homepage;
