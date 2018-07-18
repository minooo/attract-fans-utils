import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Button } from "antd";
import { Loading } from "0-components";
import { http, common } from "4-utils";

class Home extends Component {
  state = {};
  componentDidMount() {
    console.log(this.props, "lala");
    http.get("applications").then(response => {
      console.log(response, "rrr");
    });
    common.setTitle("营销活动首页");
  }
  onClick = () => {
    const { user, history } = this.props;
    user.changeName("zhuang");
    history.push("/search", { state: { age: 111 } });
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
