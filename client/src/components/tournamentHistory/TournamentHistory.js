import React from 'react';
import { Link } from 'react-router-dom';
import './TournamentHistory.css';

const TournamentHistory = ({ tournaments }) => {
  return (
    <div className="tournamentHistory">
      <h1>Tournaments</h1>
      <table>
        <thead>
          <tr className="tableRow">
            <th>Tournament Name</th>
            <th>Winner</th>
          </tr>
        </thead>
        <tbody className="tableBody">
          {tournaments.map((tournament) => {
            return (
              <tr className="tableRow" key={tournament._id}>
                <Link to={`/tournament/${tournament._id}`}>
                  <td className="playerName">{tournament.name}</td>
                </Link>
                <td className="playerName">Jeff</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TournamentHistory;
