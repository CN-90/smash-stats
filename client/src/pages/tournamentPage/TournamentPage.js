import React, { useState } from 'react';
import './TournamentPage.css';

const TournamentPage = () => {
  return (
    <div className="tournamentPage">
      <h1>Tournament Page</h1>

      <div className="createSet">
        <h1>New Set</h1>
        <form className="matchSetForm">
          <div className="flexRow">
            <div className="formGroup">
              <label htmlFor="playerOne">Player One</label>
              <select className="playerName" name="playerOne" id="playerOne">
                <option value="David">David</option>
                <option value="Gerald">Gerald</option>
              </select>
            </div>
            <div>VS.</div>
            <div className="formGroup">
              <label htmlFor="playerTwo">Player Two</label>
              <select className="playerName" name="PlayerTwo" id="PlayerTwo">
                <option value="David">David</option>
                <option value="Gerald">Gerald</option>
              </select>
            </div>
          </div>
          <div className="formgroup">
            <label htmlFor="format">Match Format</label>
            <select className="matchFormat" name="matchFormat">
              <option value="BO3">BO3</option>
              <option value="BO5">BO5</option>
              <option value="BO7">BO7</option>
            </select>
          </div>
        </form>
        <button classname="blue-btn">Create Set</button>
      </div>
    </div>
  );
};

export default TournamentPage;
