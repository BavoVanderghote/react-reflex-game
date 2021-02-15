const Score = require('../models/score.model.js');

exports.create = (req, res) => {
  if (!req.body.winner) {
    return res.status(500).send({err: 'winner can not be empty'});
  }
  if (!req.body.loser) {
    return res.status(500).send({err: 'loser can not be empty'});
  }
  if (!req.body.winnerTime) {
    return res.status(500).send({err: 'winnerTime can not be empty'});
  }
  if (!req.body.loserTime) {
    return res.status(500).send({err: 'loserTime can not be empty'});
  }

  const score = new Score({
    winner: req.body.winner,
    winnerTime: req.body.winnerTime,
    loser: req.body.loser,
    loserTime: req.body.loserTime,
    userId: req.authUserId
  });

  score
    .save()
    .then(score => res.send(score))
    .catch(err => {
      res.status(500).send({error: err.score || 'Error'});
    });
};

exports.findAll = async (req, res) => {
  try {
    const scores = await Score.find({userId: req.authUserId}).sort({
      updatedAt: - 1
    });
    res.send(scores);
  } catch (err) {
    res.status(500).send({err: err.score || 'Error'});
  }
};

exports.findOne = async (req, res) => {
  try {
    const score = await Score.findOne({
      _id: req.params.scoreId,
      userId: req.authUserId
    });
    if (score) {
      res.send(score);
    } else {
      res.status(404).send('No score found');
    }
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(500).send('Geen geldig ID');
    }
    return res.status(500).send(err);
  }
};

exports.update = async (req, res) => {
  if (!req.body.winner) {
    return res.status(500).send({err: 'winner can not be empty'});
  }
  if (!req.body.loser) {
    return res.status(500).send({err: 'loser can not be empty'});
  }
  if (!req.body.winnerTime) {
    return res.status(500).send({err: 'winnerTime can not be empty'});
  }
  if (!req.body.loserTime) {
    return res.status(500).send({err: 'loserTime can not be empty'});
  }

  try {
    const score = await Score.findOneAndUpdate(
      {
        _id: req.params.scoreId,
        userId: req.authUserId
      },
      {
        winner: req.body.winner,
        winnerTime: req.body.winnerTime,
        loser: req.body.loser,
        loserTime: req.body.loserTime
      },
      {
        new: true
      }
    );

    if (!score) {
      return res.status(404).send('No score found');
    }
    res.send(score);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(417).send('Geen geldig ID');
    }
    return res.status(500).send(err);
  }
};

exports.delete = async (req, res) => {
  try {
    const score = await Score.findOneAndRemove({
      _id: req.params.scoreId,
      userId: req.authUserId
    });
    if (!score) {
      return res.status(404).send('No score found');
    }
    res.send(score);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(417).send('Geen geldig ID');
    }
    return res.status(500).send(err);
  }
};
