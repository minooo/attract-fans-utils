import React, { Component } from "react";
import { common } from "4-utils";

export default class extends Component {
  state = {};
  componentDidMount() {
    console.log(this.props, "lala");
    common.setTitle("客服消息回复");
  }
  render() {
    return <div>客服消息回复</div>;
  }
}
