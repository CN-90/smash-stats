import React from 'react';
import { Link } from 'react-router-dom';
import './Table.css';

const Table = ({ players }) => {
  return (
    <section className="tableContainer">
      <h1 className="headerSecondary">Season One</h1>
      <table>
        <thead>
          <tr className="tableRow">
            <th>Name</th>
            <th className="characterHeader">Characters</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody className="tableBody">
          {players.map((player) => {
            return (
              <tr className="tableRow" key={player._id}>
                <td>
                  <Link to={`/player/${player._id}`}>
                    <span className="playerName">{player.name}</span>
                  </Link>
                </td>
                <td className="characters">Pikachu</td>
                <td>{player.matchesWon}</td>
                <td>{player.matchesLost}</td>
                <td>{player.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default Table;
