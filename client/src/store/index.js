import { decorate, configure, observable, action } from "mobx";

configure({ enforceActions: "observed" });

class Store {
  start;
  interval;
  p1 = 0;
  p2 = 0;
  timer;
  isOn = false;

  startTimer = () => {
    if (!this.isOn) {
      this.isOn = true;
      this.start = Date.now();
      this.interval = setInterval(() => this.setTimer(), 1);
    } else {
      console.log(`Timer already running`);
    }
  };

  setTimer = () => {
    console.log(`timer: ${this.timer}`);

    this.timer = (Date.now() - this.start) / 1000;
  };

  endTimer = (key, player) => {
    console.log(key);
    clearInterval(this.interval);
    this.isOn = false;
    if (player === 1) {
      if ((Date.now() - this.start) / 1000) {
        this.p1 = (Date.now() - this.start) / 1000;
      } else {
        this.p1 = 0;
      }
    } else if (player === 2) {
      if ((Date.now() - this.start) / 1000) {
        this.p2 = (Date.now() - this.start) / 1000;
      } else {
        this.p2 = 0;
      }
    }
  };
}

decorate(Store, {
  start: observable,
  interval: observable,
  p1: observable,
  p2: observable,
  timer: observable,
  isOn: observable,
  startTimer: action,
  endTimer: action,
  setTimer: action
});

const store = new Store();

export default store;
