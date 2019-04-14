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
        <Player
          setNameFunction={store.setP1Name}
          ready={store.p1Ready}
          number="1"
          button="Q"
        />
        <Player
          setNameFunction={store.setP2Name}
          ready={store.p2Ready}
          number="2"
          button="M"
        />
      </div>
      <div className={styles.sequence}>
        <StartSequence />
      </div>
      <div className={styles.wrapper}>
        <Counter playerTime={store.p1} keyCode="81" player="1" />
        <Counter playerTime={store.p2} keyCode="77" player="2" />
      </div>
      <Navigation />
    </>
  );
};

export default inject("store")(observer(Game));
