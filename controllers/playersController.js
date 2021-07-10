const Player = require("../models/playerModel");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createPlayer = catchAsync(async (req, res) => {
  console.log(req.body.name);
  const player = await Player.create({ name: req.body.name });

  const currentUser = await User.findByIdAndUpdate(
    { _id: req.user._id },
    { $addToSet: { players: player._id } },
    { safe: true, upsert: true, new: true },
    function (err, model) {
      if (err) console.log(err);
    }
  )
    .populate("players")
    .populate({ path: "matches", populate: { path: "players" } });

  res.status(200).json({
    message: "Success",
    data: {
      newPlayer: player,
      currentUser: currentUser,
    },
  });
});

// inc
exports.saveMatchStatsToPlayers = async (winner, loser) => {
  try {
    let winnerStats = createStatsIncreaseStatement(winner);
    const winningPlayer = await Player.findByIdAndUpdate(
      { _id: winner.id },
      {
        $inc: {
          wins: 1,
          losses: 0,
          [`characters.${winner.character}.wins`]: 1,
          [`characters.${winner.character}.losses`]: 0,
          [`characters.${winner.character}.matchups.${loser.character}.wins`]: 1,
          [`characters.${winner.character}.matchups.${loser.character}.losses`]: 0,
          ...winnerStats,
        },
      },
      { new: true, strict: false }
    );

    let loserStats = createStatsIncreaseStatement(loser);
    const losingPlayer = await Player.findByIdAndUpdate(
      { _id: loser.id },
      {
        $inc: {
          losses: 1,
          wins: 0,
          [`characters.${loser.character}.losses`]: 1,
          [`characters.${loser.character}.wins`]: 0,
          [`characters.${loser.character}.matchups.${winner.character}.losses`]: 1,
          [`characters.${loser.character}.matchups.${winner.character}.wins`]: 0,
          ...loserStats,
        },
      },
      { new: true, strict: false }
    );

    return { winningPlayer, losingPlayer };
  } catch (err) {
    return false;
  }
};

//  Creates the $inc object to add stats to player for updateOne method.
const createStatsIncreaseStatement = (player) => {
  let incrementStatement = {};

  for (keys of Object.keys(player.stats)) {
    incrementStatement[`overall_stats.${keys}`] = player.stats[keys];
    incrementStatement[`characters.${player.character}.stats.${keys}`] =
      player.stats[keys];
  }
  return incrementStatement;
};

const createStatsDecreaseStatement = (player) => {
  let incrementStatement = {};

  for (keys of Object.keys(player.stats)) {
    if (player.stats[keys] > 0) {
      incrementStatement[`overall_stats.${keys}`] = player.stats[keys] * -1;
      incrementStatement[`characters.${player.character}.stats.${keys}`] =
        player.stats[keys] * -1;
    } else {
      incrementStatement[`overall_stats.${keys}`] = player.stats[keys];
      incrementStatement[`characters.${player.character}.stats.${keys}`] =
        player.stats[keys];
    }
  }
  return incrementStatement;
};

exports.removePlayerStats = async (match) => {
  const { winner, loser } = match;

  try {
    const winnerStats = createStatsDecreaseStatement(winner);
    const winningPlayer = await Player.findByIdAndUpdate(
      { _id: winner.id },
      {
        $inc: {
          wins: -1,
          [`characters.${winner.character}.wins`]: -1,
          [`characters.${winner.character}.matchups.${loser.character}.wins`]: -1,
          ...winnerStats,
        },
      },
      { new: true, strict: false }
    );

    const loserStats = createStatsDecreaseStatement(loser);
    const losingPlayer = await Player.findByIdAndUpdate(
      { _id: loser.id },
      {
        $inc: {
          losses: -1,
          [`characters.${loser.character}.losses`]: -1,
          [`characters.${loser.character}.matchups.${winner.character}.losses`]: -1,
          ...loserStats,
        },
      },
      { new: true, strict: false }
    );

    return { winningPlayer, losingPlayer };
  } catch (err) {
    return false;
  }
};
