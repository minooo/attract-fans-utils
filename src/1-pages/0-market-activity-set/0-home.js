import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Table, Input, Button, Modal, message } from "antd";
import { http } from "4-utils";
import { WrapLink, LoadingFetch } from "0-components";

const confirm = Modal.confirm;
const { Search } = Input;

class Home extends Component {
  state = {
    show: false,
    page: 1
  };
  componentDidMount() {
    this.getDate();
  }
  changeStu = data => {
    console.info(data);
  };
  deleteAct = data => {
    confirm({
      title: "确定删除",
      content: "你真的要删除此次活动",
      okText: "确定",
      okType: "danger",
      cancelText: "取消",
      onOk() {
        console.log("OK");
      }
    });
  };
  // action=poster&operation=index
  // 获取数据
  getDate = (page, title) => {
    this.setState(()=>({
      show:true
    }))
    http
      .get("/L15aP8O79DN1QVyKRbpd", {
        action: "poster",
        operation: "index",
        page,
        title
      })
      .then(res => {
        if (res.errcode === 0) {
          const { data, total, per_page } = res;
          this.setState(() => ({
            data,
            total,
            per_page,
            show: false,
            page,
            title
          }));
        } else {
          this.setState(
            () => ({
              show: false
            }),
            () => message.error(res.msg)
          );
        }
      })
      .catch(err => {
        this.setState(
          () => ({
            show: false
          }),
          () => message.error(err)
        );
      });
  };
  // 创建海报
  setPoster = () => {
    const { history } = this.props;
    history.push("/create-task-poster");
  };
  render() {
    const { show, data, total, per_page, page } = this.state;
    const columns = [
      {
        title: "任务名称",
        dataIndex: "name",
        key: "name",
        align: "center"
      },
      {
        title: "开始时间",
        dataIndex: "start_time",
        key: "start_time",
        align: "center"
      },
      {
        title: "结束时间",
        dataIndex: "end_time",
        key: "end_time",
        align: "center"
      },
      {
        title: "状态设置",
        key: "status",
        align: "center",
        render: data => (
          <WrapLink className="c-main" onClick={() => this.changeStu(data)}>
            {data.status ? "开启" : "关闭"}
          </WrapLink>
        )
      },
      {
        title: "基本信息",
        key: "me",
        align: "center",
        render: data => (
          <WrapLink path={`/base-info-set_${data.id}`}>设置</WrapLink>
        )
      },
      {
        title: "成员加入提醒",
        key: "add",
        align: "center",
        render: data => (
          <WrapLink path={`member-join-tip_${data.id}`}>设置</WrapLink>
        )
      },
      {
        title: "任务完成提醒",
        key: "task",
        align: "center",
        render: data => (
          <div>
            <WrapLink className="pr5" path={`member-join-tip_${data.id}`}>
              一阶任务
            </WrapLink>
            <WrapLink className="pr5" path={`member-join-tip_${data.id}`}>
              二阶任务
            </WrapLink>
            <WrapLink path={`member-join-tip_${data.id}`}>三阶任务</WrapLink>
          </div>
        )
      },
      {
        title: "客服消息恢复",
        key: "service",
        align: "center",
        render: data => (
          <WrapLink path={`/message-reply_${data.id}`}>设置</WrapLink>
        )
      },
      {
        title: "操作",
        key: "operation",
        align: "center",
        render: data => (
          <WrapLink className="c-main" onClick={() => this.deleteAct(data)}>
            删除
          </WrapLink>
        )
      },
      {
        title: "数据统计",
        key: "stats",
        align: "center",
        render: data => (
          <WrapLink path={`/8-ab-test__${data.id}`}>查看</WrapLink>
        )
      }
    ];
    return (
      <div>
        {show && <LoadingFetch />}
        <div
          className="h60 font18 pl10 flex r4 ai-center jc-between"
          style={{ backgroundColor: "#f1f1f1" }}
        >
          <div>营销活动设置</div>
          <Button
            onClick={this.setPoster}
            className="mr10"
            type="primary"
            icon="plus"
          >
            创建任务海报
          </Button>
        </div>
        <div className="flex ai-center h80">
          <Search
            placeholder="请输入搜索内容"
            enterButton="搜索"
            size="large"
            style={{ width: "300px" }}
            onSearch={value => console.log(value)}
          />
          <div className="font16 pl20">
            当前共有<span className="c-main">123</span>个营销活动
          </div>
        </div>
        <Table
          pagination={{
            hideOnSinglePage: true,
            current: page,
            pageSize: per_page,
            onChange: page => {
              this.getDate(page);
            },
            total
          }}
          columns={columns}
          dataSource={data}
          bordered
          size="middle"
        />
      </div>
    );
  }
}

export default inject("user")(observer(Home));
