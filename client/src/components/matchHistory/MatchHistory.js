import React from 'react';
import Match from './match/Match';

import './MatchHistory.css';

const MatchHistory = (matches) => {
  return (
    <section className="matchHistory">
      <h1 className="headerSecondary pb-1">Set History</h1>
      <div className="matchesContainer">
        {matches.matches.map((match) => {
          return <Match matchDetails={match} />;
        })}
      </div>
    </section>
  );
};

export default MatchHistory;
