import React from "react";
import styles from "./StartSequence.module.css";
import { inject, observer } from "mobx-react";

const StartSequence = ({ gameStore }) => {
  if (
    gameStore.ready &&
    !gameStore.set &&
    !gameStore.go &&
    !gameStore.timerIsOn
  ) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.red}>
          <p>Ready</p>
        </div>
        <div className={styles.base}>
          <p>Set</p>
        </div>
        <div className={styles.base}>
          <p>GO</p>
        </div>
      </div>
    );
  } else if (
    gameStore.ready &&
    gameStore.set &&
    !gameStore.go &&
    !gameStore.timerIsOn
  ) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.red}>
          <p>Ready</p>
        </div>
        <div className={styles.red}>
          <p>Set</p>
        </div>
        <div className={styles.base}>
          <p>GO</p>
        </div>
      </div>
    );
  } else if (
    gameStore.ready &&
    gameStore.set &&
    gameStore.go &&
    gameStore.timerIsOn
  ) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.green}>
          <p>Ready</p>
        </div>
        <div className={styles.green}>
          <p>Set</p>
        </div>
        <div className={styles.green}>
          <p>GO</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.wrapper}>
        <div className={styles.base}>
          <p>Ready</p>
        </div>
        <div className={styles.base}>
          <p>Set</p>
        </div>
        <div className={styles.base}>
          <p>GO</p>
        </div>
      </div>
    );
  }
};

export default inject("gameStore")(observer(StartSequence));
