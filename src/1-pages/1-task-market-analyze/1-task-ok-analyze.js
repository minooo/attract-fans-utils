import React, { Component } from "react";
import {
  Breadcrumb,
  Row,
  Col,
  DatePicker,
  Radio,
  message,
  Table,
  Select
} from "antd";
import { LoadingFetch } from "0-components";
import { Chart, Geom, Axis, Tooltip } from "bizcharts";
import { http, common } from "4-utils";
import moment from "moment";
import "moment/locale/zh-cn";

const Option = Select.Option;
const { RangePicker } = DatePicker;

const cols = {
  value: { min: 0 },
  date: { range: [0, 1] }
};

export default class extends Component {
  state = {
    show: false,
    proster_id: 0,
    salesType: "sum_num",
    rangePickerValue: common.getTimeDistance("week"),
    rangePickerValue1: common.getTimeDistance("week"),
    chart_time: `${moment()
      .add(-1, "week")
      .format("YYYY-MM-DD")} - ${moment().format("YYYY-MM-DD")}`,
    list_time: `${moment()
      .add(-1, "week")
      .format("YYYY-MM-DD")} - ${moment().format("YYYY-MM-DD")}`
  };
  componentDidMount() {
    this.getData();
  }
  getData = async () => {
    this.setState(() => ({
      show: true
    }));
    const { proster_id, chart_time, list_time } = this.state;
    const { errcode, msg, result } = await http.get(null, {
      action: "statics",
      operation: "taskLog",
      proster_id,
      chart_time,
      list_time
    });
    if (parseInt(errcode, 10) === 0 && msg === "success") {
      this.setState({
        show: false,
        posters: result.posters,
        stat_data: result.stat_data,
        chart_data: result.chart_data,
        list_data: result.list_data
      });
    } else {
      message.error(msg);
    }
  };
  handleChange = value => {
    this.setState(
      () => ({
        proster_id: value
      }),
      () => {
        this.getData();
      }
    );
  };
  // 单选按钮组
  handleChangeSalesType = e => {
    this.setState({
      salesType: e.target.value
    });
  };
  // 日期选择器
  handleRangePickerChange = rangePickerValue => {
    this.setState(
      () => ({
        rangePickerValue,
        chart_time: `${moment(rangePickerValue[0]).format(
          "YYYY-MM-DD"
        )} - ${moment(rangePickerValue[1]).format("YYYY-MM-DD")}`
      }),
      () => {
        this.getData();
      }
    );
  };
  handleRangePickerChange1 = rangePickerValue1 => {
    this.setState(
      () => ({
        rangePickerValue1,
        list_time: `${moment(rangePickerValue1[0]).format(
          "YYYY-MM-DD"
        )} - ${moment(rangePickerValue1[1]).format("YYYY-MM-DD")}`
      }),
      () => {
        this.getData();
      }
    );
  };
  // 选择时间发送请求
  selectDate = type => {
    this.setState(
      () => ({
        rangePickerValue: common.getTimeDistance(type),
        chart_time: `${moment(common.getTimeDistance(type)[0]).format(
          "YYYY-MM-DD"
        )} - ${moment(common.getTimeDistance(type)[1]).format("YYYY-MM-DD")}`
      }),
      () => {
        this.getData();
      }
    );
  };
  // 判断选择的时间
  isActive = type => {
    const { rangePickerValue } = this.state;
    const value = common.getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return;
    }
    if (
      rangePickerValue[0].isSame(value[0], "day") &&
      rangePickerValue[1].isSame(value[1], "day")
    ) {
      return "currentDate";
    }
  };
  // 判断任务
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
  render() {
    const {
      show,
      salesType,
      rangePickerValue,
      rangePickerValue1,
      posters,
      stat_data,
      chart_data,
      list_data
    } = this.state;
    const logColumns = [
      { title: "用户昵称", dataIndex: "fan_nickname",key:"fan_nickname" },
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
        <div className=" mt30 mb30">
          <span className=" font16 ml25 mr20">选择活动:</span>
          {posters && (
            <Select
              style={{ width: 300 }}
              onChange={this.handleChange}
              defaultValue="请选择活动"
            >
              {posters.length > 0 &&
                posters.map(item => (
                  <Option key={item.id} value={item.id}>
                    {item.title}
                  </Option>
                ))}
            </Select>
          )}
        </div>
        <div className=" plr25 ptb15">
          <div className=" font16">历史数据统计</div>
          <div className=" flex wrap ptb20 ">
            <div className="pl15 pr30">
              <div className=" font30 c333 ">
                {stat_data &&
                  stat_data.task1.sum_num +
                    stat_data.task2.sum_num +
                    stat_data.task3.sum_num}
              </div>
              <div className=" font14 c999">任务完成总数</div>
            </div>
            <div className="pl15 pr30">
              <div className=" font30 c333 ">
                {stat_data && stat_data.task1.sum_num}
              </div>
              <div className=" font14 c999">一阶任务完成数</div>
            </div>
            <div className="pl15 pr30">
              <div className=" font30 c333 ">
                {stat_data && stat_data.task2.sum_num}
              </div>
              <div className=" font14 c999">二阶任务完成数</div>
            </div>
            <div className="pl15 pr30">
              <div className=" font30 c333 ">
                {stat_data && stat_data.task3.sum_num}
              </div>
              <div className=" font14 c999">三阶任务完成数</div>
            </div>
          </div>
        </div>

        <div>
          <div className=" font16 pl30">趋势图</div>
          <div className=" flex jc-between pl30 pr20 ptb20">
            <div>
              <Radio.Group
                value={salesType}
                onChange={this.handleChangeSalesType}
              >
                <Radio.Button value="sum_num">任务完成总数</Radio.Button>
                <Radio.Button value="task1_num">一阶任务完成数</Radio.Button>
                <Radio.Button value="task2_num">二阶任务完成数</Radio.Button>
                <Radio.Button value="task3_num">三阶任务完成数</Radio.Button>
              </Radio.Group>
            </div>
            <div className=" flex ai-center">
              <div className="salesExtra">
                <button
                  className={this.isActive("today")}
                  onClick={() => this.selectDate("today")}
                >
                  今日
                </button>
                <button
                  className={this.isActive("week")}
                  onClick={() => this.selectDate("week")}
                >
                  本周
                </button>
                <button
                  className={this.isActive("month")}
                  onClick={() => this.selectDate("month")}
                >
                  本月
                </button>
              </div>
              <RangePicker
                value={rangePickerValue}
                disabledDate={current =>
                  current - new Date(new Date().setHours(0, 0, 0, 0)) >
                  24 * 3600 * 1000
                }
                onChange={this.handleRangePickerChange}
                style={{ width: 256 }}
              />
            </div>
          </div>
          <Row>
            <Col span={24}>
              {chart_data && (
                <Chart
                  height={400}
                  data={chart_data[salesType]}
                  scale={cols}
                  padding="auto"
                  forceFit
                >
                  {/* 坐标轴 */}
                  <Axis name="date" />
                  <Axis name="value" />
                  {/* 提示信息 */}
                  <Tooltip
                    crosshairs={{ type: "y" }}
                    itemTpl="<tr class=&quot;g2-tooltip-list-item&quot;><td style=&quot;color:{color}&quot;>人数：</td><td>{value}</td></tr>"
                  />
                  {/* 几何标记 */}
                  <Geom type="line" position="date*value" size={2} />
                  <Geom
                    type="point"
                    position="date*value"
                    size={4}
                    shape={"circle"}
                    style={{ stroke: "#fff", lineWidth: 1 }}
                  />
                </Chart>
              )}
            </Col>
          </Row>
        </div>
        {/* 选择活动 */}
        <div className=" mt30 mb30">
          <span className=" font16 ml25 mr20">选择时间:</span>
          <RangePicker
            value={rangePickerValue1}
            disabledDate={current =>
              current - new Date(new Date().setHours(0, 0, 0, 0)) >
              24 * 3600 * 1000
            }
            onChange={this.handleRangePickerChange1}
            style={{ width: 256 }}
          />
        </div>
        {list_data && (
          <Table
            rowKey="id"
            columns={logColumns}
            dataSource={list_data}
            pagination={true}
          />
        )}
        <div />
      </div>
    );
  }
}
