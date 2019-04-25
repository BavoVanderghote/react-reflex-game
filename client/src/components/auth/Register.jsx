import React, { Component } from "react";
import { inject } from "mobx-react";
import { withRouter } from "react-router-dom";
import { ROUTES } from "../../constants";
import styles from "./Register.module.css";
import { Link } from "react-router-dom";
class Register extends Component {
  constructor() {
    super();
    this.state = { email: "", pwd: "", pwd2: "", name: "" };
  }

  handleChange = e => {
    const input = e.currentTarget;
    const state = { ...this.state };
    state[input.name] = input.value;
    this.setState(state);
  };

  handleSubmit = e => {
    e.preventDefault();
    const { uiStore, history } = this.props;
    const { email, pwd, name } = this.state;
    uiStore.register(email, pwd, name).then(() => {
      history.push(ROUTES.login);
    });
  };

  render() {
    const { email, pwd, pwd2, name } = this.state;
    return (
      <>
        <div className={styles.container}>
          <h2 className={styles.label}>It's my first time here.</h2>
          <form onSubmit={this.handleSubmit}>
            <label className={styles.formLabel} htmlFor="email">
              name
              <input
                className={styles.input}
                type="test"
                name="name"
                id="name="
                value={name}
                onChange={this.handleChange}
              />
            </label>
            <label className={styles.formLabel} htmlFor="email">
              email
              <input
                className={styles.input}
                type="email"
                name="email"
                id="email="
                value={email}
                onChange={this.handleChange}
              />
            </label>
            <label className={styles.formLabel} htmlFor="username">
              password
              <input
                className={styles.input}
                type="password"
                name="pwd"
                id="pwd"
                value={pwd}
                onChange={this.handleChange}
              />
            </label>
            <label className={styles.formLabel} htmlFor="username">
              repeat password
              <input
                className={styles.input}
                type="password"
                name="pwd2"
                id="pwd2"
                ref={pwd2}
                onChange={this.handleChange}
              />
            </label>
            <input
              className={styles.button}
              type="submit"
              value="register"
              disabled={pwd && pwd !== pwd2}
            />
          </form>
        </div>
        <Link className={styles.redirect} to="/signin">
          Been here before? Login
        </Link>
      </>
    );
  }
}

export default inject("uiStore")(withRouter(Register));
