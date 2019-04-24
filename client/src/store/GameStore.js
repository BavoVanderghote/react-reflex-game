import { decorate, configure, observable, action, runInAction } from "mobx";
import Score from "../models/Score";
import Api from "../api";

configure({ enforceActions: "observed" });

class GameStore {
  // GAME VARIABLES
  start;
  interval;
  p1Name = ``;
  p2Name = ``;
  p1Ready = false;
  p2Ready = false;
  p1 = 0;
  p2 = 0;
  p1Interval;
  p2Interval;
  p1Finished = false;
  p2Finished = false;

  timerIsOn = false;
  gameIsStarted = false;
  winner = {};
  loser = {};

  ready = false;
  set = false;
  go = false;

  setSetTimeout;
  startTimeout;

  // CRUD VARIABLES
  scoreToUpdate = {};

  // LEADERBOARD
  scores = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.api = new Api("score");
    if (this.rootStore.uiStore.authUser) {
      this.getAll();
    }
  }

  //GAME

  checkForStartGame = () => {
    if (this.p1Ready && this.p2Ready) {
      this.startSequence();
    }
  };

  startSequence = () => {
    this.timerIsOn = false;
    this.gameIsStarted = true;

    if (this.p1Interval) {
      clearInterval(this.p1Interval);
    }

    if (this.p2Interval) {
      clearInterval(this.p2Interval);
    }

    if (this.setTimeout) {
      clearTimeout(this.setSetTimeout);
    }

    if (this.startTimeout) {
      clearTimeout(this.startTimeout);
    }

    this.p1Finished = false;
    this.p2Finished = false;

    this.ready = false;
    this.set = false;
    this.go = false;

    this.ready = true;
    this.setSetTimeout = setTimeout(this.setSet, 1000);
    this.startTimeout = setTimeout(
      this.startTimer,
      Math.random() * (5000 - 2000) + 2000
    );
  };

  setSet = () => {
    this.set = true;
  };

  startTimer = () => {
    if (!this.timerIsOn) {
      this.go = true;
      this.timerIsOn = true;
      this.start = Date.now();
      this.p1Interval = setInterval(() => this.setP1(), 1);
      this.p2Interval = setInterval(() => this.setP2(), 1);
    } else {
      console.log(`Timer already running`);
    }
  };

  setP1 = () => {
    this.p1 = (Date.now() - this.start) / 1000;
  };

  setP1Name = name => {
    this.p1Name === name
      ? console.log(`gelijke naam`)
      : (this.scoreToUpdate = {});
    name ? (this.p1Name = name) : (this.p1Name = `Player 1`);
    this.p1Ready = !this.p1Ready;
    console.log(
      `${this.p1Name} ready ${this.p1Ready}, ${
        Object.entries(this.scoreToUpdate).length
      }`
    );
  };

  setP2Name = name => {
    this.p2Name === name
      ? console.log(`gelijke naam`)
      : (this.scoreToUpdate = {});
    name ? (this.p2Name = name) : (this.p2Name = `Player 2`);
    this.p2Ready = !this.p2Ready;
    console.log(
      `${this.p2Name} ready ${this.p2Ready}, ${
        Object.entries(this.scoreToUpdate).length
      }`
    );
  };

  setP2 = () => {
    this.p2 = (Date.now() - this.start) / 1000;
  };

  endTimer = (key, player) => {
    if (player === 1 && this.timerIsOn) {
      clearInterval(this.p1Interval);
      this.p1Finished = true;

      if (!this.p2Finished) {
        this.winner.name = this.p1Name;
        this.winner.time = this.p1;
      } else {
        this.loser.name = this.p1Name;
        this.loser.time = this.p1;
      }
    } else if (player === 2 && this.timerIsOn) {
      clearInterval(this.p2Interval);
      this.p2Finished = true;

      if (!this.p1Finished) {
        this.winner.name = this.p2Name;
        this.winner.time = this.p2;
      } else {
        this.loser.name = this.p2Name;
        this.loser.time = this.p2;
      }
    } else if (this.gameIsStarted && !this.timerIsOn) {
      console.log(`player ${player} pressed too early`);
      player === 1 ? (this.p1 = `Too early`) : (this.p2 = `Too early`);
      // player pressed too early
      this.restartGame();
    }
    if (this.p1Finished && this.p2Finished && this.timerIsOn) {
      this.timerIsOn = false;
      this.gameIsStarted = false;
      this.p1Ready = false;
      this.p2Ready = false;

      console.log(
        `[winner] ${this.winner.name} took ${this.winner.time} seconds`
      );
      console.log(`[loser] ${this.loser.name} took ${this.loser.time} seconds`);

      if (Object.entries(this.scoreToUpdate).length !== 0) {
        this.scoreToUpdate.loser = this.loser.name;
        this.scoreToUpdate.winnerTime = this.winner.time;
        this.scoreToUpdate.loserTime = this.loser.time;
        this.scoreToUpdate.winner = this.winner.name;

        this.updateScore(this.scoreToUpdate);
      } else {
        this.addScore({ winner: this.winner, loser: this.loser });
      }
    }
  };

  restartGame = () => {
    this.timerIsOn = false;
    this.p1Ready = false;
    this.p2Ready = false;
    this.p1Finished = true;
    this.p2Finished = true;

    this.startSequence();
  };

  rematch = score => {
    this.p1Name = score.winner;
    this.p2Name = score.loser;
    this.p1Ready = false;
    this.p2Ready = false;

    this.scoreToUpdate = score;
  };

  //API

  getAll = () => {
    this.api.getAll().then(d => d.forEach(this._addScore));
  };

  addScore = data => {
    const newScore = new Score(
      data.winner.name,
      data.loser.name,
      data.winner.time,
      data.loser.time
    );

    this.scores.push(newScore);

    this.api.create(newScore).then(scoreValues => {
      newScore.updateFromServer(scoreValues);
    });
  };

  _addScore = values => {
    const score = new Score(
      values.winner,
      values.loser,
      values.winnerTime,
      values.loserTime,
      values._id
    );
    runInAction(() => this.scores.push(score));
  };

  deleteScore = score => {
    this.scores.remove(score);
    this.api.delete(score);
  };

  updateScore = score => {
    this.api.update(score).then(scoreValues => {
      score.updateFromServer(scoreValues);
    });
  };
}

decorate(GameStore, {
  p1Name: observable,
  p2Name: observable,
  p1Ready: observable,
  p2Ready: observable,
  p1: observable,
  p2: observable,
  timerIsOn: observable,
  ready: observable,
  set: observable,
  go: observable,
  scores: observable,
  startTimer: action,
  endTimer: action,
  setP1: action,
  setP2: action,
  startSequence: action,
  setSet: action,
  setGo: action,
  setP1Name: action,
  setP2Name: action,
  addScore: action,
  deleteScore: action
});

export default GameStore;
