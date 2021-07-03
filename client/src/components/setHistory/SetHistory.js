import React from 'react';
import Set from './set/Set';

import './SetHistory.css';

const setHistory = (matches) => {
  console.log("THIS IS SETHISTORY")
  console.log(matches)
  return (
    <section className="setHistory">
      <h1 className="headerSecondary pb-1">Latest Matches</h1>
      <div className="matchesContainer">
        {matches.matches.map((match) => {
          return <Set matchDetails={match} />;
        })}
      </div>
    </section>
  );
};

export default setHistory;
