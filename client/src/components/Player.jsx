import React from "react";
import styles from "./Player.module.css";

const Player = ({ number, button }) => {
  return (
    <div className={styles.wrapper}>
      <label>
        <h2 className={styles.label}>Player {number}</h2>
        <input className={styles.nameInput} type="text" />
      </label>
      <p className={styles.copy}>Press {button}</p>
    </div>
  );
};

export default Player;
