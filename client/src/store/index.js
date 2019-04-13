import { decorate, configure, observable, action } from "mobx";

configure({ enforceActions: "observed" });

class Store {
  start;
  interval;
  p1 = 0;
  p2 = 0;
  p1Interval;
  p2Interval;
  p1Finished = false;
  p2Finished = false;

  timerIsOn = false;

  ready = false;
  set = false;
  go = false;

  startSequence = () => {
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
    console.log(this.p1);

    this.p1 = (Date.now() - this.start) / 1000;
  };

  setP2 = () => {
    console.log(this.p2);

    this.p2 = (Date.now() - this.start) / 1000;
  };

  endTimer = (key, player) => {
    console.log(key);
    if (player === 1) {
      clearInterval(this.p1Interval);
      this.p1Finished = true;
      if ((Date.now() - this.start) / 1000) {
        this.p1 = (Date.now() - this.start) / 1000;
      } else {
        this.p1 = 0;
      }
    } else if (player === 2) {
      clearInterval(this.p2Interval);
      this.p2Finished = true;
      if ((Date.now() - this.start) / 1000) {
        this.p2 = (Date.now() - this.start) / 1000;
      } else {
        this.p2 = 0;
      }
    }
    if (this.p1Finished && this.p2Finished) {
      this.timerIsOn = false;
    }
  };
}

decorate(Store, {
  start: observable,
  interval: observable,
  p1: observable,
  p2: observable,
  p1Interval: observable,
  p2Interval: observable,
  p1Finished: observable,
  p2Finished: observable,
  timer: observable,
  timerIsOn: observable,
  ready: observable,
  set: observable,
  go: observable,
  startTimer: action,
  endTimer: action,
  setP1: action,
  setP2: action,
  startSequence: action,
  setSet: action,
  setGo: action
});

const store = new Store();

export default store;
