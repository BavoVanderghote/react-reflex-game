import React from "react";
import styles from "./StartSequence.module.css";
import { inject, observer } from "mobx-react";

const StartSequence = ({ store }) => {
  return (
    <div className={styles.wrapper}>
      <button className={styles.ready} onClick={store.startTimer}>
        Ready
      </button>
      <button className={styles.base} onClick={store.endTimer}>
        Set
      </button>
      <button className={styles.base}>GO</button>
    </div>
  );
};

export default inject("store")(observer(StartSequence));
