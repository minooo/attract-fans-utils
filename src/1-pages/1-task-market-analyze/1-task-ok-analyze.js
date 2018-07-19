import React, { Component } from "react";
import { common } from "4-utils";

export default class extends Component {
  state = {};
  componentDidMount() {
    console.log(this.props, "lala");
    common.setTitle("任务完成分析");
  }
  render() {
    return <div>任务完成分析</div>;
  }
}
