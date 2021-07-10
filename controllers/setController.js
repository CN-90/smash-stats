const Set = require("../models/setModal");
const User = require("../models/userModel");
const matchController = require("./matchController");
const playerController = require("./playersController");
const catchAsync = require("../utils/catchAsync");

exports.createSet = catchAsync(async (req, res) => {
  const { playerOne, playerTwo, format } = req.body;
  const players = [playerOne.data._id, playerTwo.data._id];
  
  const newSet = await Set.create({
    players,
    format,
    currentScore: { [playerOne.data._id]: 0, [playerTwo.data._id]: 0 },
  });
  const updatedUser = await User.findByIdAndUpdate(
    { _id: req.user._id },
    { $push: { sets: newSet._id } },
    { new: true }
  )
    .populate({ path: "sets", populate: { path: "players" } })
    .populate("players");

  res.status(200).json({
    message: "Success",
    updatedUser,
  });
});

exports.deleteSet = catchAsync(async (req, res) => {
  const setId = req.params.setId;
  const setToDelete = await Set.findById(setId).populate("matches");
  // go through all matches in set being deleted and reduct player stats gained from each match played in the set.
  let updatedPlayers = null;
  for (let match of setToDelete.matches) {
    updatedPlayers = await playerController.removePlayerStats(match);
    await matchController.deleteMatch(match);
  }

  res.json({ message: "Set has been successfully deleted.", updatedPlayers });

  // delete matches
});
