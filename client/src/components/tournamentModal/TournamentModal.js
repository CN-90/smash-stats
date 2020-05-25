import React, { useState } from 'react';
import './TournamentModal.css';
import { authHttpRequest, storeUserInfo } from './../../utils/Auth';

const TournamentModal = ({ authState }) => {
  const [tournamentName, setTournamentName] = useState('');
  const [playersInTournament, setPlayersInTournament] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const tournamentDetails = {
      name: tournamentName,
      players: playersInTournament,
      format: 'Round Robin',
    };

    const response = await authHttpRequest(
      'http://localhost:5000/api/v1/tournament',
      tournamentDetails
    );

    console.log(response.data.user);
    storeUserInfo(response.data.user);
  };

  const onChange = (e) => {
    setTournamentName(e.target.value);
  };

  const addorRemovePlayer = (e) => {
    const playerToAdd = e.target.value;

    if (playersInTournament.indexOf(playerToAdd) < 0) {
      let players = [...playersInTournament, playerToAdd];
      setPlayersInTournament(players);
    } else {
      let players = playersInTournament.filter(
        (player) => player !== playerToAdd
      );
      setPlayersInTournament(players);
    }
  };

  return (
    <div className="tournamentModal">
      <h1>New Tournament</h1>
      <form onSubmit={onSubmit} className="form">
        <div className="formGroup">
          <label htmlFor="name">Tournament Name</label>
          <input
            onChange={onChange}
            type="text"
            name="tournamentName"
            value={tournamentName}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="name">Tournament Format</label>
          <select className="formatSelect">
            <option value="Round Robin">Round Robin</option>
          </select>
        </div>

        <div className="tournamentPlayers">
          <label>Players Participating</label>
          {authState.user.players.map((player) => (
            <div className="player" key={player._id}>
              <label htmlFor={player.name} className="playerName">
                {player.name}
              </label>
              <input
                onClick={addorRemovePlayer}
                type="checkbox"
                name={player.name}
                value={player._id}
              />
            </div>
          ))}
        </div>
        <div className="btnContainer">
          <button type="submit" className="tournamentBtn">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default TournamentModal;
