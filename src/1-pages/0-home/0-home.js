import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Table } from "antd";
import { http } from "4-utils";

const columns = [
  {
    title: "任务名称",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "开始时间",
    dataIndex: "start-time",
    key: "start-time"
  },
  {
    title: "结束时间",
    dataIndex: "end-time",
    key: "end-time"
  },
  {
    title: "状态设置",
    dataIndex: "status",
    key: "status"
  },
  {
    title: "状态设置",
    dataIndex: "me",
    key: "me"
  },
  {
    title: "成员加入提醒",
    dataIndex: "add",
    key: "add"
  },
  {
    title: "任务完成提醒",
    dataIndex: "task",
    key: "task"
  },
  {
    title: "客服消息恢复",
    dataIndex: "service",
    key: "service"
  },
  {
    title: "AB测试",
    dataIndex: "service",
    key: "service"
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation"
  },
  {
    title: "数据统计",
    dataIndex: "stats",
    key: "stats",
    align:"center"
  }
];
const data=[]
class Home extends Component {
  state = {};

  componentDidMount() {
    console.log(this.props, "lala");
    http.get("applications").then(response => {
      console.log(response, "rrr");
    });
  }
  render() {
    return (
      <div>
        <Table columns={columns} dataSource={data} bordered size="middle" />
      </div>
    );
  }
}

export default inject("user")(observer(Home));
