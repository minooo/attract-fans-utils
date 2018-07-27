import React, { Component } from "react";
import { Breadcrumb, Row, Col, DatePicker, Radio, message, Table } from "antd";
import { Chart, Geom, Axis, Tooltip } from "bizcharts";
import { http, common } from "4-utils";
import { LoadingFetch } from "0-components";
import moment from "moment";
import "moment/locale/zh-cn";

const { RangePicker } = DatePicker;

const cols = {
  value: { min: 0 },
  date: { range: [0, 1] }
};

export default class extends Component {
  state = {
    show: false,
    salesType: "follow_num",
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
    const { chart_time, list_time } = this.state;
    const { errcode, msg, result } = await http.get(null, {
      action: "statics",
      operation: "userAnalysis",
      chart_time,
      list_time
    });
    if (parseInt(errcode, 10) === 0 && msg === "success") {
      this.setState({
        show: false,
        stat_data: result.stat_data,
        chart_data: result.chart_data,
        list_data: result.list_data
      });
    } else {
      message.error(msg);
    }
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
  render() {
    const {
      show,
      salesType,
      rangePickerValue,
      rangePickerValue1,
      stat_data,
      chart_data,
      list_data
    } = this.state;
    const logColumns = [
      { title: "时间", dataIndex: "date" },
      { title: "新增关注人数", dataIndex: "follow_num", key: "follow_num" },
      { title: "取消关注人数", dataIndex: "cancel_num", key: "cancel_num" },
      { title: "净增关注人数", dataIndex: "growth_num", key: "growth_num" },
      { title: "累积关注人数", dataIndex: "cumulate_num", key: "cumulate_num" }
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
          <div className=" font16">昨日关键数据</div>
          <div className=" flex wrap ptb20 ">
            <div className="pl15 pr30">
              <div className=" font30 c333 ">
                {stat_data && stat_data.follow_num}
              </div>
              <div className=" font14 c999">新增关注人数 (个)</div>
            </div>
            <div className="pl15 pr30">
              <div className=" font30 c333 ">
                {stat_data && stat_data.cancel_num}
              </div>
              <div className=" font14 c999">取消关注人数 (个)</div>
            </div>
            <div className="pl15 pr30">
              <div className=" font30 c333 ">
                {stat_data && stat_data.growth_num}
              </div>
              <div className=" font14 c999">净增关注人数 (个)</div>
            </div>
            <div className="pl15 pr30">
              <div className=" font30 c333 ">
                {stat_data && stat_data.cumulate_num}
              </div>
              <div className=" font14 c999">累积关注人数 (个)</div>
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
                <Radio.Button value="follow_num">新增关注人数</Radio.Button>
                <Radio.Button value="cancel_num">取消关注人数</Radio.Button>
                <Radio.Button value="growth_num">净增关注人数</Radio.Button>
                <Radio.Button value="cumulate_num">累积关注人数</Radio.Button>
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
            rowKey="date"
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
