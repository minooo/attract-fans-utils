import React, { Component } from "react";
import { Menu, Modal, message } from "antd";
import { withRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { common } from "4-utils";
const { searchToObj, setTitle } = common;
const config = [
  {
    text: "基本信息设置",
    path: "/base-info-set",
    key: "0"
  },
  {
    text: "成员加入提醒",
    path: "/member-join-tip",
    key: "1"
  },
  {
    text: "一阶任务完成",
    path: "/first-task-ok",
    key: "2"
  },
  {
    text: "二阶任务完成",
    path: "/second-task-ok",
    key: "3"
  },
  {
    text: "三阶任务完成",
    path: "/third-task-ok",
    key: "4"
  },
  {
    text: "客服消息回复",
    path: "/message-reply",
    key: "5"
  }
];
class CommonLayout extends Component {
  state = { visible: false };
  // 取消弹出框

  hideModal = () => {
    this.setState({
      visible: false
    });
  };
  // 路由点击事件
  handleClick = e => {
    const { location } = this.props;
    const { id } = this.props.match.params;
    const { begin } = searchToObj(window.location.hash);
    const { submit, poster_id } = this.props;
    if (!id && !poster_id) {
      message.error("你还未创建海报", 2);
    } else if (
      !submit &&
      location.pathname.includes("/base-info-set") &&
      !begin
    ) {
      message.error("请先提交基本设置信息", 2);
    } else if (parseInt(begin, 10) === 1 && parseInt(e.key, 10) === 0) {
      message.error("活动开始不能修改基本信息", 3);
    } else if (!submit) {
      this.setState({
        visible: true,
        key: e.key
      });
    } else {
      this.setState(
        {
          key: e.key
        },
        () => this.routerLink()
      );
    }
  };
  // 路由跳转事件
  routerLink = () => {
    const { history, poster_id, poster_begin } = this.props;
    const { id } = this.props.match.params;
    const begin =
      searchToObj(decodeURIComponent(window.location.hash)).begin ||
      poster_begin;
    const { key } = this.state;
    this.setState({
      visible: false
    });
    const paramId = id || poster_id;
    const path = config[parseInt(key, 10)].path;
    history.push(`${path}_${paramId}?begin=${begin}`);
  };

  // 筛选当前的key
  presentKey = () => {
    const { location } = this.props;
    const key = config
      .map(item => {
        if (location.pathname.includes(item.path)) {
          return item.key;
        }
        return undefined;
      })
      .filter(x => x);
    return key;
  };
  render() {
    // 当前的key值
    const { location } = this.props;
    setTitle(config.find(n => location.pathname.includes(n.path)).text);
    const Current = this.presentKey();
    return (
      <div>
        <Menu
          selectable
          onClick={this.handleClick}
          mode="horizontal"
          defaultSelectedKeys={["0"]}
          selectedKeys={Current}
          style={{ display: "flex", justifyContent: "center" }}
        >
          {config.map(item => (
            <Menu.Item key={item.key}>{item.text}</Menu.Item>
          ))}
        </Menu>
        <Modal
          title="你确定要离开吗?"
          visible={this.state.visible}
          onOk={this.routerLink}
          onCancel={this.hideModal}
          okText="确认"
          cancelText="取消"
        >
          <p>你修改的信息还未提交，如果离开这些信息将会消失。</p>
        </Modal>
      </div>
    );
  }
}

export default withRouter(inject("menuCollapsed")(observer(CommonLayout)));
