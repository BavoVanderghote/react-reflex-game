// withAuthentication.jsx
import React from "react";
import { Redirect } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { ROUTES } from "../../constants";

const withAuthorisation = condition => ComponentToProtect => {
  const WithAuthor = props => {
    if (!condition(props.uiStore.authUser)) {
      return <Redirect to={ROUTES.login} />;
    }
    return <ComponentToProtect {...props} authUser={props.uiStore.authUser} />;
  };

  return inject("uiStore")(observer(WithAuthor));
};
export default withAuthorisation;
