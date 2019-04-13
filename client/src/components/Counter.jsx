import React, { Component } from "react";
import styles from "./Counter.module.css";
import { inject, observer } from "mobx-react";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.keyDownFunction = this.keyDownFunction.bind(this);
  }
  render() {
    if (this.props.store.timerIsOn) {
      return (
        <div className={styles.container}>
          <p className={styles.counter}>{this.props.player}</p>
          <p className={styles.unit}>s</p>
        </div>
      );
    } else {
      return (
        <div className={styles.container}>
          <p className={styles.counter}>{this.props.player}</p>
          <p className={styles.unit}>s</p>
        </div>
      );
    }
  }
  keyDownFunction(e) {
    if (e.keyCode === 81) {
      //q
      console.log(`q pressed`);
      this.props.store.endTimer(`q`, 1);
    }
    if (e.keyCode === 77) {
      //m
      console.log(`m pressed`);
      this.props.store.endTimer(`m`, 2);
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", this.keyDownFunction, false);
    console.log(`did mount ${this.props.player}`);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyDownFunction, false);
  }
}

export default inject("store")(observer(Counter));
