const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  name: {
    type: String,
    maxlength: [15, "Name must be between 1 and 15 characters."],
    minlength: [4, "Name must be between 1 and 15 characters."],
  },
  wins: {type: Number, default: 0},
  losses: {type: Number, default: 0},
  matchups: {},
  sets: {},
});

const Player = mongoose.model("Player", playerSchema);
module.exports = Player;
