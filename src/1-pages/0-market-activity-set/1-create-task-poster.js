import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { http } from "4-utils";
import { Nav } from "0-components";

class Home extends Component {
  state = {};

  componentDidMount() {
    http.get("applications").then(response => {
      console.log(response, "rrr");
    });
  }
  render() {
    return (
      <div>
        <Nav />
      </div>
    );
  }
}

export default inject("user")(observer(Home));
