import React, { Component } from "react";
import { Breadcrumb, Row, Col, DatePicker, Radio, message, Table } from "antd";
import { Chart, Geom, Axis, Tooltip } from "bizcharts";
import { http } from "4-utils";

const { RangePicker } = DatePicker;

const cols = {
  value: { min: 0 },
  date: { range: [0, 1] }
};

export default class extends Component {
  state = { salesType: "follow _num", rangePickerValue: "" };
  componentDidMount() {
    this.getData();
  }
  getData = async () => {
    const { errcode, msg, result } = await http.get(null, {
      action: "statics",
      operation: "userAnalysis",
      proster_id: 1,
      chart_time: "2018-07-12 - 2018-07-15",
      list_time: "2018-07-12 - 2018-07-17"
    });
    if (parseInt(errcode, 10) === 0 && msg === "success") {
      this.setState({
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
    this.setState({
      rangePickerValue
    });
  };
  render() {
    const {
      salesType,
      rangePickerValue,
      stat_data,
      chart_data,
      list_data
    } = this.state;
    const logColumns = [
      { title: "时间", dataIndex: "date" },
      { title: "新增关注人数", dataIndex: "follow_num" },
      { title: "取消关注人数", dataIndex: "cancel_num" },
      { title: "净增关注人数", dataIndex: "growth_num" },
      { title: "累积关注人数", dataIndex: "cumulate_num" }
    ];
    return (
      <div>
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
                <Radio.Button value="follow _num">新增关注人数</Radio.Button>
                <Radio.Button value="cancel _num">取消关注人数</Radio.Button>
                <Radio.Button value="growth _num">净增关注人数</Radio.Button>
                <Radio.Button value="cumulate _num">累积关注人数</Radio.Button>
              </Radio.Group>
            </div>
            <div className=" flex ai-center">
              <div>
                <a>今日</a>
                <a>本周</a>
                <a>本月</a>
              </div>
              <RangePicker
                value={rangePickerValue}
                onChange={this.handleRangePickerChange}
                style={{ width: 256 }}
              />
            </div>
          </div>
          <Row>
            <Col span={24}>
              {chart_data &&
                chart_data.follow_num && (
                  <Chart
                    height={400}
                    data={chart_data.follow_num}
                    scale={cols}
                    forceFit
                  >
                    {/* 坐标轴 */}
                    <Axis name="date" />
                    <Axis name="value" />
                    {/* 提示信息 */}
                    <Tooltip crosshairs={{ type: "y" }} />
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
            value={rangePickerValue}
            onChange={this.handleRangePickerChange}
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
