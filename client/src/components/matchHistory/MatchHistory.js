import React from 'react';
import Match from './match/Match';
import './MatchHistory.css';

const MatchHistory = () => {
  return (
    <section className="matchHistory">
      <h1 className="headerSecondary pb-1">Tournament History</h1>
      <div className="matchesContainer">
        <Match />
      </div>
    </section>
  );
};

export default MatchHistory;
