import React, { Component } from "react";
import {
  Form,
  Button,
  Switch,
  InputNumber,
  DatePicker,
  Cascader,
  Tag
} from "antd";
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { city } from "../../2-static/city";
import { Nav } from "0-components";

const FormItem = Form.Item;

class BaseInfoSet extends Component {
  state = {
    siteName: [],
    area: [],
    begin_time:null,
    begin_time_d:null
  };
  componentDidMount() {}
  onChange = (arr, value) => {
    const { siteName, area } = this.state;
    const newdata = arr.join(" ");
    const siteId = {
      province_id: value[0].id,
      city_id: value[1].id
    };
    if (!siteName.includes(newdata) && !area.includes(siteId)) {
      this.setState(pre => ({
        siteName: pre.siteName.concat(newdata),
        area: pre.area.concat(siteId)
      }));
    }
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  onTagClose = index => {
    const { siteName, area } = this.state;
    const newSiteName = siteName;
    const newArea = area;
    newSiteName.splice(index,1)
    newArea.splice(index,1)
    this.setState(pre => ({
      siteName: newSiteName,
      area: newArea
    }));
  };
  // 验证结束时间
  disabledDate=(current)=>{
    const {form}=this.props
    return current<form.getFieldValue("begin_time")._d
  }
  render() {
    const { siteName, area } = this.state;
    console.log(siteName, area);
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 }
    }
    return (
      <div>
        <Nav />
        <div className="mt30 plr25 border-default">
          <Form style={{ paddingTop: "40px" }} onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="活动开始时间">
              {getFieldDecorator("begin_time", {
                rules: [{ required: true, message: "请选择活动开始时间" }]
              })(<DatePicker locale={locale} format="YYYY-MM-DD HH:mm:ss" placeholder="活动开始时间" showTime disabledDate={(current)=> current < new Date()} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="活动结束时间">
              {getFieldDecorator("end_time", {
                rules: [{ required: true, message: "请选择活动结束时间" }]
              })(<DatePicker format="YYYY-MM-DD HH:mm:ss" showTime placeholder="活动结束时间" disabled={!getFieldValue("begin_time")}  disabledDate={this.disabledDate} />)}
            </FormItem>
            <div className="flex basic-tack">
              <div className="ant-col-10 ant-form-item-label c333">
                <label className="ant-form-item-required">活动任务目标</label>
              </div>
              <div className=" equal">
                <FormItem {...formItemLayout}>
                  <span className="ant-input-group-addon">一阶邀请</span>
                  {getFieldDecorator("task1_num", {
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
                  onChange={this.onChange}
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
                选择限制地区后，非该地区粉丝无法获取海报以及非该地区粉丝助力无效，选择地区点击添加，如需要删除点击对应地区即可
              </div>
            </div>
            <FormItem {...formItemLayout} label="活动奖品库存">
              {getFieldDecorator("stock", {
                rules: [
                  {
                    required: true,
                    message: "请填写库存"
                  }
                ]
              })(<InputNumber min={0} />)}
              <div className="c666 font12">
                库存设置为0，则表示不限制库存； 库存减少到0时，系统自动终止活动
              </div>
            </FormItem>
            <FormItem {...formItemLayout} label="取消扣除人气">
              {getFieldDecorator("is_auto")(<Switch />)}
              <div className="c666 font12">
                开启后，取关扣除人气值，重新扫码只算一次助力，能有效避免粉丝取消关注。
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
