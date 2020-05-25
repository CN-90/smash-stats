const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.addTournament = catchAsync(async (userID, tournamentID) => {
  return User.findByIdAndUpdate(
    { _id: userID },
    { $push: { tournaments: tournamentID } },
    { new: true }.populate('tournaments').populate('players')
  ).exec();
});
