import React from "react";
import styles from "./Counter.module.css";
import { inject, observer } from "mobx-react";

const Counter = ({ store }) => {
  if (store.isOn) {
    return (
      <div className={styles.container}>
        <p className={styles.counter}>{store.timer}</p>
        <p className={styles.unit}>ms</p>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <p className={styles.counter}>{store.delta}</p>
        <p className={styles.unit}>ms</p>
      </div>
    );
  }
};

export default inject("store")(observer(Counter));
