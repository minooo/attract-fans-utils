import React, { Component, Fragment } from "react";
import DevTools from "mobx-react-devtools";
import Boot from "./Boot";
import routes from "./routes";

class Root extends Component {
  render() {
    return (
      <Boot>
        <DevTools />
        <Fragment>{routes}</Fragment>
      </Boot>
    );
  }
}

export default Root;
