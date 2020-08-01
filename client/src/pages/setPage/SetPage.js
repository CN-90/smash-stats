import React, { useState } from 'react';
import SetMatch from './../../components/setMatch/SetMatch';
import './SetPage.css';

const SetPage = (props) => {
  const matchDetails = props.location.state.matchDetails;
  console.log(matchDetails);
  return (
    <div className="setPage">
      <SetMatch />
      <div className="setPage__matchDetails">
        <div className="setPage__playerNames">
          <h1 className="setPage__playerName">
            {matchDetails.players[0].name}
          </h1>
          <h3 className="versus">vs</h3>
          <h1 className="setPage__playerName">
            {matchDetails.players[1].name}
          </h1>
        </div>
      </div>
      <div className="matches">
        <div className="matches__header">
          <h2>Matches</h2>
          <button className="blue-btn">Add Match</button>
        </div>
        {matchDetails.gamesPlayed.length === 0 ? (
          <h3 className="noMatches">No matches have been added</h3>
        ) : (
          <div>Matches Container</div>
        )}
        <div className="setPage__match"></div>
      </div>
    </div>
  );
};

export default SetPage;
