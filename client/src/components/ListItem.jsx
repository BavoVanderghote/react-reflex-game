import React from "react";
import styles from "./ListItem.module.css";
import PropTypes from "prop-types";

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

ListItem.propTypes = {
  listItem: PropTypes.shape({
    score: PropTypes.object.isRequired
  }),
  onDelete: PropTypes.func,
  onRematch: PropTypes.func
};

export default ListItem;
