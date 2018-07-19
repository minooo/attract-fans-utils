import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Button } from "antd";
import { Loading } from "0-components";
import { http } from "4-utils";

class Home extends Component {
  state = {};
  componentDidMount() {
    http.get("applications").then(response => {
      console.log(response, "rrr");
    });
  }
  onClick = () => {
    const { user } = this.props;
    user.changeName("zhuang");
  };
  render() {
    const { user } = this.props;
    return (
      <div className="common-c">
        营销活动首页 {user.name}
        <Loading />
        <Button onClick={this.onClick}>click me to change name!</Button>
      </div>
    );
  }
}

export default inject("user")(observer(Home));
