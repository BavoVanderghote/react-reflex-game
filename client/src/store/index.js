import { decorate, configure, observable, action } from "mobx";
// import Score from "../models/Score";
import Api from "../api";

configure({ enforceActions: "observed" });

class Store {
  start;
  interval;
  p1Name = `player 1`;
  p2Name = `player 2`;
  p1Ready = false;
  p2Ready = false;
  p1 = 0;
  p2 = 0;
  p1Interval;
  p2Interval;
  p1Finished = false;
  p2Finished = false;

  timerIsOn = false;
  gameIsFinished = false;
  winner = {};
  loser = {};

  ready = false;
  set = false;
  go = false;

  constructor() {
    this.api = new Api("books");
  }

  //GAME

  checkForStartGame = () => {
    if (this.p1Ready && this.p2Ready) {
      this.startSequence();
    }
  };

  startSequence = () => {
    this.gameIsFinished = false;
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
    setTimeout(this.setSet, 1000);
    setTimeout(this.startTimer, Math.random() * (5000 - 2000) + 2000);
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
    console.log(`player 1 ready`);
    this.p1Name = name;
    this.p1Ready = true;
  };

  setP2Name = name => {
    console.log(`player 2 ready`);
    this.p2Name = name;
    this.p2Ready = true;
  };

  setP2 = () => {
    // console.log(this.p2);

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
    } else {
      console.log(`player ${player} pressed too early`);
      //pressed too early code
    }
    if (this.p1Finished && this.p2Finished && this.timerIsOn) {
      this.timerIsOn = false;
      this.gameIsFinished = true;
      this.p1Ready = false;
      this.p2Ready = false;

      console.log(`game finisched? ${this.gameIsFinished}`);
      console.log(
        `[winner] ${this.winner.name} took ${this.winner.time} seconds`
      );
      console.log(`[loser] ${this.loser.name} took ${this.loser.time} seconds`);
      // this.addScore({ winner: this.winner, loser: this.loser });
    }
  };

  //APi

  // addScore = data => {
  //   console.log(`addScore`);

  //   const newScore = new Score({
  //     winner: data.winner.name,
  //     loser: data.loser.name,
  //     winnerTime: data.winner.time,
  //     loserTime: data.loser.time
  //   });
  //   console.log(`toe te voegen score ${newScore}`);
  // newScore.updateFromServer(data);

  // this.scores.push(newScore);
  // this.api
  //   .create(newScore)
  //   .then(scoreValues => newScore.updateFromServer(scoreValues));
  // };

  // _addBook = values => {
  //   const score = new Score(this.rootStore);
  //   score.updateFromServer(values);
  //   runInAction(() => this.books.push(score));
  // };
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
  gameIsFinished: observable,
  winner: observable,
  loser: observable,
  ready: observable,
  set: observable,
  go: observable,
  startTimer: action,
  endTimer: action,
  setP1: action,
  setP2: action,
  startSequence: action,
  setSet: action,
  setGo: action,
  setP1Name: action,
  setP2Name: action
});

const store = new Store();

export default store;
