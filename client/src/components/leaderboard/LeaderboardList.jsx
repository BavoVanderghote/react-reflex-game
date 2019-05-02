import React from "react";
import styles from "./LeaderboardList.module.css";
import { inject, observer } from "mobx-react";
import ListItem from "./ListItem";

const LeaderboardList = ({ gameStore }) => {
  const { scores } = gameStore;

  return (
    <>
      {scores.length > 0 ? (
        <ul>
          {scores.map(score => (
            <ListItem
              key={score.id}
              score={score}
              onRematch={gameStore.rematch}
              onDelete={gameStore.deleteScore}
            />
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>No scores yet, play a game!</p>
      )}
    </>
  );
};

export default inject("gameStore")(observer(LeaderboardList));
