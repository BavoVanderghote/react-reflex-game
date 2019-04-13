import React from "react";
import styles from "./StartSequence.module.css";
import { inject, observer } from "mobx-react";

const StartSequence = ({ store }) => {
  if (store.ready && !store.set && !store.go && !store.timerIsOn) {
    return (
      <div className={styles.wrapper}>
        <button className={styles.red} onClick={store.startSequence}>
          Ready
        </button>
        <button className={styles.base}>Set</button>
        <button className={styles.base}>GO</button>
      </div>
    );
  } else if (store.ready && store.set && !store.go && !store.timerIsOn) {
    return (
      <div className={styles.wrapper}>
        <button className={styles.red} onClick={store.startSequence}>
          Ready
        </button>
        <button className={styles.red}>Set</button>
        <button className={styles.base}>GO</button>
      </div>
    );
  } else if (store.ready && store.set && store.go && store.timerIsOn) {
    return (
      <div className={styles.wrapper}>
        <button className={styles.green} onClick={store.startSequence}>
          Ready
        </button>
        <button className={styles.green}>Set</button>
        <button className={styles.green}>GO</button>
      </div>
    );
  } else {
    return (
      <div className={styles.wrapper}>
        <button className={styles.ready} onClick={store.startSequence}>
          Ready
        </button>
        <button className={styles.base}>Set</button>
        <button className={styles.base}>GO</button>
      </div>
    );
  }
};

export default inject("store")(observer(StartSequence));
