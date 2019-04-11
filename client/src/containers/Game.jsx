import React from "react";
import styles from "./Game.module.css";
import { inject, observer } from "mobx-react";

import Player from "../components/Player";
import StartSequence from "../components/StartSequence";
import Counter from "../components/Counter";
import Navigation from "../components/Navigation";

const Game = ({ store }) => {
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
        <Counter player={store.p1} key="q" />
        <Counter player={store.p2} key="m" />
      </div>
      <Navigation />
    </>
  );
};

export default inject("store")(observer(Game));
