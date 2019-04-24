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
  score: PropTypes.shape({
    score: PropTypes.object.isRequired,
    _id: PropTypes.string.isRequired,
    winner: PropTypes.string.isRequired,
    winnerTime: PropTypes.number.isRequired,
    loser: PropTypes.string.isRequired,
    loserTime: PropTypes.number.isRequired,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    __v: PropTypes.number
  }),
  onDelete: PropTypes.func,
  onRematch: PropTypes.func
};

export default ListItem;
