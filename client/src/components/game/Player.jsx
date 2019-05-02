import React, { Component } from "react";
import styles from "./Player.module.css";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = { player: "" };
  }

  componentDidMount() {
    const { name } = this.props;
    this.setState({ player: name });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { gameStore, setNameFunction } = this.props;
    const { player } = this.state;
    setNameFunction(player);
    gameStore.checkForStartGame();
  };

  handleChangeName = e => {
    this.setState({ player: e.target.value });
  };

  render() {
    const { number, button, ready } = this.props;
    const { player } = this.state;

    if (ready) {
      return (
        <form className={styles.wrapper} onSubmit={this.handleSubmit}>
          <div>
            <h2 className={styles.label}>Player {number}</h2>
            <input
              className={styles.nameInput}
              type="text"
              onChange={this.handleChangeName}
              value={player}
            />
          </div>
          <div className={styles.subtextWrapper}>
            <p className={styles.copy}>Press {button}</p>
            <input
              type="submit"
              value="ready"
              className={styles.buttonPressed}
            />
          </div>
        </form>
      );
    } else {
      return (
        <form className={styles.wrapper} onSubmit={this.handleSubmit}>
          <div>
            <h2 className={styles.label}>Player {number}</h2>
            <input
              className={styles.nameInput}
              type="text"
              onChange={this.handleChangeName}
              value={player}
            />
          </div>
          <div className={styles.subtextWrapper}>
            <p className={styles.copy}>Press {button}</p>
            <input type="submit" value="ready" className={styles.button} />
          </div>
        </form>
      );
    }
  }
}

Player.propTypes = {
  setNameFunction: PropTypes.func.isRequired,
  ready: PropTypes.bool.isRequired,
  number: PropTypes.string.isRequired,
  button: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default inject("gameStore")(observer(Player));
