import React, { Fragment, PureComponent } from "react";
import { Layout, Menu, Icon } from "antd";
import { withRouter } from "react-router-dom"
import { WrapLink, LoadingFetch } from "0-components";

const { Header, Sider, Footer } = Layout;
const { SubMenu } = Menu;

const keysArr = path => {
  if (path.includes("/create-task-poster")) {
    return [["0"], ["01"], "公众号列表"];
  } else if (path.includes("/base-info-set")) {
    return [["0"], ["02"], "添加公众号"];
  } else if (path.includes("/member-join-tip")) {
    return [["0"], ["03"], "账号日志"];
  } else if (path.includes("/first-task-ok")) {
    return [["0"], ["04"], "我的订单"];
  } else if (path.includes("/second-task-ok")) {
    return [["0"], ["05"], "已购应用"];
  } else if (path.includes("/third-task-ok")) {
    return [["0"], ["06"], "已建活动"];
  } else if (path.includes("/message-reply")) {
    return [["0"], ["07"], "交易明细"];
  } else if (path.includes("/users-analyze")) {
    return [["1"], ["10"], "数据统计"];
  } else if (path.includes("/task-ok-analyze")) {
    return [["1"], ["11"], "应用中心"];
  } else if (path.includes("/prize-disbution")) {
    return [["1"], ["12"], "账户设置"];
  } else if (path.includes("/shielding-detection")) {
    return [["2"], ["2"], "账户设置"];
  }
  return [["0"], ["00"]];
};

class CommonLayout extends PureComponent {
  state = { handleOpenKeys: null }
  componentDidMount() {
    // console.log(this.props, "did")
    // Router.onRouteChangeComplete = () => {
    //   this.setState(() => ({ handleOpenKeys: null }))
    // };
  }
  componentDidUpdate(prevProps) {
    // console.log(prevProps, "didupdate from AdminLayout")
  }
  onLogout = () => {
    const { onLogout } = this.props;
    onLogout();
    // Router.replace("/index", "/app")
  }
  onOpenChange = openKeys => {
    console.log(openKeys, "openKeys")
    const val = openKeys && openKeys.length > 0 && openKeys[openKeys.length - 1]
    this.setState(() => ({ handleOpenKeys: [val] }))
  }
  handleClick = e => {
    const { history } = this.props
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
  onToggle = () => {}
  onResponse = () => {}
  render() {
    const { handleOpenKeys } = this.state
    const { user, menu_collapsed, location, children } = this.props;
    const arr = keysArr(location.pathname);
    const menuProps = menu_collapsed ? {} : { openKeys: handleOpenKeys || arr[0] }
    console.log(menuProps, "menu")
    // if (!user || user) return <LoadingFetch />
    return (
      <Fragment>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={menu_collapsed}
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
                  menu_collapsed ? "admin-logo-collapsed" : "admin-logo-normal"
                }`}
              />
            </WrapLink>

            <Menu
              theme="dark"
              mode="inline"
              // defaultOpenKeys={defaultOpenKeys}
              // defaultSelectedKeys={defaultSelectedKeys}
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
          <Layout style={{ marginLeft: menu_collapsed ? 80 : 220 }} className="transition-margin">
            <Header style={{ padding: "0 24px 0 0", backgroundColor: "#fff" }} className="flex jc-between ai-center admin-head-shadow">
              <Icon
                className="admin-com-trigger"
                type={menu_collapsed ? "menu-unfold" : "menu-fold"}
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

export default withRouter(CommonLayout)