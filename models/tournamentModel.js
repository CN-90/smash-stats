const mongoose = require('mongoose');
const User = require('./userModel');
const Schema = mongoose.Schema;

const tournamentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  format: {
    type: String,
    requred: true,
    enum: ['Round Robin', 'Bracket'],
  },
  players: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
    validate: [arrayLimit, 'Tournament must have more than two players.'],
  },
  matches: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Match' }],
  },
  winner: {
    type: Schema.Types.ObjectId,
    ref: 'Player',
  },
});

function arrayLimit(val) {
  return val.length > 2;
}

const Tournament = mongoose.model('Tournament', tournamentSchema);

module.exports = Tournament;
