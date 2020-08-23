import React from 'react';
import { Link } from 'react-router-dom';
import './Set.css';

const Set = ({ matchDetails }) => {
  console.log(matchDetails);
  return (
    <div className="match">
      <div className="playerDetails">
        <div className="flex">
          {/* <img
            className="characterIcon"
            src="https://www.smashbros.com/assets_v2/img/fighter/pict/pokemon_trainer.png"
            alt=""
          /> */}
          <h2 className="playerName ml-1">{matchDetails.players[0].name}</h2>
        </div>
        <div>
          <h2 className="matchResult">2</h2>
        </div>
      </div>
      <div className="matchDetails">
        {/* <h2>-</h2> */}
        <h4>
          <Link
            to={{
              pathname: `/set/${matchDetails._id}`,
              state: { matchDetails },
            }}
          >
            View Set
          </Link>
        </h4>
      </div>
      <div className="playerDetails right">
        <div className="flex-reverse">
          {/* <img
            className="characterIcon"
            src="https://www.smashbros.com/assets_v2/img/fighter/pict/pokemon_trainer.png"
            alt=""
          /> */}
          <h2 className="playerName mr-1">{matchDetails.players[1].name}</h2>
        </div>
        <div>
          <h2 className="matchResult">0</h2>
        </div>
      </div>
    </div>
  );
};

export default Set;
