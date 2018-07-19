import React, { Component } from "react";
import { common } from "4-utils";

export default class extends Component {
  state = {};
  componentDidMount() {
    console.log(this.props, "lala");
    common.setTitle("成员加入提醒");
  }
  render() {
    return <div>成员加入提醒</div>;
  }
}
