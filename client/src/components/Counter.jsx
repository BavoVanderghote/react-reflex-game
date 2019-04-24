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
    if (this.props.store.timerIsOn) {
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

      this.props.store.endTimer(key, parseInt(player));
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
  sendDataToStore = (key, player) => {};
}

Counter.propTypes = {
  playerTime: PropTypes.number.isRequired,
  keyCode: PropTypes.number.isRequired,
  player: PropTypes.number.isRequired
};

export default inject("store")(observer(Counter));
