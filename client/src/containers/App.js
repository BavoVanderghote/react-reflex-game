import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import { ROUTES } from "../constants/";
import styles from "./App.module.css";
import { inject } from "mobx-react";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

import Game from "./Game";
import leaderboard from "./Leaderboard";

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
          <Route path={ROUTES.game} exact strict component={Game} />
          <Route path={ROUTES.leaderboard} component={leaderboard} />
          <Route path={ROUTES.login} component={Login} />
          <Route path={ROUTES.register} component={Register} />
          <Route
            path={ROUTES.landing}
            exact
            strict
            render={() => (
              <div className={styles.container}>
                <p className={styles.label}>Welcome, human.</p>
                {uiStore.authUser ? (
                  <Link className={styles.link} to={ROUTES.game}>
                    Play
                  </Link>
                ) : (
                  <ul className={styles.container}>
                    <li>
                      <Link className={styles.link} to={ROUTES.login}>
                        Log in
                      </Link>
                    </li>
                    <li>
                      <Link className={styles.link} to={ROUTES.register}>
                        Register
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            )}
          />
        </Switch>
      </main>
    </>
  );
};

export default inject("uiStore")(App);
