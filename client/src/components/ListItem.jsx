import React from "react";
import styles from "./ListItem.module.css";
import { observer, inject } from "mobx-react";

const ListItem = ({ score, onDelete, onRematch }) => {
  // console.log(score);

  return (
    <div className={styles.container}>
      <div className={styles.winner}>
        <p>{score.winner}</p>
        <p>{score.winnerTime} ms</p>
      </div>
      <div className={styles.loser}>
        <p>{score.loser}</p>
        <p>{score.loserTime} ms</p>
      </div>
      <button className={styles.delete} onClick={() => onDelete(score)}>
        Delete
      </button>
      <button className={styles.rematch} onClick={() => onRematch(score)}>
        Rematch
      </button>
    </div>
  );
};
export default inject("store")(observer(ListItem));
