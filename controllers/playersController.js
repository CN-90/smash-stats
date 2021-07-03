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

exports.updatePlayer = async (winner, loser, next) => {
  try {
    let player = await Player.update(
      { _id: winner.id },
      { $set: { nickname: "Old Scott" } },
      { new: true, strict: false, returnNewDocument: true }
    );
    return player;
  } catch (err) {
    return false;
  }
};
