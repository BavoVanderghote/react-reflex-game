import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import ListItem from "./ListItem";

export const score = {
  _id: "5cbb689246bf21a8ca7bc262",
  winner: "player 1",
  winnerTime: 0.25,
  loser: "player 2",
  loserTime: 0.35,
  createdAt: "2019-04-20T18:44:34.872Z",
  updatedAt: "2019-04-21T19:14:26.988Z",
  __v: 0
};

export const actions = {
  onDelete: action("onDelete"),
  onRematch: action("onRematch")
};

storiesOf("ListItem", module).add("default", () => (
  <ListItem score={score} {...actions} />
));
