import React from "react";
import styles from "./Game.module.css";
import { inject, observer } from "mobx-react";

import Player from "../components/game/Player";
import StartSequence from "../components/game/StartSequence";
import Counter from "../components/game/Counter";
import Navigation from "../components/navigation/Navigation";

const Game = ({ gameStore }) => {
  return (
    <>
      <div className={styles.wrapper}>
        <Player
          setNameFunction={gameStore.setP1Name}
          ready={gameStore.p1Ready}
          number="1"
          button="Q"
          name={gameStore.p1Name}
        />
        <Player
          setNameFunction={gameStore.setP2Name}
          ready={gameStore.p2Ready}
          number="2"
          button="M"
          name={gameStore.p2Name}
        />
      </div>
      <div className={styles.sequence}>
        <StartSequence />
      </div>
      <div className={styles.wrapper}>
        <Counter playerTime={gameStore.p1} keyCode="81" player="1" />
        <Counter playerTime={gameStore.p2} keyCode="77" player="2" />
      </div>
      <Navigation />
    </>
  );
};

export default inject("gameStore")(observer(Game));
