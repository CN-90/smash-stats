const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchSchema = new Schema({
  winner: {
    player: { type: Schema.Types.ObjectId, ref: 'Player' },
  },
  loser: {
    player: { type: Schema.Types.ObjectId, ref: 'Player' },
  },
  format: {
    type: String,
    default: 'BO3',
    enum: ['BO3', 'BO5', 'BO7'],
  },
  players: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
  },
  gamesPlayed: {
    type: [
      {
        winner: { name: String, character: String, stocksLeft: Number },
        loser: { name: String, character: String, stocksLeft: Number },
      },
    ],
  },
  timePlayed: Date,
});

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;
