const Set = require("../models/setModal");
const User = require("../models/userModel");
const Match = require("../models/matchModal");
const catchAsync = require("../utils/catchAsync");

const PlayerController = require("../controllers/playersController");
const Player = require("../models/playerModel");
const AppError = require("../utils/appError");

exports.createMatch = catchAsync(async (req, res, next) => {
  const setID = "60df04136bf09719d01a76a6";
  const data = {
    players: ["60df040a6bf09719d01a76a4", "60df040f6bf09719d01a76a5"],
    winner: {
      id: "60df040a6bf09719d01a76a4",
      character: "Sheik",
      stocksRemaining: 3,
      stats: { sds: 0, dunks: 3, perries: 4 },
    },
    loser: {
      id: "60df040f6bf09719d01a76a5",
      character: "Bowser",
      stats: { sds: 1, dunks: 3, perries: 4 },
    },
    set: setID,
  };
  
  const newMatch = await Match.create(data);
  const updatedSet = await Set.findByIdAndUpdate(
      { _id: setID },
    { $push: { matches: newMatch._id }},
    { new: true }
  ).populate('matches')

  // const player = await Player.updatePlayer("60ded8d52bf0bb25f09385ad")

  const updatedPlayers = await PlayerController.updatePlayer(
    data.winner,
    data.loser
  );
  if (!updatedPlayers) {
    return next(
      new AppError("There was a problem updating your character.", 500)
    );
  }
  // try {
  // }catch (err){
  // console.log(err)
  // }

  res.json({
    players: [updatedPlayers.winningPlayer, updatedPlayers.losingPlayer],
  });
});

exports.deleteMatch = () => {};
