import React from "react";
import styles from "./Player.module.css";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";

const Player = ({
  gameStore,
  number,
  button,
  setNameFunction,
  ready,
  name
}) => {
  const playerInput = React.createRef();

  const handleSubmit = e => {
    e.preventDefault();
    setNameFunction(playerInput.current.value);
    gameStore.checkForStartGame();
  };

  if (ready) {
    return (
      <form className={styles.wrapper} onSubmit={handleSubmit}>
        <div>
          <h2 className={styles.label}>Player {number}</h2>
          <input
            className={styles.nameInput}
            type="text"
            ref={playerInput}
            defaultValue={name}
          />
        </div>
        <div className={styles.subtextWrapper}>
          <p className={styles.copy}>Press {button}</p>
          <input type="submit" value="ready" className={styles.buttonPressed} />
        </div>
      </form>
    );
  } else {
    return (
      <form className={styles.wrapper} onSubmit={handleSubmit}>
        <div>
          <h2 className={styles.label}>Player {number}</h2>
          <input
            className={styles.nameInput}
            type="text"
            ref={playerInput}
            defaultValue={name}
          />
        </div>
        <div className={styles.subtextWrapper}>
          <p className={styles.copy}>Press {button}</p>
          <input type="submit" value="ready" className={styles.button} />
        </div>
      </form>
    );
  }
};

Player.propTypes = {
  setNameFunction: PropTypes.func.isRequired,
  ready: PropTypes.bool.isRequired,
  number: PropTypes.string.isRequired,
  button: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default inject("gameStore")(observer(Player));
