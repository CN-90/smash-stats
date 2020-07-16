import React, { useState } from 'react';
import './MatchModal.css';

const MatchModal = ({ authState, authDispatch, setToggleModals }) => {
  const [matchDetails, setMatchDetails] = useState({
    playerOne: '',
    playerTwo: '',
  });

  const [playerOne, setPlayerOne] = useState(authState.user.players);
  const [playerTwo, setPlayerTwo] = useState(authState.user.players);

  const onChange = (e) => {
    if (e.target.name === 'selectOne') {
      setMatchDetails({ ...matchDetails, playerOne: e.target.value });
      let newPlayersTwo = authState.user.players.filter(
        (player) => player.name !== e.target.value
      );
      setPlayerTwo(newPlayersTwo);
    } else {
      setMatchDetails({ ...matchDetails, playerTwo: e.target.value });
      let newPlayersOne = authState.user.players.filter(
        (player) => player.name !== e.target.value
      );
      setPlayerOne(newPlayersOne);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(matchDetails);
  };

  return (
    <div className="matchModal">
      <h1>Create Set</h1>
      <form onSubmit={onSubmit}>
        <div className="formGroup">
          <label htmlFor="">Player One</label>
          <select
            name="selectOne"
            value={matchDetails.playerOne}
            onChange={onChange}
          >
            <option value="" selected disabled hidden>
              Player One
            </option>
            {playerOne.map((player) => (
              <option value={player.name}>{player.name}</option>
            ))}
          </select>
        </div>
        <div className="formGroup">
          <label htmlFor="">Player Two</label>
          <select
            name="selectTwo"
            value={matchDetails.playerTwo}
            onChange={onChange}
          >
            <option value="" selected disabled hidden>
              Player Two
            </option>
            {playerTwo.map((player) => (
              <option value={player.name}>{player.name}</option>
            ))}
          </select>
        </div>
        <button className="blue-btn" type="submit">
          Create Set
        </button>
      </form>
    </div>
  );
};

export default MatchModal;
