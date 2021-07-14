const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchSchema = new Schema({
    players: [{ type: mongoose.Schema.ObjectId, ref: 'Player' }],
    winner: {
        id: {type: mongoose.Schema.ObjectId, ref: 'Player'},
        character: String,
        stats: {}
    },
    loser: {
        id: {type: mongoose.Schema.ObjectId, ref: 'Player'},
        character: String,
        stats: {}
    },
    set: {type: mongoose.Schema.ObjectId, ref: 'Set'}
   
})

const Match = mongoose.model('Match', matchSchema)

module.exports = Match;

// 