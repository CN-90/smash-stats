import React, { useState } from 'react';
import './CreateSetModal.css';
import { authHttpRequest, storeUserInfo } from '../../utils/Auth';

const CreateSetModal = ({ authState, authDispatch, setToggleModals }) => {
  const [matchDetails, setMatchDetails] = useState({
    playerOne: { name: '', data: {} },
    playerTwo: { name: '', data: {} },
    format: 'BO3',
  });

  const [playerOne, setPlayerOne] = useState(authState.user.players);
  const [playerTwo, setPlayerTwo] = useState(authState.user.players);

  const onChange = (e) => {
    // get the player object of the selected player
    let selectedPlayer = authState.user.players.filter(
      (user) => user.name === e.target.value
    );

    // logic below ensures that users cannot select the same player in both selects
    // if first select is changed filter out players to exclude currently selected and update second select with all other players
    if (e.target.name === 'selectOne') {
      setMatchDetails({
        ...matchDetails,
        playerOne: { name: e.target.value, data: selectedPlayer[0] },
      });
      let newPlayersTwo = authState.user.players.filter(
        (player) => player.name !== e.target.value
      );
      setPlayerTwo(newPlayersTwo);
    } else {
      // if second select is changed filter out players to exclude currently selected and update first select with all other players
      setMatchDetails({
        ...matchDetails,
        playerTwo: { name: e.target.value, data: selectedPlayer[0] },
      });
      let newPlayersOne = authState.user.players.filter(
        (player) => player.name !== e.target.value
      );
      setPlayerOne(newPlayersOne);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!matchDetails.playerOne.name || !matchDetails.playerTwo.name) {
      // need to add proper error message here...
      console.log('Player names must not be blank.');
      return;
    }

    let userInfo = JSON.parse(localStorage.getItem('userData'));

    // receive updated user with new match added on.
    let response = await authHttpRequest(
      'http://localhost:5000/api/v1/matches',
      matchDetails
    );

    userInfo.user = response.data.updatedUser;
    authDispatch({ type: 'SET_USER', payload: userInfo.user });
    storeUserInfo(userInfo);
    setToggleModals({ playerModal: false, matchModal: false });
  };

  return (
    <div className="setModal">
      <h1>Create Set</h1>
      <form onSubmit={onSubmit}>
        <div className="formGroup">
          <label htmlFor="">Player One</label>
          <select
            name="selectOne"
            value={matchDetails.playerOne.name}
            onChange={onChange}
          >
            <option value="" disabled hidden>
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
            value={matchDetails.playerTwo.name}
            onChange={onChange}
          >
            <option value="" disabled hidden>
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

export default CreateSetModal;
