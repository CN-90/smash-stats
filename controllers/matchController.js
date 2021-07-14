const Set = require("../models/setModal");
const Match = require("../models/matchModal");
const catchAsync = require("../utils/catchAsync");

const PlayerController = require("../controllers/playersController");
const AppError = require("../utils/appError");
const { checkIfMatchPoint } = require("../utils/setUtils");

exports.createMatch = catchAsync(async (req, res, next) => {
  const setID = "60e8125b752bc280a0810e8f";
  const set = await Set.findById(setID);
  if (set.setComplete) {
    return res.json({
      error: "Set is alrady complete, no more matches can be added.",
    });
  }
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

  //  check if this match is the last of the set.
  const matchPoint = checkIfMatchPoint(set, data.winner.id);
  let $set = {};
  // if this is matchpoint, set setComplete to true so no more matches can be added.
  if (matchPoint) {
    $set = { $set: { setComplete: true } };
  }

  const newMatch = await Match.create(data);
  const updatedSet = await Set.findByIdAndUpdate(
    { _id: setID },
    {
      $push: { matches: newMatch._id },
      $inc: { [`currentScore.${data.winner.id}`]: 1 },
      ...$set,
    },
    { new: true, strict: false }
  ).populate("matches");

  const updatedPlayers = await PlayerController.saveMatchStatsToPlayers(
    data.winner,
    data.loser
  );
  if (!updatedPlayers) {
    return next(
      new AppError("There was a problem updating your character.", 500)
    );
  }

  res.json({
    updatedSet,
    players: [updatedPlayers.winningPlayer, updatedPlayers.losingPlayer],
  });
});

exports.deleteMatch = catchAsync(async (matchId) => {
  return await Match.deleteOne(matchId);
});

exports.updateMatch = catchAsync(async (req, res) => {
  // deteremine if characters have changed
});
