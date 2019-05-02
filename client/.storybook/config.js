import React from "react";
import { configure, addDecorator } from "@storybook/react";
import "../src/index.css";
import { MemoryRouter } from "react-router-dom";

addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>);

const req = require.context("../src", true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
