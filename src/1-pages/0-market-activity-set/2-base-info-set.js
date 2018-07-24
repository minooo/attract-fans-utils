import React, { Component } from "react";
import {
  Form,
  Input,
  Button,
  Icon,
  Switch,
  InputNumber,
  message,
  DatePicker
} from "antd";
import { Nav } from "0-components";

const FormItem = Form.Item;


class BaseInfoSet extends Component {
  state = {};
  componentDidMount() {}
  onChange=(e,a)=>{
    console.log(e)
    console.log(a)
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 }
    };
    return (
      <div>
        <Nav />
        <div className="mt30 plr25 border-default">
          <Form
            style={{paddingTop: "40px" }}
            onSubmit={this.handleSubmit}
          >
            <FormItem {...formItemLayout} label="活动开始时间">
              {getFieldDecorator("begin_time", {
                 rules: [{ required: true, message: "请选择活动开始时间" }]
              })(<DatePicker  showTime format="YYYY-MM-DD HH:mm:ss" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="活动结束时间">
              {getFieldDecorator("end_time", {
                 rules: [{ required: true, message: "请选择活动结束时间" }]
              })(<DatePicker  showTime format="YYYY-MM-DD HH:mm:ss" />)}
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

BaseInfoSet = Form.create({})(BaseInfoSet);

export default BaseInfoSet;
