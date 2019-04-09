import React from "react";
import styles from "./Game.module.css";

import Player from "../components/Player";
import StartSequence from "../components/StartSequence";
import Counter from "../components/Counter";
import Navigation from "../components/Navigation";

const Game = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <Player number="1" button="Q" />
        <Player number="2" button="M" />
      </div>
      <div className={styles.sequence}>
        <StartSequence />
      </div>
      <div className={styles.wrapper}>
        <Counter />
        <Counter />
      </div>
      <Navigation />
    </>
  );
};

export default Game;
