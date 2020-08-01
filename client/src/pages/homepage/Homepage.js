import React from 'react';
import Table from '../../components/table/Table';
import MatchHistory from '../../components/matchHistory/MatchHistory';
import AuthContext from './../../context/authContext';

import './Homepage.css';

const Homepage = () => {
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <main className="homepage">
          <Table players={auth.authState.user.players} />
          <MatchHistory matches={auth.authState.user.matches} />
        </main>
      )}
    </AuthContext.Consumer>
  );
};

export default Homepage;
