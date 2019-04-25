import React from "react";
import { inject } from "mobx-react";
import { withRouter } from "react-router-dom";
import { ROUTES } from "../../constants";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";

const Login = ({ uiStore, history }) => {
  const emailInput = React.createRef();
  const pwdInput = React.createRef();

  const handleSubmit = e => {
    e.preventDefault();
    uiStore.login(emailInput.current.value, pwdInput.current.value).then(() => {
      history.push(ROUTES.books);
    });
  };

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.label}>Login, human.</h2>
        <form onSubmit={handleSubmit}>
          <label className={styles.formLabel} htmlFor="email">
            email
            <input
              className={styles.input}
              type="email"
              name="email"
              id="email="
              ref={emailInput}
            />
          </label>
          <label className={styles.formLabel} htmlFor="username">
            password
            <input
              className={styles.input}
              type="password"
              name="password"
              id="password"
              ref={pwdInput}
            />
          </label>
          <input className={styles.button} type="submit" value="Login" />
        </form>
      </div>
      <Link className={styles.redirect} to="/signup">
        First Time? Signup here
      </Link>
    </>
  );
};

export default inject("uiStore")(withRouter(Login));
