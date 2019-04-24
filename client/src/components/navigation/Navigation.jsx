import React from "react";
import styles from "./Navigation.module.css";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.credit}>&copy; Bavo Vanderghote 2019</p>
      <div>
        <Link className={styles.link} to="/">
          game
        </Link>
        <Link className={styles.link} to="/leaderboard">
          leaderboard
        </Link>
      </div>
    </div>
  );
};

export default Navigation;