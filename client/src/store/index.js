import { decorate, configure, observable, action } from "mobx";

configure({ enforceActions: "observed" });

class Store {
  start;
  interval;
  timer;
  delta = 0;
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

  endTimer = () => {
    this.isOn = false;
    this.delta = (Date.now() - this.start) / 1000;
    console.log(`${this.output} seconds`);
    clearInterval(this.interval);
  };
}

decorate(Store, {
  start: observable,
  interval: observable,
  delta: observable,
  timer: observable,
  isOn: observable,
  startTimer: action,
  endTimer: action,
  setTimer: action
});

const store = new Store();

export default store;
