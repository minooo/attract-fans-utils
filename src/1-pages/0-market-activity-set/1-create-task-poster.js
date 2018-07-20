import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Radio, Form, Input, Checkbox, Upload, Button, Icon } from "antd";
import { http } from "4-utils";
import { Nav } from "0-components";

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const CheckboxGroup = Checkbox.Group;
const plainOptions = ["二维码", "头像", "昵称"];

class Home extends Component {
  state = {};
  // componentDidMount() {
  //   http.get("applications").then(response => {
  //     console.log(response, "rrr");
  //   });
  // }
  // 当前选中
  onChange = () => {
    // 当前选中
  };
  onChange1 = e => {
    console.log(e);
  };
  render() {
    console.log(this.props);
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 }
    };
    return (
      <div>
        <Nav />
        <div className="mt30 plr25 border-default textleft">
          <Form style={{ maxWidth: "900px", paddingTop: "40px" }}>
            <FormItem {...formItemLayout} label="选择公众号类型">
              {getFieldDecorator("radio-group", {
                rules: [
                  { required: true, message: "Please select your country!" }
                ]
              })(
                <RadioGroup className="inline-block" onChange={this.onChange}>
                  <Radio value={1}>服务号</Radio>
                  <Radio value={2}>订阅号</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="海报名称">
              {getFieldDecorator("input", {
                rules: [{ required: true, message: "请填写海报名称" }]
              })(<Input style={{ width: "250px" }} placeholder="海报名称" />)}
            </FormItem>
            <div className="flex">
              <div className="ant-col-4">
                <div className="ant-form-item-required c333">海报设计</div>
              </div>
              <div className="flex equal">
                <div
                  className="plr20 ptb20 border-default mr20"
                  style={{ width: "320px", height: "540px" }}
                >
                  <img className="h-100 w-100" src="" alt="" />
                </div>
                <div className="plr20 ptb20 border-default equal">
                  <FormItem {...formItemLayout} label="元素">
                    {getFieldDecorator("CheckboxGroup")(
                      <CheckboxGroup
                        options={plainOptions}
                        onChange={this.onChange1}
                      />
                    )}
                  </FormItem>
                  <FormItem {...formItemLayout} label="背景">
                    {getFieldDecorator("CheckboxGroup")(
                      <Upload
                        action="//jsonplaceholder.typicode.com/posts/"
                        listType="picture"
                      >
                        <Button>
                          <Icon type="upload" />上传图片
                        </Button>
                        <div>海报尺寸：640X1080px；</div>
                        <div>大小200kb以内，支持png/jpg文件</div>
                      </Upload>
                    )}
                  </FormItem>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}
Home = Form.create({})(Home);
export default inject("user")(observer(Home));
