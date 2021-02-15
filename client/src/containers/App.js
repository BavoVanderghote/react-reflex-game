import React from "react";
import { Route, Switch } from "react-router-dom";
import { ROUTES } from "../constants/";
import styles from "./App.module.css";
import { inject } from "mobx-react";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

import Game from "./Game";
import Leaderboard from "./Leaderboard";

const App = ({ uiStore }) => {
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
          <Route
            path={ROUTES.landing}
            exact
            strict
            component={uiStore.authUser ? Game : Login}
          />
          <Route path={ROUTES.game} component={Game} />
          <Route path={ROUTES.leaderboard} component={Leaderboard} />
          <Route path={ROUTES.login} component={Login} />
          <Route path={ROUTES.register} component={Register} />
        </Switch>
      </main>
    </>
  );
};

export default inject("uiStore")(App);
