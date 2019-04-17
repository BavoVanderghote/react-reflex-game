import { decorate, configure, observable, action, runInAction } from "mobx";
import Score from "../models/Score";
import Api from "../api";

configure({ enforceActions: "observed" });

class Store {
  start;
  interval;
  p1Name = `Player 1`;
  p2Name = `Player 2`;
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

  scores = [];

  constructor() {
    this.api = new Api("score");
    this.getAll();
    console.log(this.scores);
  }

  getAll = () => {
    this.api.getAll().then(d => d.forEach(this._addScore));
  };

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
    // console.log(
    //   `timer ${this.timerIsOn} ready ${this.ready} set ${this.set} go ${
    //     this.go
    //   }`
    // );

    console.log(`ready`);

    this.ready = true;
    this.setSetTimeout = setTimeout(this.setSet, 1000);
    this.startTimeout = setTimeout(
      this.startTimer,
      Math.random() * (5000 - 2000) + 2000
    );
  };

  setSet = () => {
    console.log(`set`);
    this.set = true;
  };

  startTimer = () => {
    console.log(`start game`);

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
    // console.log(this.p1);

    this.p1 = (Date.now() - this.start) / 1000;
  };

  setP1Name = name => {
    name ? (this.p1Name = name) : (this.p1Name = `Player 1`);
    this.p1Ready = !this.p1Ready;
    console.log(`${this.p1Name} ready ${this.p1Ready}`);
  };

  setP2Name = name => {
    name ? (this.p2Name = name) : (this.p2Name = `Player 2`);
    this.p2Ready = !this.p2Ready;
    console.log(`${this.p2Name} ready ${this.p2Ready}`);
  };

  setP2 = () => {
    // console.log(this.p2);

    this.p2 = (Date.now() - this.start) / 1000;
  };

  endTimer = (key, player) => {
    console.log(this.gameIsStarted, this.timerIsOn);

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
      //pressed too early code
      this.timerIsOn = false;
      this.p1Ready = false;
      this.p2Ready = false;
      this.p1Finished = true;
      this.p2Finished = true;

      this.startSequence();
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
      this.addScore({ winner: this.winner, loser: this.loser });
    }
  };

  //APi

  addScore = data => {
    // console.log(`addScore`);
    // console.log(
    //   data.winner.name,
    //   data.winner.time,
    //   data.loser.name,
    //   data.loser.time
    // );

    const newScore = new Score(
      data.winner.name,
      data.loser.name,
      data.winner.time,
      data.loser.time
    );

    // console.log(newScore.values);
    // const newScore = new Score();
    // newScore.updateFromServer(data);

    this.scores.push(newScore);

    this.api.create(newScore).then(scoreValues => {
      newScore.updateFromServer(scoreValues);
      // console.log(newScore);
    });
  };

  _addScore = values => {
    console.log(values.values);

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
    console.log(score);

    this.scores.remove(score);
    this.api.delete(score);
  };
}

decorate(Store, {
  start: observable,
  interval: observable,
  p1Name: observable,
  p2Name: observable,
  p1Ready: observable,
  p2Ready: observable,
  p1: observable,
  p2: observable,
  p1Interval: observable,
  p2Interval: observable,
  p1Finished: observable,
  p2Finished: observable,
  timer: observable,
  timerIsOn: observable,
  gameIsStarted: observable,
  winner: observable,
  loser: observable,
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

const store = new Store();

export default store;
