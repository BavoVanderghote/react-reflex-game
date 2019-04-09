import React from "react";
import styles from "./StartSequence.module.css";

const StartSequence = () => {
  return (
    <div className={styles.wrapper}>
      <button className={styles.ready}>Ready</button>
      <button className={styles.base}>Set</button>
      <button className={styles.base}>GO</button>
    </div>
  );
};

export default StartSequence;
