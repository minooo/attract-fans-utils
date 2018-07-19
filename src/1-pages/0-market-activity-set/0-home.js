import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Table } from "antd";
import { http } from "4-utils";
import { WrapLink } from "0-components";

const hanle = name => {
  console.log(name);
};

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
    title: "基本信息",
    key: "me",
    render: (text) => (
      <WrapLink onClick={()=>hanle(text)}>开启</WrapLink>
    )
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
    dataIndex: "test",
    key: "test"
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
    align: "center"
  }
];
const data = [
  {
    key: "1",
    name: "胡彦斌",
    stats: 32,
    service: "西湖区湖底公园1号",
    test: 1,
    me:1
  },
  {
    key: "2",
    name: "周杰伦",
    stats: 32,
    service: "西湖区湖底公园1号",
    test: 1,
    me:1
  }
];

class Home extends Component {
  state = {};
  componentDidMount() {}
  render() {
    return (
      <div>
        <Table
          pagination={{ hideOnSinglePage: true }}
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
