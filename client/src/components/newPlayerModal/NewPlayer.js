import React, { useState } from 'react';
import './NewPlayer.css';
import { createPlayer } from './../../utils/Players';

const NewPlayer = ({ authDispatch, setToggleModals }) => {
  const [playerName, setPlayerName] = useState('');

  const onChange = (e) => {
    setPlayerName(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitted...');
    createPlayer(playerName, authDispatch);

    setToggleModals({
      tournamentModal: false,
      playerModal: false,
    });
  };

  return (
    <div className="newPlayerModal">
      <h1>New Player</h1>
      <form className="form" onSubmit={onSubmit}>
        <div className="formGroup">
          <label htmlFor="">Player Name</label>
          <input
            onChange={onChange}
            type="text"
            value={playerName}
            name="playerName"
          ></input>
        </div>
        <div className="btnContainer">
          <button type="submit" className="tournamentBtn">
            Add Player
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPlayer;
