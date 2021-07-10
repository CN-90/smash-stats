const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const setSchema = new Schema(
  {
    winner: {
      player: { type: Schema.Types.ObjectId, ref: "Player" },
    },
    loser: {
      player: { type: Schema.Types.ObjectId, ref: "Player" },
    },
    currentScore: {},

    setComplete: {
      type: Boolean,
      default: false,
    },

    format: {
      type: String,
      default: "BO3",
      enum: ["BO1", "BO3", "BO5", "BO7"],
    },
    players: {
      type: [{ type: Schema.Types.ObjectId, ref: "Player" }],
    },
    matches: {
      type: [{ type: Schema.Types.ObjectId, ref: "Match" }],
    },
    total_set_stats: {},
  },
  { timestamps: true }
);

const Set = mongoose.model("Set", setSchema);

module.exports = Set;
