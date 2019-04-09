import React from "react";
import styles from "./Leaderboard.module.css";

import LeaderboardList from "../components/LeaderboardList";
import Navigation from "../components/Navigation";

const Leaderboard = () => {
  return (
    <>
      <h2 className={styles.title}>Leaderboard</h2>
      <section className={styles.leaderboard}>
        <LeaderboardList />
      </section>
      <div className={styles.navigation}>
        <Navigation />
      </div>
    </>
  );
};

export default Leaderboard;
