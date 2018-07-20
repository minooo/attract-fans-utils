import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Table, Input, Button  } from "antd";
// import { http } from "4-utils";
import { WrapLink } from "0-components";

const { Search }= Input;
const changeStu = data => {
  console.info(data);
};
const deleteAct = data => {
  console.info(data);
};
 // 获取数据
const getDate=()=>{
  // console.info(data);
}
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
      <WrapLink className="c-main" onClick={() => changeStu(data)}>
        {data.status ? "开启" : "关闭"}
      </WrapLink>
    )
  },
  {
    title: "基本信息",
    key: "me",
    align: "center",
    render: data => <WrapLink path={`/base-info-set_${data.id}`}>设置</WrapLink>
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
    render: data => <WrapLink path={`/message-reply_${data.id}`}>设置</WrapLink>
  },
  {
    title: "AB测试",
    key: "test",
    align: "center",
    render: data => <WrapLink path={`/8-ab-test__${data.id}`}>设置</WrapLink>
  },
  {
    title: "操作",
    key: "operation",
    align: "center",
    render: data => (
      <WrapLink className="c-main" onClick={() => deleteAct(data)}>
        删除
      </WrapLink>
    )
  },
  {
    title: "数据统计",
    key: "stats",
    align: "center",
    render: data => <WrapLink path={`/8-ab-test__${data.id}`}>查看</WrapLink>
  }
];
const data = [
  {
    id: 2,
    key: "1",
    name: "胡彦斌",
    start_time: "2013-09-01",
    end_time: "2014-09-01",
    service: "西湖区湖底公园1号",
    test: 1,
    status: false,
    me: 1
  },
  {
    id: 1,
    key: "2",
    name: "周杰伦",
    start_time: "2013-09-01",
    end_time: "2014-09-01",
    status: true,
    service: "西湖区湖底公园1号",
    test: 1,
    me: 1
  }
];

class Home extends Component {
  state = {};
  componentDidMount() {
    getDate()
  }

  // 创建海报
  setPoster=()=>{
    const {history}=this.props
    history.push("/create-task-poster")
  }
  render() {
    return (
      <div>
        <div className="h60 font18 pl10 flex r4 ai-center jc-between" style={{backgroundColor:"#f1f1f1"}}>
        <div>营销活动设置</div>
        <Button onClick={this.setPoster} className="mr10" type="primary" icon="plus">创建任务海报</Button>
        </div>
        <div className="flex ai-center h80">
        <Search
          placeholder="请输入搜索内容"
          enterButton="搜索"
          size="large"
          style={{width:"300px"}}
          onSearch={value => console.log(value)}
        />
        <div className="font16 pl20">当前共有<span className="c-main">123</span>个营销活动</div>
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

export default inject("user")(observer(Home));
