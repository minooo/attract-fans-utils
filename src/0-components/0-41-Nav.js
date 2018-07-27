import React, { Component } from "react";
import { Menu, Modal, message } from "antd";
import { withRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";

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
    const { id } = this.props.match.params;
    const { submit, poster_id } = this.props;
    if (!id && !poster_id) {
      message.error("你还未创建海报", 2);
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
    const { finish, history, poster_id, location } = this.props;
    const { id } = this.props.match.params;
    const { key } = this.state;
    if (finish && parseInt(key, 10) === 0) {
      this.setState({
        visible: false
      },()=>message.error("活动开始后不能修改基本信息", 2));
    } else {
      this.setState({
        visible: false
      });
      const paramId = id || poster_id;
      const path=config[parseInt(key, 10)].path
      location.pathname.includes("/create-task-poster")
        ? history.replace(`${path}_${paramId}`)
        : history.push(`${path}_${paramId}`);
    }
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
          title="你修改的信息还未提交，你确定要离开吗?"
          visible={this.state.visible}
          onOk={this.routerLink}
          onCancel={this.hideModal}
          okText="确认"
          cancelText="取消"
        >
          <p>如果你还没有提交基本设置，你的活动将不会被创建。</p>
        </Modal>
      </div>
    );
  }
}

export default withRouter(inject("menuCollapsed")(observer(CommonLayout)));
