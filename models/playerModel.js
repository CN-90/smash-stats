const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  name: {
    type: String,
    maxlength: [15, 'Name must be between 1 and 15 characters.'],
    minlength: [4, 'Name must be between 1 and 15 characters.']
  },
  matchesPlayed: {
    type: Number,
    default: 0
  },
  matchesWon: {
    type: Number,
    default: 0
  },
  matchesLost: {
    type: Number,
    default: 0
  },
  matchUps: {
    type: Object,
    default: {}
  }
});

const Player = mongoose.model('Player', playerSchema);
module.exports = Player;
