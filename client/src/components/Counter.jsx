import React from "react";
import styles from "./Counter.module.css";

const Counter = () => {
  return (
    <div className={styles.container}>
      <p className={styles.counter}>0,00</p>
      <p className={styles.unit}>ms</p>
    </div>
  );
};

export default Counter;
