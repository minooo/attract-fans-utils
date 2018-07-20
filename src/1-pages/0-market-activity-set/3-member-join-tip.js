import React, { Component } from "react";
import { Input, Form, Button, message } from "antd";
import { Loading } from "0-components";

const FormItem = Form.Item;
const { TextArea } = Input;
class Member extends Component {
  state = {submitting:false};
  componentDidMount() {}
  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.info(values);
      }
    });
  };
  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 }
      }
    };
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 }
      }
    };
    const { getFieldDecorator } = this.props.form;
    const {submitting} = this.state;
    return (
      <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
        <FormItem
          {...formItemLayout}
          label="ID"
          extra="微信公众号后台-模板消息-成员加入提醒-模板ID"
        >
          {getFieldDecorator("templete_id", {
            rules: [
              {
                required: true,
                message: "请输入微信模板id！"
              }
            ]
          })(<Input placeholder="请输入微信模板id" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="头部">
          {getFieldDecorator("first", {
            rules: [
              {
                required: true,
                message: "请输入模板头部信息！"
              }
            ]
          })(
            <TextArea
              style={{ minHeight: 32 }}
              placeholder="任务完成进度通知"
              rows={4}
            />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="尾部">
          {getFieldDecorator("first", {
            rules: [
              {
                required: true,
                message: "请输入模板尾部信息！"
              }
            ]
          })(
            <TextArea
              style={{ minHeight: 32 }}
              placeholder="模板尾部信息"
              rows={4}
            />
          )}
        </FormItem>
        <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
            </FormItem>
      </Form>
    );
  }
}
export default Form.create()(Member);
