import React, { Component } from "react";
import { Input, Form, Button, Icon } from "antd";
// import { Loading } from "0-components";

const FormItem = Form.Item;
const { TextArea } = Input;
let uuid = 1;

class Member extends Component {
  state = { submitting: false };
  componentDidMount() {}
  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.info(values);
      }
    });
  };
  // 删除
  remove = k => {
    console.info(k);
    const { form } = this.props;
    // 可以使用数据绑定来获取吗
    const keys = form.getFieldValue("keys");
    // 我们至少需要一名乘客
    if (keys.length === 1) {
      return;
    }
    // 可以使用数据绑定来设置吗
    form.setFieldsValue({
      keys: keys.filter(key => key !== k)
    });
  };

  add = () => {
    const { form } = this.props;
    // 可以使用数据绑定来获取吗
    const keys = form.getFieldValue("keys");
    const nextKeys = keys.concat(uuid);
    uuid++;
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys
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
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { submitting } = this.state;
    getFieldDecorator("keys", { initialValue: [0] });
    const keys = getFieldValue("keys");
    console.info(keys);
    const formItems = keys.map((k, index) => {
      return (
        <FormItem {...formItemLayout} label={`keyword ${k}`} key={k}>
          {getFieldDecorator(`key[${k}]`, {
            validateTrigger: ["onChange", "onBlur"]
          })(
            <Input
              placeholder="key"
              style={{ width: "40%", marginRight: 8 }}
            />
          )}
          {getFieldDecorator(`valu[${k}]`, {
            validateTrigger: ["onChange", "onBlur"]
          })(
            <Input
              placeholder="value"
              style={{ width: "40%", marginRight: 8 }}
            />
          )}
          {keys.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={keys.length === 1}
              onClick={() => this.remove(k)}
            />
          ) : null}
        </FormItem>
      );
    });
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
        {formItems}
        <FormItem {...submitFormLayout}>
          <Button type="dashed" onClick={this.add} style={{ width: "30%" }}>
            <Icon type="plus" /> 添加一条键
          </Button>
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
