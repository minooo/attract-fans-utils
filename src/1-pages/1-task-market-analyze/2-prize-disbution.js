import React, { Component } from "react";
import { Breadcrumb, DatePicker, message, Table, Select, Input } from "antd";
import { http } from "4-utils";
import { LoadingFetch, WrapLink } from "0-components";
import moment from "moment";
import "moment/locale/zh-cn";

const Option = Select.Option;
const Search = Input.Search;
const { RangePicker } = DatePicker;

export default class extends Component {
  state = {
    show: false,
    rangePickerValue: ""
  };
  componentDidMount() {
    this.getData();
  }
  getData = async () => {
    this.setState(() => ({
      show: true
    }));
    const { list_time, task_type, nickname } = this.state;
    const { errcode, msg, result } = await http.get(null, {
      action: "prize",
      list_time,
      task_type,
      nickname
    });
    if (parseInt(errcode, 10) === 0 && msg === "success") {
      this.setState({
        show: false,
        data: result.data,
        stat: result.stat
      });
    } else {
      message.error(msg);
    }
  };
  handleChange = value => {
    this.setState(
      () => ({
        task_type: value
      }),
      () => {
        this.getData();
      }
    );
  };
  // 日期选择器
  handleRangePickerChange = rangePickerValue => {
    this.setState(
      () => ({
        rangePickerValue,
        list_time: `${moment(rangePickerValue[0]).format(
          "YYYY-MM-DD"
        )} - ${moment(rangePickerValue[1]).format("YYYY-MM-DD")}`
      }),
      () => {
        this.getData();
      }
    );
  };
  isTask = type => {
    switch (parseInt(type, 10)) {
      case 1:
        return "一阶任务";
      case 2:
        return "二阶任务";
      case 3:
        return "三阶任务";
      default:
        return "这个字段有错误";
    }
  };
  changeStu = (id, type) => {
    if (parseInt(type, 10) === 0) {
      this.setData(id, 1);
    } else if (parseInt(type, 10) === 1) {
      this.setData(id, 0);
    }
  };
  setData = async (id, prize_status) => {
    const { errcode, msg } = await http.post(null, {
      action: "prize",
      id,
      prize_status
    });
    if (parseInt(errcode, 10) === 0 && msg === "success") {
      message.success("设置成功", 1.5, () => this.getData());
    } else {
      message.error(msg);
    }
  };
  onSearch = value => {
    this.setState(
      () => ({
        nickname: value
      }),
      () => {
        this.getData();
      }
    );
  };
  render() {
    const { show, rangePickerValue, data, stat } = this.state;
    const logColumns = [
      { title: "用户昵称", dataIndex: "fan_nickname", key: "fan_nickname" },
      {
        title: "完成任务",
        dataIndex: "task_type",
        key: "task_type",
        render: data => <span>{this.isTask(data)}</span>
      },
      { title: "完成时间", dataIndex: "created_at", key: "created_at" },
      {
        title: "奖品领取情况",
        dataIndex: "prize_status",
        key: "prize_status",
        render: data => <span>{data ? "已发放" : "未发放"}</span>
      },
      {
        title: "设置",
        key: "id",
        render: data => (
          <WrapLink
            className="c-main"
            onClick={() => this.changeStu(data.id, data.prize_status)}
          >
            {data.prize_status ? "设置为未发放" : "设置为已发放"}
          </WrapLink>
        )
      }
    ];
    return (
      <div style={{ minWidth: "996px" }}>
        {show && <LoadingFetch />}
        <div className="admin-common-tip bg-white border-bottom-one">
          <Breadcrumb>
            <Breadcrumb.Item>管理中心</Breadcrumb.Item>
            <Breadcrumb.Item>数据统计</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className=" plr25 ptb15">
          <div className=" font16">奖品发放情况</div>
          <div className=" flex wrap ptb20 ">
            <div className="pl15 pr30">
              <div className=" font30 c333 ">
                {data && data.task1 && data.task1.sum_num}
              </div>
              <div className=" font14 c999">一阶任务完成</div>
            </div>
            <div className="pl15 pr30">
              <div className=" font30 c333 ">
                {data && data.task1 && data.task1.send_num}
              </div>
              <div className=" font14 c999">已发放奖品</div>
            </div>
            <div className="pl15 pr30">
              <div className=" font30 c333 ">
                {data && data.task1 && data.task1.unissued_num}
              </div>
              <div className=" font14 c999">未发放奖品</div>
            </div>
          </div>
          <div className=" flex wrap ptb20 ">
            <div className="pl15 pr30">
              <div className=" font30 c333 ">
                {data && data.task2 && data.task2.sum_num}
              </div>
              <div className=" font14 c999">二阶任务完成</div>
            </div>
            <div className="pl15 pr30">
              <div className=" font30 c333 ">
                {data && data.task2 && data.task2.send_num}
              </div>
              <div className=" font14 c999">已发放奖品</div>
            </div>
            <div className="pl15 pr30">
              <div className=" font30 c333 ">
                {data && data.task2 && data.task2.unissued_num}
              </div>
              <div className=" font14 c999">未发放奖品</div>
            </div>
          </div>
          <div className=" flex wrap ptb20 ">
            <div className="pl15 pr30">
              <div className=" font30 c333 ">
                {data && data.task3 && data.task3.sum_num}
              </div>
              <div className=" font14 c999">三阶任务完成</div>
            </div>
            <div className="pl15 pr30">
              <div className=" font30 c333 ">
                {data && data.task3 && data.task3.send_num}
              </div>
              <div className=" font14 c999">已发放奖品</div>
            </div>
            <div className="pl15 pr30">
              <div className=" font30 c333 ">
                {data && data.task3 && data.task3.unissued_num}
              </div>
              <div className=" font14 c999">未发放奖品</div>
            </div>
          </div>
        </div>
        {/* 选择活动 */}
        <div className=" mt30 mb30">
          <span className=" font16 ml25 mr20">选择时间:</span>
          <RangePicker
            value={rangePickerValue}
            disabledDate={current =>
              current - new Date(new Date().setHours(0, 0, 0, 0)) >
              24 * 3600 * 1000
            }
            onChange={this.handleRangePickerChange}
            style={{ width: 300 }}
          />
        </div>
        <div className=" mt30 mb30">
          <span className=" font16 ml25 mr20">用户搜索:</span>
          <Search
            placeholder="输入昵称搜索"
            onSearch={this.onSearch}
            enterButton
            style={{ width: 300 }}
          />
        </div>
        <div className=" mt30 mb30">
          <span className=" font16 ml25 mr20">任务类型:</span>
          <Select
            style={{ width: 300 }}
            onChange={this.handleChange}
            defaultValue="任务完成"
          >
            <Option value="">任务完成</Option>
            <Option value="1">一阶任务完成</Option>
            <Option value="2">二阶任务完成</Option>
            <Option value="3">三阶任务完成</Option>
          </Select>
        </div>
        {stat && (
          <Table
            rowKey="id"
            columns={logColumns}
            dataSource={stat}
            pagination={true}
          />
        )}
        <div />
      </div>
    );
  }
}
