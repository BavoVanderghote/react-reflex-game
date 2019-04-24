import GameStore from "./GameStore";
import UiStore from "./UiStore";

class RootStore {
  constructor() {
    this.uiStore = new UiStore(this);
    this.gameStore = new GameStore(this);
  }
}

export default new RootStore();
