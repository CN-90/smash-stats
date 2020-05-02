const Player = require('../models/playerModel');
const catchAsync = require('../utils/catchAsync');

module.exports.createPlayer = catchAsync(async (req, res) => {
  const player = await Player.create(req.body);
  res.status(200).json({
    message: 'Success',
    data: player
  });
});

module.exports.addMatch = catchAsync(async (req, res) => {
  const id = req.params.id;
  const player = await Player.updateOne(
    { _id: id },
    { $inc: { matchesPlayed: 1, matchesLost: 1 } }
  );
  // const player = await Player.find({
  //   _id: id,
  //   $or: [
  //     { 'matchUps.Link': { $exists: true } },
  //     { 'matchUps.Link.opponents.mario': { $exists: true } }
  //   ]
  // });

  // console.log(player[0].matchUps);

  res.status(200).json({
    data: player
  });
});

// This is used to dynamically add a character to the matchUps field
// const $set = {
//   ['matchUps.' + 'Link']: {
//     wins: 0,
//     losses: 1,
//     matchesPlayed: 1,
//     opponents: {
//       ['Luigi']: { wins: 0, losses: 1, matchesPlayed: 1 }
//     }
//   }
// };

const fakeMatch = {
  playerOne: {
    matchesPlayed: 1,
    matchesWon: 1,
    characterPlayed: 'link',
    opponent: 'zelda'
  }
};
