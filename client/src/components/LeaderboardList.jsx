import React from "react";
// import styles from "./LeaderboardList.module.css";
import { inject, observer } from "mobx-react";
import ListItem from "./ListItem";

const LeaderboardList = ({ store }) => {
  const { scores } = store;

  return (
    <>
      {scores.length > 0 ? (
        <ul>
          {scores.map(score => (
            <ListItem
              key={score.id}
              score={score}
              // onUpdate={store.updateScore}
              onDelete={store.deleteScore}
            />
          ))}
        </ul>
      ) : (
        <p>No scores yet, play a game!</p>
      )}
    </>
  );
};

export default inject("store")(observer(LeaderboardList));
