import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { ROUTES } from "../constants/";
import styles from "./App.module.css";

import Game from "./Game";
import leaderboard from "./Leaderboard";

class App extends Component {
  render() {
    return (
      // <main className={styles.layout}>
      <>
        <header>
          <h1 className={styles.title}>
            React<span className={styles.titleInset}>ion</span> game
          </h1>
        </header>
        <main className={styles.layout}>
          <Switch>
            <Route path={ROUTES.game} exact strict component={Game} />
            <Route path={ROUTES.leaderboard} component={leaderboard} />
          </Switch>
        </main>
      </>
    );
  }
}

export default withRouter(App);
