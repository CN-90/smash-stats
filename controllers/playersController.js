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
exports.updatePlayer = async (winner, loser, next) => {
  let incrementStatement = createIncreaseStatement(winner);
  try {
    const winningPlayer = await Player.findByIdAndUpdate(
      { _id: winner.id },
      {
        $inc: {
          wins: 1,
          losses: 0,
          [`characters.${winner.character}.wins`]: 1,
          [`characters.${winner.character}.losses`]: 0,
          [`characters.${winner.character}.${loser.character}.wins`]: 1,
          [`characters.${winner.character}.${loser.character}.losses`]: 0,
          ...incrementStatement,
        },
       
      },
      { new: true, strict: false }
    );

    let incrementStatementTwo = createIncreaseStatement(loser);
    const losingPlayer = await Player.findByIdAndUpdate(
      { _id: loser.id },
      {
        $inc: {
          losses: 1,
          [`characters.${loser.character}.losses`]: 1,
          [`characters.${loser.character}.wins`]: 0,
          [`characters.${loser.character}.${winner.character}.losses`]: 1,
          [`characters.${loser.character}.${winner.character}.wins`]: 0,
          ...incrementStatementTwo,
        },
      },
      { new: true, strict: false }
    );


    return { winningPlayer, losingPlayer};
  } catch (err) {
    return false;
  }
};

//  Creates the $inc object to add stats to player for updateOne method.
const createIncreaseStatement = (player) => {
  let incrementStatement = {};

  for (keys of Object.keys(player.stats)) {
    incrementStatement[`overall_stats.${keys}`] = player.stats[keys];
    incrementStatement[`characters.${player.character}.stats.${keys}`] =
      player.stats[keys];
  }
  return incrementStatement;
};
