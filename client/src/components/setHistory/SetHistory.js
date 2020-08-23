import React from 'react';
import Set from './set/Set';

import './SetHistory.css';

const setHistory = (matches) => {
  return (
    <section className="setHistory">
      <h1 className="headerSecondary pb-1">Set History</h1>
      <div className="matchesContainer">
        {matches.matches.map((match) => {
          return <Set matchDetails={match} />;
        })}
      </div>
    </section>
  );
};

export default setHistory;
