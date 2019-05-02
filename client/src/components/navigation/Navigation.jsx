import React from "react";
import styles from "./Navigation.module.css";
import { Link } from "react-router-dom";
import { inject } from "mobx-react";

const Navigation = ({ uiStore }) => {
  // const handleClickLogout = () => {
  //   uiStore.logout();
  //   history.push(ROUTES.landing);
  // };

  return (
    <div className={styles.wrapper}>
      <p className={styles.credit}>&copy; Bavo Vanderghote 2019</p>
      <div className={styles.linkWrapper}>
        <Link className={styles.link} to="/game">
          game
        </Link>
        <Link className={styles.link} to="/leaderboard">
          leaderboard
        </Link>
      </div>
      <div className={styles.logoutWrapper}>
        <p className={styles.username}>Ingelogd als {uiStore.authUser.name}</p>
        <button className={styles.logout} onClick={uiStore.logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default inject("uiStore")(Navigation);
