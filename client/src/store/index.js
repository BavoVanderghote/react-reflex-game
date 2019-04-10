import { decorate, configure } from "mobx";

configure({ enforceActions: "observed" });

class Store {
  start;
  output;

  startTimer = () => {
    this.start = Date.now();
  };

  endTimer = () => {
    const delta = Date.now() - this.start;
    this.output = delta / 1000;
    console.log(`${this.output} seconds`);
  };
}

decorate(Store, {});

const store = new Store();

export default store;
