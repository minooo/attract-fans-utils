import React, { Component } from "react";
import { Input, Form, Button } from "antd";

const FormItem = Form.Item;
const { TextArea } = Input;

class Message extends Component {
  state = { submitting: false };
  componentDidMount() {}
  handleSubmit = e => {
    e.preventDefault();
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
    const { submitting } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
        <FormItem {...formItemLayout} label="关注自动回复" extra="扫码自动回复">
          {getFieldDecorator("follow", {
            rules: [
              {
                required: true,
                message: "请输入扫码自动回复内容！"
              }
            ]
          })(
            <TextArea
              style={{ minHeight: 32 }}
              placeholder="自动关注回复"
              rows={3}
            />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="好友取关提示"
          extra="例如：你的好友#昵称#放弃为你助力啦。扣除1个人气值！"
        >
          {getFieldDecorator("cancel", {
            rules: [
              {
                required: true,
                message: "请输入好友取消关注时回复内容！"
              }
            ]
          })(
            <TextArea
              style={{ minHeight: 32 }}
              placeholder="好友取消关注时回复内容"
              rows={3}
            />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="重复扫码提示"
          extra="已关注粉丝重复扫描二维码或扫描他人二维码提示信息"
        >
          {getFieldDecorator("repeat", {
            rules: [
              {
                required: true,
                message: "请输入重复扫码提示时回复内容！"
              }
            ]
          })(
            <TextArea
              style={{ minHeight: 32 }}
              placeholder="重复扫码时回复内容"
              rows={3}
            />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="活动结束提示"
          extra="活动结束提示语，例如：本地活动已经结束啦，敬请期待下次活动"
        >
          {getFieldDecorator("poster_end", {
            rules: [
              {
                required: true,
                message: "请输入活动结束时回复内容！"
              }
            ]
          })(
            <TextArea
              style={{ minHeight: 32 }}
              placeholder="活动结束时回复内容"
              rows={3}
            />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="任务完成后消息"
          extra="粉丝完成任务后进行回复的模板消息"
        >
          {getFieldDecorator("task_content", {
            rules: [
              {
                required: true,
                message: "请输入任务完成时回复内容！"
              }
            ]
          })(
            <TextArea
              style={{ minHeight: 32 }}
              placeholder="任务完成时回复内容"
              rows={3}
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
export default Form.create()(Message);
