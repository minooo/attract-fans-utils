import React, { Component } from "react";
import { common } from "4-utils";

export default class extends Component {
  state = {};
  componentDidMount() {
    console.log(this.props, "lala");
    common.setTitle("用户分析");
  }
  render() {
    return <div>用户分析</div>;
  }
}
