const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const ScoreSchema = mongoose.Schema(
  {
    winner: String,
    winnerTime: Number,
    loser: String,
    loserTime: Number,
    userId: ObjectId
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Score', ScoreSchema);
