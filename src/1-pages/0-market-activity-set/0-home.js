import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import moment from "moment";
import { Table, Input, Button, Modal, message } from "antd";
import { http } from "4-utils";
import { WrapLink, LoadingFetch } from "0-components";

const confirm = Modal.confirm;
const { Search } = Input;

class Home extends Component {
  state = {
    show: false,
    page: 1,
    winWidth: document.body.clientWidth
  };
  componentDidMount() {
    window.addEventListener("resize", this.getWidth ,false)
    this.getDate();
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.getWidth);
  }
  getWidth=()=>{
    this.setState(()=>({
      winWidth:document.body.clientWidth
    }))
  }
  changeStu = data => {
    const { page } = this.state;
    const { title, id, state } = data;
    http.postC(
      "",
      {
        action: "poster",
        operation: "turn",
        title,
        id,
        state: state === 0 ? 1 : 0
      },
      () => {
        this.getDate(page);
      }
    );
  };
  deleteAct = data => {
    const { page } = this.state;
    const { title, id } = data;
    confirm({
      title: "确定删除",
      content: "你真的要删除此次活动",
      okText: "确定",
      okType: "danger",
      cancelText: "取消",
      onOk: () => {
        http.deleteC(
          "",
          {
            action: "poster",
            operation: "delete",
            title,
            id
          },
          () => {
            this.getDate(page);
          }
        );
      }
    });
  };
  getDate = (page, title) => {
    this.setState(() => ({
      show: true
    }));
    http
      .get("", {
        action: "poster",
        operation: "index",
        page,
        title
      })
      .then(res => {
        if (res.errcode === 0) {
          const { data, total, per_page } = res.result;
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
          () => ({ show: false }),
          () => message.error("网络出错，请稍后再试！")
        );
      });
  };
  // 创建海报
  setPoster = () => {
    const { history } = this.props;
    history.push("/create-task-poster");
  };
  // 搜索
  onSearch = value => {
    if (!value) {
      this.setState(
        () => ({
          title: undefined,
          page: undefined
        }),
        () => this.getDate()
      );
    } else {
      this.setState(
        () => ({
          title: value,
          page: 1
        }),
        () => this.getDate(1, value)
      );
    }
  };
  // 基本设置
  basicSet = data => {
    const { history } = this.props;
    if (moment().isAfter(data.begin_time)) {
      message.error("活动时间开始后不能进行基本设置", 3);
    } else {
      history.push(
        `/base-info-set_${data.id}?begin=${
          moment().isAfter(data.begin_time) ? 1 : 0
        }`
      );
    }
  };
  render() {
    const { show, data, total, per_page, page, winWidth } = this.state;
    const columns = [
      {
        title: "任务名称",
        dataIndex: "title",
        key: "title",
        align: "center"
      },
      {
        title: "开始时间",
        dataIndex: "begin_time",
        key: "begin_time",
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
        key: "state",
        align: "center",
        render: data => (
          <WrapLink className="c-main" onClick={() => this.changeStu(data)}>
            {data.state === 1 ? "关闭" : "开启"}
          </WrapLink>
        )
      },
      {
        title: "基本信息",
        key: "me",
        align: "center",
        render: data => (
          <WrapLink className="c-main" onClick={() => this.basicSet(data)}>
            设置
          </WrapLink>
        )
      },
      {
        title: "成员加入提醒",
        key: "add",
        align: "center",
        render: data => (
          <WrapLink
            path={`member-join-tip_${data.id}?begin=${
              moment().isAfter(data.begin_time) ? 1 : 0
            }`}
          >
            设置
          </WrapLink>
        )
      },
      {
        title: "任务完成提醒",
        key: "task",
        align: "center",
        render: data => (
          <div className="flex jc-around">
            <WrapLink
              className="pr5"
              path={`first-task-ok_${data.id}?begin=${
                moment().isAfter(data.begin_time) ? 1 : 0
              }`}
            >
              一阶任务
            </WrapLink>
            <WrapLink
              className="pr5"
              path={`second-task-ok_${data.id}?begin=${
                moment().isAfter(data.begin_time) ? 1 : 0
              }`}
            >
              二阶任务
            </WrapLink>
            <WrapLink
              path={`third-task-ok_${data.id}?begin=${
                moment().isAfter(data.begin_time) ? 1 : 0
              }`}
            >
              三阶任务
            </WrapLink>
          </div>
        )
      },
      {
        title: "客服消息回复",
        key: "service",
        align: "center",
        render: data => (
          <WrapLink
            path={`/message-reply_${data.id}?begin=${
              moment().isAfter(data.begin_time) ? 1 : 0
            }`}
          >
            设置
          </WrapLink>
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
            onSearch={this.onSearch}
          />
          <div className="font16 pl20">
            当前共有<span className="c-main">{total || 0}</span>个营销活动
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
            total,
            size: "default "
          }}
          scroll={{ x: winWidth < 1500 ? 1200 : 0 }}
          columns={columns}
          dataSource={data}
          bordered
          rowKey="id"
          size="middle"
        />
      </div>
    );
  }
}

export default inject("user")(observer(Home));
