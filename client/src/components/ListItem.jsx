import React from "react";
import styles from "./ListItem.module.css";

const ListItem = () => {
  return (
    <div className={styles.container}>
      <div className={styles.winner}>
        <p>Player 1</p>
        <p>0,34 ms</p>
      </div>
      <div className={styles.loser}>
        <p>Player 2</p>
        <p>0,37 ms</p>
      </div>
      <button className={styles.delete}>Delete</button>
      <button className={styles.rematch}>Rematch</button>
    </div>
  );
};

export default ListItem;
