import React, { Component } from "react";
import { Table } from "antd";
// import { http } from "4-utils";
import { WrapLink } from "0-components";

const changeStu = data => {
  console.info(data);
};
const columns = [
  {
    title: "IP",
    dataIndex: "ip",
    key: "ip",
    align: "center"
  },
  {
    title: "请求数",
    dataIndex: "request",
    key: "request",
    align: "center"
  },
  {
    title: "微信号总数",
    dataIndex: "wxNum",
    key: "wxNum",
    align: "center"
  },
  {
    title: "操作",
    key: "status",
    align: "center",
    render: data => (
      <WrapLink className="c-main" onClick={() => changeStu(data)}>
        {data.status ? "拉黑" : "移除"}
      </WrapLink>
    )
  }
];
const data = [
  {
    id: 2,
    ip: "1",
    request: "胡彦斌",
    wxNum: "2013-09-01",
    status: false,
  },
  {
    id: 3,
    ip: "1",
    request: "胡彦斌",
    wxNum: "2013-09-01",
    status: true,
  }
];
export default class extends Component {
  state = {};
  componentDidMount() {}
  render() {
    return (
      <div>
        <div
          className="h60 font18 pl10 flex r4 ai-center jc-between mb20"
          style={{ backgroundColor: "#f1f1f1" }}
        >
          监测拉黑
        </div>
        <Table
          pagination={{
            hideOnSinglePage: true,
            current: 1,
            pageSize: 10,
            onChange: () => {
              console.info(1);
            },
            total: 2
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
