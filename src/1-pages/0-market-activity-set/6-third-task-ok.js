import React, { Component } from "react";
import { common } from "4-utils";

export default class extends Component {
  state = {};
  componentDidMount() {
    console.log(this.props, "lala");
    common.setTitle("三阶任务完成");
  }
  render() {
    return <div>三阶任务完成</div>;
  }
}
