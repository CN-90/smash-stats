import React from 'react';
import './Match.css';

const Match = () => {
  return (
    <div className="match">
      <div className="playerDetails">
        <div className="flex">
          <img
            className="characterIcon"
            src="https://www.smashbros.com/assets_v2/img/fighter/pict/pokemon_trainer.png"
            alt=""
          />
          <h2 className="playerName ml-1">Bill</h2>
        </div>
        <div>
          <h2 className="matchResult green">W</h2>
        </div>
      </div>
      <div className="matchDetails">
        <h2>VS</h2>
      </div>
      <div className="playerDetails right">
        <div className="flex-reverse">
          <img
            className="characterIcon"
            src="https://www.smashbros.com/assets_v2/img/fighter/pict/pokemon_trainer.png"
            alt=""
          />
          <h2 className="playerName mr-1">Johnson</h2>
        </div>
        <div>
          <h2 className="matchResult red">L</h2>
        </div>
      </div>
    </div>
  );
};

export default Match;
