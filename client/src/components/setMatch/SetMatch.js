import React, { useState } from 'react';
import './SetMatch.css';
import { characters } from './../../utils/characters';

const SetMatch = ({ players }) => {
  const [matchDetails, setMatchDetails] = useState({
    winner: {
      name: players[0].name,
      character: '',
      stocksLeft: '',
      dunks: '',
      sds: '',
      perries: '',
    },
    loser: {
      name: players[1].name,
      character: '',
      dunks: 0,
      sds: 0,
      perries: 0,
    },
  });

  const onChange = (e) => {
    let inputedValue = e.target.value;
    console.log(e.target.name);
    // if (e.target.name !== 'playerName' || e.target.name !== 'character') {
    //   inputedValue = parseInt(e.target.value);
    //   if (isNaN(inputedValue)) return;
    // }
    let winnerOrLoser = e.target.id.includes('winner') ? 'winner' : 'loser';

    setMatchDetails({
      ...matchDetails,
      [winnerOrLoser]: {
        ...matchDetails[winnerOrLoser],
        [e.target.name]: inputedValue,
      },
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(matchDetails);
  };

  return (
    <div className="setMatch">
      <div className="setMatch__header">
        <h1>Match Details</h1>
        <form onSubmit={onSubmit} className="setMatch__form">
          <div className="setMatch__playerOne">
            <h2 className="setMatch__winner">Winner</h2>
            <div className="formGroup">
              <label htmlFor="name">Player</label>
              <select
                onChange={onChange}
                value={matchDetails.winner.name}
                name="name"
                id="winnerName"
              >
                {players.map((player, ind) => (
                  <option key={ind} value={player.name}>
                    {player.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="formGroup">
              <label htmlFor="Character">Character</label>
              <select onChange={onChange} name="character" id="winnerCharacter">
                {characters.map((character, ind) => (
                  <option key={ind} value={character}>
                    {character}
                  </option>
                ))}
              </select>
            </div>
            <div className="setMatch__playerStats">
              <label htmlFor="winnerSds">SDs</label>
              <input
                onChange={onChange}
                value={matchDetails.winner.sds}
                name="sds"
                id="winnersds"
              />
              <label htmlFor="stocks">Stocks</label>
              <input
                onChange={onChange}
                name="stocksLeft"
                id="winnerstocks"
                value={matchDetails.winner.stocksLeft}
              />
              <label htmlFor="winnerDunks">Dunks</label>
              <input
                onChange={onChange}
                value={matchDetails.winner.dunks}
                name="dunks"
                id="winnerdunks"
              />
              <label htmlFor="playerName">Perries</label>
              <input
                onChange={onChange}
                value={matchDetails.winner.perries}
                name="perries"
                id="winnerperries"
              />
            </div>
          </div>

          <div className="setMatch__playerOne">
            <h2 className="setMatch__winner">Loser</h2>
            <div className="formGroup">
              <label htmlFor="playerName">Player</label>
              <select
                onChange={onChange}
                value={matchDetails.loser.name}
                name="name"
                id="name"
              >
                {players.map((player, ind) => (
                  <option key={ind} value={player.name}>
                    {player.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="formGroup">
              <label htmlFor="character">Character</label>
              <select
                onChange={onChange}
                value={matchDetails.loser.character}
                name="character"
                id="character"
              >
                {characters.map((character, ind) => (
                  <option key={ind} value={character}>
                    {character}
                  </option>
                ))}
              </select>
            </div>
            <div className="setMatch__playerStats">
              <label htmlFor="sds">SDs</label>
              <input onChange={onChange} name="sds" id="sds" />
              <label htmlFor="dunks">Dunks</label>
              <input onChange={onChange} name="dunks" id="dunks" />
              <label htmlFor="perries">perries</label>
              <input onChange={onChange} name="perries" id="perries" />
            </div>
          </div>
          <div className="setMatch__btn-container">
            <button className="blue-btn">Create Match</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetMatch;
