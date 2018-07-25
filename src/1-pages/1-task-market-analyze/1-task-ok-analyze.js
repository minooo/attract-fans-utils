import React, { Component } from "react";
import { Breadcrumb, Select, Row, Col, DatePicker, Radio } from "antd";
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from "bizcharts";

const Option = Select.Option;
const { RangePicker } = DatePicker;
const data = [
  { year: "1991", value: 3 },
  { year: "1992", value: 4 },
  { year: "1993", value: 3.5 },
  { year: "1994", value: 5 },
  { year: "1995", value: 4.9 },
  { year: "1996", value: 6 },
  { year: "1997", value: 7 },
  { year: "1998", value: 9 },
  { year: "1999", value: 13 }
];

const cols = {
  value: { min: 0 },
  year: { range: [0, 1] }
};
export default class extends Component {
  state = { salesType: "follow _num", rangePickerValue: "" };
  componentDidMount() {}
  // 下拉选择框
  handleChange = value => {
    console.log(`selected ${value}`);
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
    const { salesType, rangePickerValue } = this.state;
    return (
      <div>
        <div className="admin-common-tip bg-white border-bottom-one">
          <Breadcrumb>
            <Breadcrumb.Item>管理中心</Breadcrumb.Item>
            <Breadcrumb.Item>数据统计</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className=" mt30 mb30">
          <span className=" font16 ml25 mr20">选择活动:</span>
          <Select
            style={{ width: 300 }}
            onChange={this.handleChange}
            defaultValue="jack"
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </div>
        <div className=" plr25 ptb15">
          <div className=" font16">昨日关键数据</div>
          <div className=" flex wrap ptb20 ">
            <div className="pl15 pr30">
              <div className=" font30 c333 ">1200</div>
              <div className=" font14 c999">新增关注人数 (个)</div>
            </div>
            <div className="pl15 pr30">
              <div className=" font30 c333 ">1200</div>
              <div className=" font14 c999">取消关注人数 (个)</div>
            </div>
            <div className="pl15 pr30">
              <div className=" font30 c333 ">1200</div>
              <div className=" font14 c999">净增关注人数 (个)</div>
            </div>
            <div className="pl15 pr30">
              <div className=" font30 c333 ">1200</div>
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
              <Chart height={400} data={data} scale={cols} forceFit>
                {/* 坐标轴 */}
                <Axis name="year" />
                <Axis name="value" />
                {/* 提示信息 */}
                <Tooltip crosshairs={{ type: "y" }} />
                {/* 几何标记 */}
                <Geom type="line" position="year*value" size={2} />
                <Geom
                  type="point"
                  position="year*value"
                  size={4}
                  shape={"circle"}
                  style={{ stroke: "#fff", lineWidth: 1 }}
                />
              </Chart>
            </Col>
          </Row>
        </div>
        {/* 选择活动 */}
        <div className=" mt30 mb30">
          <span className=" font16 ml25 mr20">选择活动:</span>
          <RangePicker
            value={rangePickerValue}
            onChange={this.handleRangePickerChange}
            style={{ width: 256 }}
          />
        </div>
        <div>

        </div>
      </div>
    );
  }
}
