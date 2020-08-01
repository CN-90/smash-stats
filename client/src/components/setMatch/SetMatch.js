import React, { useState } from 'react';
import './SetMatch.css';

const SetMatch = () => {
  const [matchDetails, setMatchDetails] = useState({
    winner: {
      name: '',
      character: '',
      stocksLeft: '',
      dunks: 0,
      sds: 0,
      perrys: 0,
    },
    loser: {
      name: '',
      character: '',
      stocksLeft: 0,
      dunks: 0,
      sds: 0,
      perrys: 0,
    },
  });

  return (
    <div className="setMatch">
      <div className="setMatch__header">
        <h1>Match Details</h1>
        <form>
          <div className="setMatch__playerOne">
            <h2 className="setMatch__winner">Winner</h2>
            <div className="formGroup">
              <label htmlFor="playerName">Player</label>
              <select name="" id="">
                <option value="Tina">Tina Tu</option>
              </select>
            </div>
            <div className="formGroup">
              <label htmlFor="playerName">Character</label>
              <select name="" id="">
                <option value="Tina">Tina Tu</option>
              </select>
            </div>
            <div className="setMatch__playerStats">
              <label htmlFor="sds">SDs</label>
              <input name="sds" id="sds" />
              <label htmlFor="stocks">Stocks</label>
              <input name="stocks" id="stocks" />
              <label htmlFor="dunks">Dunks</label>
              <input name="dunks" id="dunks" />
              <label htmlFor="playerName">Perrys</label>
              <input name="" id="" />
            </div>
          </div>
          <div className="setMatch__playerOne">
            <h2 className="setMatch__winner">Loser</h2>
            <div className="formGroup">
              <label htmlFor="playerName">Player</label>
              <select name="" id="">
                <option value="Tina">Tina Tu</option>
              </select>
            </div>
            <div className="formGroup">
              <label htmlFor="playerName">Character</label>
              <select name="" id="">
                <option value="Tina">Tina Tu</option>
              </select>
            </div>
            <div className="setMatch__playerStats">
              <label htmlFor="playerName">SDs</label>
              <input name="" id="" />
              <label htmlFor="playerName">Dunks</label>
              <input name="" id="" />
              <label htmlFor="playerName">Perrys</label>
              <input name="" id="" />
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
