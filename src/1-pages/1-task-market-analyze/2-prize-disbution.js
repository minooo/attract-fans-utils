import React, { Component } from "react";
import { common } from "4-utils";

export default class extends Component {
  state = {};
  componentDidMount() {
    console.log(this.props, "lala");
    common.setTitle("奖品发放情况");
  }
  render() {
    return <div>奖品发放情况</div>;
  }
}
