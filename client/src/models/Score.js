import uuid from "uuid";
import { decorate, observable, computed, action } from "mobx";
class Score {
  constructor(winner, loser, winnerTime, loserTime, id = uuid.v4()) {
    this.winner = winner;
    this.loser = loser;
    this.winnerTime = winnerTime;
    this.loserTime = loserTime;
    this.id = id;
  }

  setId = id => (this.id = id);
  setWinner = value => (this.winner = value);
  setLoser = value => (this.loser = value);
  setWinnerTime = value => (this.winnerTime = value);
  setLoserTime = value => (this.loserTime = value);

  get values() {
    return {
      winner: this.winner,
      loser: this.loser,
      winnerTime: this.winnerTime,
      loserTime: this.loserTime
    };
  }

  updateFromServer = values => {
    this.setId(values._id);
    this.setWinner(values.winner);
    this.setLoser(values.loser);
    this.setWinnerTime(values.winnerTime);
    this.setLoserTime(values.loserTime);
  };
}

decorate(Score, {
  id: observable,
  winner: observable,
  loser: observable,
  winnerTime: observable,
  loserTime: observable,
  setId: action,
  setWinner: action,
  setLoser: action,
  setWinnerTime: action,
  setLoserTime: action,
  values: computed
});

export default Score;
