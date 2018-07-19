import React, { Fragment, Component } from "react";
import { Layout, Menu, Icon } from "antd";
import { withRouter } from "react-router-dom"
import { observer, inject } from "mobx-react";
import { WrapLink } from "0-components";
import { common } from "4-utils";

const { Header, Sider, Footer } = Layout;
const { SubMenu } = Menu;

const keysArr = path => {
  if (path.includes("/create-task-poster")) {
    return [["0"], ["01"], "创建任务海报"];
  } else if (path.includes("/base-info-set")) {
    return [["0"], ["02"], "基本信息设置"];
  } else if (path.includes("/member-join-tip")) {
    return [["0"], ["03"], "成员加入提醒"];
  } else if (path.includes("/first-task-ok")) {
    return [["0"], ["04"], "一阶任务完成"];
  } else if (path.includes("/second-task-ok")) {
    return [["0"], ["05"], "二阶任务完成"];
  } else if (path.includes("/third-task-ok")) {
    return [["0"], ["06"], "三阶任务完成"];
  } else if (path.includes("/message-reply")) {
    return [["0"], ["07"], "客服消息回复"];
  } else if (path.includes("/users-analyze")) {
    return [["1"], ["10"], "用户分析"];
  } else if (path.includes("/task-ok-analyze")) {
    return [["1"], ["11"], "任务完成分析"];
  } else if (path.includes("/prize-disbution")) {
    return [["1"], ["12"], "奖品发放情况"];
  } else if (path.includes("/shielding-detection")) {
    return [["2"], ["2"], "预警机制"];
  }
  return [["0"], ["00"], "首页"];
};

class CommonLayout extends Component {
  constructor(props){
    super(props)
    const { location } = this.props;
    const arr = keysArr(location.pathname);
    console.log(arr[0], 'ciao')
    this.state = {
      handleOpenKeys: arr[0]
    }
  }
  onOpenChange = openKeys => {
    console.log(openKeys, "openkey")
    this.setState(() => ({ handleOpenKeys: [...openKeys] }))
  }
  handleClick = e => {
    const { history } = this.props
    const key = e.key.slice(0, 1)
    this.setState(() => ({ handleOpenKeys: [key] }))
    switch (e.key) {
      case "00":
        history.push("/");
        break;
      case "01":
        history.push("/create-task-poster");
        break;
      case "02":
        history.push("/base-info-set");
        break;
      case "03":
        history.push("/member-join-tip");
        break;
      case "04":
        history.push("/first-task-ok");
        break;
      case "05":
        history.push("/second-task-ok");
        break;
      case "06":
        history.push("/third-task-ok");
        break;
      case "07":
        history.push("/message-reply");
        break;
      case "10":
        history.push("/users-analyze");
        break;
      case "11":
        history.push("/task-ok-analyze");
        break;
      case "12":
        history.push("/prize-disbution");
        break;
      case "2":
        history.push("/shielding-detection");
        break;
      default:
        console.info("menu click");
    }
  }
  onResponse = collapsed => {
    const { menuCollapsed } = this.props;
    menuCollapsed.setCollapsed(collapsed);
  };
  onToggle = () => {
    const { menuCollapsed } = this.props;
    menuCollapsed.setCollapsed(!menuCollapsed.isCollapsed);
  };
  render() {
    const { handleOpenKeys } = this.state
    const { menuCollapsed, location, children } = this.props;
    const arr = keysArr(location.pathname);
    const menuProps = menuCollapsed.isCollapsed ? {} : { openKeys: handleOpenKeys || arr[0] }
    common.setTitle(arr[2]);
    // if (!user || user) return <LoadingFetch />
    return (
      <Fragment>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={menuCollapsed.isCollapsed}
            breakpoint="lg"
            onCollapse={this.onResponse}
            className="admin-layout-sider"
            width={220}
            style={{ overflow: "auto", height: "100vh", position: "fixed", left: 0 }}
          >
            <WrapLink
              style={{ background: "#002140" }}
              className="block"
              to="/"
            >
              <div
                className={`admin-logo ${
                  menuCollapsed.isCollapsed ? "admin-logo-collapsed" : "admin-logo-normal"
                }`}
              />
            </WrapLink>

            <Menu
              theme="dark"
              mode="inline"
              {...menuProps}
              onOpenChange={this.onOpenChange}
              selectedKeys={arr[1]}
              onClick={this.handleClick}
            >
              <SubMenu
                key="0"
                title={
                  <span>
                    <Icon type="form" />
                    <span>营销活动设置</span>
                  </span>
                }
              >
                <Menu.Item key="00">总览</Menu.Item>
                <Menu.Item key="01">创建任务海报</Menu.Item>
                <Menu.Item key="02">基本信息设置</Menu.Item>
                <Menu.Item key="03">成员加入提醒</Menu.Item>
                <Menu.Item key="04">一介任务完成</Menu.Item>
                <Menu.Item key="05">二介任务完成</Menu.Item>
                <Menu.Item key="06">三介任务完成</Menu.Item>
                <Menu.Item key="07">客服消息回复</Menu.Item>
              </SubMenu>
              <SubMenu
                key="1"
                title={
                  <span>
                    <Icon type="bank" />
                    <span>任务营销分析</span>
                  </span>
                }
              >
                <Menu.Item key="10">用户分析</Menu.Item>
                <Menu.Item key="11">任务完成分析</Menu.Item>
                <Menu.Item key="12">奖品发放情况</Menu.Item>
              </SubMenu>
              <Menu.Item key="2">
                <Icon type="line-chart" />
                <span className="nav-text">预警机制</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ marginLeft: menuCollapsed.isCollapsed ? 80 : 220 }} className="transition-margin">
            <Header style={{ padding: "0 24px 0 0", backgroundColor: "#fff" }} className="flex jc-between ai-center admin-head-shadow">
              <Icon
                className="admin-com-trigger"
                type={menuCollapsed.isCollapsed ? "menu-unfold" : "menu-fold"}
                onClick={this.onToggle}
              />
              <div>shadow</div>
            </Header>
            <div className="admin-common-content plr25 ptb20 bg-white">
              { children }
            </div>
            <Footer style={{ textAlign: "center" }}>
              嘟嘟插件中心 Copyright © 2017-2018 DuduApp Ltd All Rights Reserved
              豫ICP备14012584号. 河南嘟嘟计算机科技有限公司
            </Footer>
          </Layout>
        </Layout>
      </Fragment>
    );
  }
}

export default withRouter(inject("menuCollapsed")(observer(CommonLayout)))
