import React, { Component } from "react";
import styles from "./Counter.module.css";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";
class Counter extends Component {
  constructor(props) {
    super(props);
    this.keyDownFunction = this.keyDownFunction.bind(this);
  }
  render() {
    if (this.props.gameStore.timerIsOn) {
      return (
        <div className={styles.container}>
          <p className={styles.counter}>{this.props.playerTime}</p>
          <p className={styles.unit}>s</p>
        </div>
      );
    } else {
      return (
        <div className={styles.container}>
          <p className={styles.counter}>{this.props.playerTime}</p>
          <p className={styles.unit}>s</p>
        </div>
      );
    }
  }
  keyDownFunction(e, key, player) {
    if (e.keyCode === parseInt(key)) {
      //q
      console.log(`${key} pressed by player ${player}`);

      this.props.gameStore.endTimer(key, parseInt(player));
    }
  }
  componentDidMount() {
    const key = this.props.keyCode;
    const player = this.props.player;

    document.addEventListener(
      "keydown",
      e => this.keyDownFunction(e, key, player),
      false
    );
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyDownFunction, false);
  }
}

Counter.propTypes = {
  playerTime: PropTypes.number.isRequired,
  keyCode: PropTypes.string.isRequired,
  player: PropTypes.string.isRequired
};

export default inject("gameStore")(observer(Counter));
