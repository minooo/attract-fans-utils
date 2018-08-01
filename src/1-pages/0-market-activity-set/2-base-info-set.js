import React, { Component } from "react";
import {
  Form,
  Button,
  Switch,
  InputNumber,
  DatePicker,
  Cascader,
  Tag,
  message
} from "antd";
import { http, common } from "4-utils";
import moment from "moment";
import "moment/locale/zh-cn";
import { city } from "2-static/city";
import { Nav, LoadingFetch } from "0-components";

const FormItem = Form.Item;
const { searchToObj } = common;

class BaseInfoSet extends Component {
  state = {
    siteName: [],
    area: [],
    show: false
  };
  componentDidMount() {
    const { begin } = searchToObj(window.location.hash);
    const { id } = this.props.match.params;
    if (id && begin) {
      this.setState(() => ({
        show: true
      }));
      http
        .get("", {
          action: "baseSetting",
          poster_id: id
        })
        .then(res => {
          if (res.errcode === 0) {
            const { setting, areas } = res.base_setting;
            this.backCity(areas);
            this.setState(() => ({
              setting,
              show: false
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
    }
  }
  backCity = area => {
    const cityName = area.map(v => `${v.province} ${v.city}`);
    this.setState(() => ({ siteName: cityName, area }));
  };
  citOnChange = arr => {
    const { siteName, area } = this.state;
    const newdata = arr.join(" ");
    const siteId = {
      province: arr[0],
      city: arr[1]
    };
    if (!siteName.includes(newdata) && !area.includes(siteId)) {
      this.setState(pre => ({
        siteName: pre.siteName.concat(newdata),
        area: pre.area.concat(siteId)
      }));
    }
  };
  // 表单选择
  handleSubmit = e => {
    e.preventDefault();
    const { id } = this.props.match.params;
    const { begin_time, end_time, area, submit } = this.state;
    const { begin } = searchToObj(window.location.hash);
    if (begin && parseInt(begin, 10) === 1) {
      message.error("活动时间开始后不能进行基本设置", 3);
      return;
    }
    if (submit) {
      message.info("请不要重复提交", 2);
      return;
    }
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (moment(end_time).isBefore(moment(begin_time))) {
          message.error("结束时间应该在开始时间之后", 2);
          return;
        }
        const { task1_num, task2_num, task3_num, stock, is_stock } = values;
        const param = {
          action: "baseSetting",
          poster_id: id,
          begin_time,
          end_time,
          task1_num,
          task2_num,
          task3_num,
          stock,
          area,
          is_stock: !!is_stock ? 1 : 0
        };
        http.postC("", param, () => {
          this.setState(
            () => ({
              submit: true,
              poster_begin: moment().isAfter(begin_time) ? 1 : 0
            }),
            () => message.success("保存成功", 2)
          );
        });
      } else {
        message.error("请填写必要信息", 2);
      }
    });
  };
  // 存储时间
  saveTime = (time, type) => {
    if (type === 1) {
      this.setState(() => ({
        begin_time: time
      }));
    } else {
      this.setState(() => ({
        end_time: time
      }));
    }
  };
  // 删除标签
  onTagClose = index => {
    const { siteName, area } = this.state;
    const newSiteName = siteName;
    const newArea = area;
    newSiteName.splice(index, 1);
    newArea.splice(index, 1);
    this.setState(pre => ({
      siteName: newSiteName,
      area: newArea
    }));
  };
  // 验证结束时间
  disabledDate = current => {
    const { begin_time } = this.state;
    return current < moment(begin_time).endOf("day") || current < moment();
  };
  // 验证开始时间
  beginTime = (rule, value, callback) => {
    const { end_time } = this.state;
    if (end_time && moment(value).isAfter(end_time)) {
      callback("开始时间应该结束时间在之前");
    }
    callback();
  };
  // 验证结束时间
  endTime = (rule, value, callback) => {
    const { begin_time } = this.state;
    if (moment(value).isBefore(begin_time)) {
      callback("结束时间应该在开始时间之后");
    }
    callback();
  };
  render() {
    const { siteName, submit, poster_begin, show, setting } = this.state;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 }
    };
    return (
      <div>
        <Nav submit={submit} poster_begin={poster_begin} />
        {show && <LoadingFetch />}
        <div className="mt30 plr25 border-default">
          <Form style={{ paddingTop: "40px" }} onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="活动开始时间">
              {getFieldDecorator("begin_time", {
                initialValue:
                  setting && setting.begin_time && moment(setting.begin_time),
                rules: [
                  { required: true, message: "请选择活动开始时间" },
                  { validator: this.beginTime }
                ]
              })(
                <DatePicker
                  onChange={(v, time) => this.saveTime(time, 1)}
                  format="YYYY-MM-DD HH:mm:ss"
                  showTime
                  showToday
                  placeholder="活动开始时间"
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="活动结束时间">
              {getFieldDecorator("end_time", {
                initialValue:
                  setting && setting.end_time && moment(setting.end_time),
                rules: [
                  { required: true, message: "请选择活动结束时间" },
                  { validator: this.endTime }
                ]
              })(
                <DatePicker
                  onChange={(v, time) => this.saveTime(time, 2)}
                  format="YYYY-MM-DD HH:mm:ss"
                  showTime
                  showToday
                  placeholder="活动结束时间"
                  disabled={!getFieldValue("begin_time")}
                  disabledDate={this.disabledDate}
                />
              )}
            </FormItem>
            <div className="flex basic-tack">
              <div className="ant-col-10 ant-form-item-label c333">
                <label className="ant-form-item-required">活动任务目标</label>
              </div>
              <div className="equal">
                <FormItem {...formItemLayout}>
                  <span className="ant-input-group-addon">一阶邀请</span>
                  {getFieldDecorator("task1_num", {
                    initialValue: setting && setting.task1_num,
                    rules: [
                      {
                        required: true,
                        message: "请填写一阶邀请任务人数"
                      }
                    ]
                  })(<InputNumber min={0} />)}
                  <span className="ant-input-group-addon">人关注领取奖励</span>
                </FormItem>
                <FormItem {...formItemLayout}>
                  <span className="ant-input-group-addon">二阶邀请</span>
                  {getFieldDecorator("task2_num", {
                    initialValue: setting && setting.task2_num,
                    rules: [
                      {
                        required: true,
                        message: "请填写二阶邀请任务人数"
                      }
                    ]
                  })(<InputNumber min={0} />)}
                  <span className="ant-input-group-addon">人关注领取奖励</span>
                </FormItem>
                <FormItem {...formItemLayout} label="">
                  <span className="ant-input-group-addon">三阶邀请</span>
                  {getFieldDecorator("task3_num", {
                    initialValue: setting && setting.task3_num,
                    rules: [
                      {
                        required: true,
                        message: "请填写三阶邀请任务人数"
                      }
                    ]
                  })(<InputNumber min={0} />)}
                  <span className="ant-input-group-addon">人关注领取奖励</span>
                </FormItem>
              </div>
            </div>
            <FormItem {...formItemLayout} label="活动开放地区">
              {getFieldDecorator("state")(
                <Cascader
                  style={{ maxWidth: "400px" }}
                  options={city}
                  onChange={this.citOnChange}
                  placeholder="请选择开放地区"
                />
              )}
            </FormItem>
            <div className="ant-col-offset-10" style={{ maxWidth: "400px" }}>
              <div className="border-default flex wrap ptb20 plr20 r4 mb10">
                {siteName &&
                  siteName.length > 0 &&
                  siteName.map((item, index) => (
                    <Tag
                      key={item}
                      style={{ marginBottom: "20px" }}
                      closable
                      onClose={() => this.onTagClose(index)}
                    >
                      {item}
                    </Tag>
                  ))}
              </div>
              <div className="font12 c666 mb10">
                说明：选择限制地区后，非该地区粉丝无法获取海报以及非该地区粉丝助力无效，选择地区点击添加，如需要删除点击对应地区即可订阅号无法获取。
              </div>
            </div>
            <FormItem {...formItemLayout} label="活动奖品库存">
              {getFieldDecorator("stock", {
                initialValue: setting && setting.stock,
                rules: [
                  {
                    required: true,
                    message: "请填写库存"
                  }
                ]
              })(<InputNumber min={0} />)}
              <div className="c666 font12">
                说明：库存设置为0，则表示不限制库存；
                库存减少到0时，系统自动终止活动。
              </div>
            </FormItem>
            <FormItem {...formItemLayout} label="取消扣除人气">
              {getFieldDecorator("is_stock", {
                valuePropName: "checked",
                initialValue:
                  setting && setting.is_stock && setting.is_stock === 1
              })(<Switch />)}
              <div className="c666 font12">
                说明：开启后，取关扣除人气值，重新扫码只算一次助力，能有效避免粉丝取消关注。
              </div>
            </FormItem>
            <FormItem wrapperCol={{ span: 14, offset: 10 }}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

BaseInfoSet = Form.create({})(BaseInfoSet);

export default BaseInfoSet;
