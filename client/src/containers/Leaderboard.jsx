import React from "react";
import styles from "./Leaderboard.module.css";

import LeaderboardList from "../components/leaderboard/LeaderboardList";
import Navigation from "../components/navigation/Navigation";

import withAuthentication from "../components/auth/WithAuthentication";

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

export default withAuthentication(Leaderboard);
