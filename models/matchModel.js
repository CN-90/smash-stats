const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchSchema = new Schema({
  winner: String,
  loser: String,
  timePlayed: Date,
});

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;
