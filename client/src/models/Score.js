import uuid from "uuid";
import { decorate, observable, action, computed } from "mobx";
class Score {
  constructor(winner, loser, winnerTime, loserTime, id = uuid.v4()) {
    this.id = id;
    this.winner = winner;
    this.loser = loser;
    this.winnerTime = winnerTime;
    this.loserTime = loserTime;
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
    this.setLoser(values.loserTime);
  };
}

decorate(Score, {
  id: observable,
  winner: observable,
  loser: observable,
  winnerTime: observable,
  loserTime: observable,
  setId: action,
  setTitle: action,
  setAuthorId: action,
  values: computed,
  author: computed
});

export default Score;
