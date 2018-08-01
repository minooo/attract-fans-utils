import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { http } from "4-utils";
import {
  Radio,
  Form,
  Input,
  Checkbox,
  Upload,
  Button,
  Icon,
  Switch,
  InputNumber,
  message,
  Tooltip
} from "antd";
import { LoadingFetch } from "0-components";

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;
class Home extends Component {
  state = {
    shwo:false,
    PosterOptions: ["头像", "昵称"],
    imgUrl: null
  };
  componentDidMount() {
    const { id } = this.props.match.params;
    this.setState(() => ({
      show: true
    }));
    http
      .get("", {
        action: "poster",
        operation: "edit",
        id
      })
      .then(res => {
        if (res.errcode === 0) {
          const { result } = res;
          http.getC(
            "",
            {
              action: "poster",
              operation: "preview",
              type: result.type,
              image: result.image,
              is_avatar: result.is_avatar,
              is_nickname: result.is_nickname,
              code_font_color: result.code_font_color,
              code_font_size: result.code_font_size,
              qrcode: result.qrcode
            },
            ({ url }) => {
              this.setState(() => ({
                imgUrl: url,
                result,
                show: false,
              }));
            }
          );
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
  // 编译头像
  setCheck = (is_avatar, is_nickname) => {
    let arr = [];
    if (is_avatar) {
      arr = arr.concat("头像");
    }
    if (is_nickname) {
      arr = arr.concat("昵称");
    }
    return arr;
  };
 
  render() {
    const { getFieldDecorator } = this.props.form;
    const { show, result, PosterOptions, imgUrl } = this.state;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 }
    };
    const formItemLayoutSamll = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    };
    return (
      <div>
        {show && <LoadingFetch />}
        {/* 表单开始 */}
        <div className="mt30 plr25 border-default flex jc-center">
          <Form style={{ width: "900px", paddingTop: "40px" }}>
            {/*1. 选择公众号类型 */}
            <FormItem {...formItemLayout} label="选择公众号类型">
              {getFieldDecorator("type", {
                initialValue: result && result.type
              })(
                <RadioGroup disabled className="inline-block">
                  <Radio value={1}>服务号</Radio>
                  <Radio value={2}>订阅号</Radio>
                </RadioGroup>
              )}
            </FormItem>
            {/*2. 海报名称 */}
            <FormItem {...formItemLayout} label="海报名称">
              {getFieldDecorator("title", {
                initialValue: result && result.title
              })(
                <Input
                  disabled
                  style={{ width: "250px" }}
                  placeholder="海报名称"
                />
              )}
            </FormItem>
            {/*3. 海报上传与预览 */}
            <div className="flex">
              <div className="ant-col-4 ant-form-item-label">
                <label className="c333 text-right">海报设计</label>
              </div>
              {/*3.1 海报预览 */}
              <div className="flex equal">
                <div
                  className="plr20 pt20 border-default mr20"
                  style={{ width: "320px", height: "540px" }}
                >
                  <img style={{ width: "280px" }} src={imgUrl} alt="" />
                </div>
                {/*3.2 海报上传 */}
                <div className="plr20 ptb20 border-default equal">
                  {/*3.3 选择海报元素 */}
                  <FormItem {...formItemLayoutSamll} label="元素">
                    {getFieldDecorator("posterCon", {
                      initialValue: this.setCheck(
                        result && result.is_avatar,
                        result && result.is_nickname
                      )
                    })(<CheckboxGroup disabled options={PosterOptions} />)}
                  </FormItem>
                  <FormItem {...formItemLayoutSamll} label="背景">
                    {getFieldDecorator("image", {})(
                      <Upload
                        listType="picture"
                        showUploadList={false}
                        disabled
                      >
                        <Button>
                          <Icon type="upload" />上传图片
                        </Button>
                      </Upload>
                    )}
                  </FormItem>
                  {/* 上传的图片缩略图 */}
                  {result &&
                    result.image && (
                      <div
                        className="relative mb10 ant-col-offset-5"
                        style={{ width: "80px", height: "135px" }}
                      >
                        <img
                          className="w-100 h-100"
                          src={result && result.image}
                          alt=""
                        />
                      </div>
                    )}
                  <div className="common-warning">海报尺寸：640X1080px；</div>
                  <div className="common-warning">
                    大小200kb以内，支持png/jpg文件
                  </div>
                  {/* 订阅号专属 */}
                  {result &&
                    result.type === 2 && (
                      <div className="pt30">
                        <FormItem {...formItemLayoutSamll} label="二维码">
                          {getFieldDecorator("ercode")(
                            <Upload
                              listType="picture"
                              showUploadList={false}
                              disabled
                            >
                              <Button>
                                <Icon type="upload" />上传二维码
                              </Button>
                            </Upload>
                          )}
                        </FormItem>
                        {result &&
                          result.qrcode && (
                            <div
                              className="relative mb10 ant-col-offset-5"
                              style={{ width: "50px", height: "50px" }}
                            >
                              <img
                                className="w-100 h-100"
                                src={result && result.qrcode}
                                alt=""
                              />
                            </div>
                          )}
                        <div className="common-warning">
                          二维码尺寸：200X200px；
                        </div>
                        <div className="common-warning mb10">
                          大小200kb以内，支持png/jpg文件
                        </div>
                        <div className="flex">
                          <div className="ant-col-5 ant-form-item-label c333">
                            <label className="ant-form-item-required">
                              邀请码
                            </label>
                          </div>
                          <div>
                            <div className="flex">
                              <FormItem
                                style={{ marginRight: "10px" }}
                                {...formItemLayoutSamll}
                              >
                                {getFieldDecorator("code_start")(
                                  <InputNumber
                                    disabled
                                    placeholder="开始值"
                                    min={0}
                                  />
                                )}
                              </FormItem>
                              <FormItem {...formItemLayoutSamll}>
                                {getFieldDecorator("code_end")(
                                  <InputNumber
                                    min={0}
                                    disabled
                                    placeholder="结束值"
                                  />
                                )}
                              </FormItem>
                            </div>
                            <div className="flex">
                              <FormItem {...formItemLayoutSamll}>
                                {getFieldDecorator("code_font_size", {
                                  initialValue: result && result.code_font_size,
                                  rules: [
                                    {
                                      required: true,
                                      message: "请填写字体大小"
                                    }
                                  ]
                                })(
                                  <InputNumber
                                    placeholder="字体大小"
                                    max={100}
                                    disabled
                                    min={0}
                                    style={{
                                      marginRight: "10px"
                                    }}
                                  />
                                )}
                              </FormItem>
                              <div
                                className="relative"
                                style={{ marginTop: "3px" }}
                              >
                                <Tooltip
                                  placement="topLeft"
                                  title="当前字体颜色"
                                >
                                  <div
                                    style={{
                                      margin: "0px",
                                      backgroundColor: `${result &&
                                        result.code_font_color}`
                                    }}
                                    className="w32 h32 r4 common-curson"
                                  />
                                </Tooltip>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
            <FormItem
              style={{ marginTop: "20px" }}
              {...formItemLayout}
              label="自动生成海报"
            >
              {getFieldDecorator("is_auto", {
                valuePropName: "checked",
                initialValue: result && result.is_auto && result.is_auto === 1
              })(<Switch disabled />)}
              <div className="c666 font12">
                说明：活动开始时开启，关闭则不会生成海报
              </div>
            </FormItem>
            <FormItem {...formItemLayout} label="海报关键字">
              {getFieldDecorator("keyword", {
                initialValue: result && result.keyword
              })(
                <Input
                  style={{ width: "250px" }}
                  placeholder="请填写海报关键字"
                  disabled
                />
              )}
              <div className="c666 font12">
                说明：海报关键字是在公众号回复关键词可弹出海报，关键词建议为汉字
              </div>
            </FormItem>
            <FormItem {...formItemLayout} label="生成海报提示">
              {getFieldDecorator("reply_content", {
                initialValue: result && result.reply_content
              })(
                <TextArea
                  maxLength={200}
                  style={{ resize: "none" }}
                  rows={5}
                  disabled
                  placeholder="文字自定义，主要介绍活动奖品以及玩法，同时可添加活动攻略超链接、添加排行榜超链接、添加直接购买链接。150个字符以内。"
                />
              )}
              <div className="c666 font12">
                说明：粉丝点击菜单或者回复关键词获取海报之前弹出文字提示
              </div>
            </FormItem>
            <FormItem wrapperCol={{ span: 12, offset: 4 }} />
          </Form>
        </div>
      </div>
    );
  }
}
Home = Form.create({})(Home);
export default inject("user")(observer(Home));
