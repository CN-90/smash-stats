const Set = require("../models/setModal");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.createSet = catchAsync(async (req, res) => {
  const { playerOne, playerTwo, format } = req.body;
  const players = [playerOne.data._id, playerTwo.data._id];

  const newSet = await Set.create({ players, format });
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
