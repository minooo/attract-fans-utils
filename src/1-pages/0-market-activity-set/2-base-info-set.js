import React, { Component } from "react";
import { common } from "4-utils";

export default class extends Component {
  state = {};
  componentDidMount() {
    console.log(this.props, "lala");
    common.setTitle("基本信息设置");
  }
  render() {
    return <div>基本信息设置</div>;
  }
}
