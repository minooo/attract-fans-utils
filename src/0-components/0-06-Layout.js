import React, { Fragment, Component } from "react";
import { Layout, Menu, Icon } from "antd";
import { withRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { WrapLink } from "0-components";
import { common } from "4-utils";

const { Header, Sider, Footer } = Layout;
const { SubMenu } = Menu;

const keysArr = path => {
  if (path.includes("/users-analyze")) {
    return [["1"], ["10"], "用户分析"];
  } else if (path.includes("/task-ok-analyze")) {
    return [["1"], ["11"], "任务完成分析"];
  } else if (path.includes("/prize-disbution")) {
    return [["1"], ["12"], "奖品发放情况"];
  }
  return [["0"], ["0"], "首页"];
};

class CommonLayout extends Component {
  constructor(props) {
    super(props);
    const { location } = this.props;
    const arr = keysArr(location.pathname);
    this.state = {
      handleOpenKeys: arr[0]
    };
  }
  // 展开二级菜单的事件
  onOpenChange = openKeys => {
    console.log(openKeys, "展开二级菜单执行的事件");
    this.setState(() => ({ handleOpenKeys: [...openKeys] }));
  };
  componentDidUpdate(preProps) {
    const { location } = this.props;
    if (location.pathname !== preProps.location.pathname) {
      const arr = keysArr(location.pathname);
      this.setState(() => ({ handleOpenKeys: arr[0] }));
    }
  }
  handleClick = e => {
    const { history } = this.props;
    const key = e.key.slice(0, 1);
    this.setState(() => ({ handleOpenKeys: [key] }));
    switch (e.key) {
      case "0":
        history.push("/");
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
      default:
        console.info("menu click");
    }
  };
  // 响应执行
  onResponse = collapsed => {
    const { menuCollapsed } = this.props;
    menuCollapsed.setCollapsed(collapsed);
  };
  // 切换执行
  onToggle = () => {
    const { menuCollapsed } = this.props;
    menuCollapsed.setCollapsed(!menuCollapsed.isCollapsed);
  };
  render() {
    const { handleOpenKeys } = this.state;
    const { menuCollapsed, location, children } = this.props;
    const arr = keysArr(location.pathname);
    const menuProps = menuCollapsed.isCollapsed
      ? {}
      : { openKeys: handleOpenKeys || arr[0] };
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
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0
            }}
          >
            <WrapLink
              style={{ background: "#002140" }}
              className="block"
              path="/"
            >
              <div
                className={`admin-logo ${
                  menuCollapsed.isCollapsed
                    ? "admin-logo-collapsed"
                    : "admin-logo-normal"
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
              <Menu.Item key="0">
                <Icon type="form" />
                <span className="nav-text">营销活动设置</span>
              </Menu.Item>
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
            </Menu>
          </Sider>
          <Layout
            style={{
              marginLeft: menuCollapsed.isCollapsed ? 80 : 220,
              minHeight: "100vh"
            }}
            className="transition-margin flex jc-between"
          >
            <Header
              style={{ padding: "0 24px 0 0", backgroundColor: "#fff" }}
              className="flex jc-between ai-center admin-head-shadow"
            >
              <Icon
                className="admin-com-trigger"
                type={menuCollapsed.isCollapsed ? "menu-unfold" : "menu-fold"}
                onClick={this.onToggle}
              />
            </Header>
            <div className="admin-common-content plr25 ptb20 bg-white equal">
              {children}
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

export default withRouter(inject("menuCollapsed")(observer(CommonLayout)));
