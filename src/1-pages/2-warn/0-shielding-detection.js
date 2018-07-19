import React, { Component } from "react";
import { common } from "4-utils";

export default class extends Component {
  state = {};
  componentDidMount() {
    console.log(this.props, "lala");
    common.setTitle("监测拉黑");
  }
  render() {
    return <div>监测拉黑</div>;
  }
}
