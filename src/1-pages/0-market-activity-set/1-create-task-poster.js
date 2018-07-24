import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import axios from "axios";
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
  message
} from "antd";
import { http } from "4-utils";
import { Nav } from "0-components";

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const selectCon = arr => {
  return {
    is_code: arr.includes("二维码"),
    is_avatar: arr.includes("头像")
  };
};
class Home extends Component {
  state = {
    wxType: 1,
    PosterOptions: ["二维码", "头像", "昵称"],
    imageLoading: false,
    ercodeLoading: false,
    poster_id: null
  };
  // 当前选中 1.服务号 2.订阅号
  wxChange = e => {
    const { value } = e.target;
    if (value === 1) {
      this.setState(() => ({
        wxType: value,
        PosterOptions: ["二维码", "头像", "昵称"]
      }));
    } else {
      this.setState(() => ({
        wxType: value,
        PosterOptions: ["头像", "昵称"]
      }));
    }
  };
  // 上传状态改变
  handleChange = (info, type) => {
    // type 1.海报 2.二维码
    if (info.file.status === "uploading") {
      if (type === 1) {
        this.setState({ imageLoading: true });
      } else {
        this.setState({ ercodeLoading: true });
      }
      return;
    }
    console.log(info.file.originFileObj);
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, imageUrl => {
        if (type === 1) {
          this.setState({
            imageUrl,
            imageLoading: false
          });
        } else {
          this.setState({
            ercodeUrl: imageUrl,
            ercodeLoading: false
          });
        }
      });
    }
  };
  // 验证图片
  beforeUpload = (file, fileList, width, height) => {
    const isImage = file.type === "image/jpeg" || "image/png";
    if (!isImage) {
      message.error("请上传png/jpg类型的图片", 2);
    }
    const isLt200k = file.size / 1024 < 200;
    if (!isLt200k) {
      message.error("图片要小于200k");
    }
    const reader = new FileReader();
    //读取图片数据
    reader.addEventListener("load", e => {
      const data = e.target.result;
      //加载图片获取图片真实宽度和高度
      const image = new Image();
      image.addEventListener("load", () => {
        const w = image.width;
        const h = image.height;
        if (w !== width && h !== height) {
          message.error("请上传符合尺寸的图片", 2, () => {
            console.info(111);
            this.setState(
              pre => ({
                isSize: !pre.isSize
              }),
              () => {
                console.info(1);
              }
            );
          });
        }
      });
      image.src = data;
    });
    reader.readAsDataURL(file);
    // console.log(this.state.isSize);
    // console.log(isImage && isLt200k && this.state.isSize);
    return isImage && isLt200k && this.state.isSize;
  };
  handleSubmit = e => {
    this.setState(() => ({
      poster_id: 1,
      submit: true
    }));
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };
  customRequest = data => {
    const { file } = data;
    const isImage = file.type === "image/jpeg" || "image/png";
    if (!isImage) {
      message.error("请上传png/jpg类型的图片", 2);
      return;
    }
    const isLt200k = file.size / 1024 < 200;
    if (!isLt200k) {
      message.error("图片要小于200k");
      return;
    }
    const reader = new FileReader();
    //读取图片数据
    reader.addEventListener("load", e => {
      const data = e.target.result;
      //加载图片获取图片真实宽度和高度
      const image = new Image();
      image.addEventListener("load", () => {
        const w = image.width;
        const h = image.height;
        if (w !== 208 && h !== 370) {
          message.error("请上传符合尺寸的图片", 2);
        } else {
          axios({
            baseURL: "http://mp.duduapp.net/",
            url: "upload/image",
            method: "post",
            data: file
          });
        }
      });
      image.src = data;
    });
    reader.readAsDataURL(file);
  };
  // 预览图片需要数据
  getValue = (value, type) => {
    switch (type) {
      case 1:
        this.setState(() => ({
          posterCon: value
        }));
      case 2:
        this.setState(() => ({
          code_start: value
        }));
      case 3:
        this.setState(() => ({
          code_end: value
        }));
      case 4:
        this.setState(() => ({
          code_font_size: value
        }));
      case 5:
        this.setState(() => ({
          code_font_color: value
        }));
    }
  };
  removeImg = () => {
    console.log(123);
  };
  // 预览图片
  onPreview = () => {
    const {
      code_font_color,
      code_font_size,
      code_end,
      posterCon,
      code_start
    } = this.state;
    if (!code_font_size) {
      message.error("缺少字体大小", 2);
      return;
    } else if (!code_font_color) {
      message.error("缺少字体颜色", 2);
      return;
    } else if (!code_end) {
      message.error("缺少字体颜色", 2);
      return;
    } else if (!code_start) {
      message.error("缺少字体颜色", 2);
      return;
    }
    // ...
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      wxType,
      PosterOptions,
      imageLoading,
      ercodeLoading,
      imageUrl,
      ercodeUrl,
      poster_id,
      submit
    } = this.state;
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
        <Nav poster_id={poster_id} submit={submit} />
        {/* 表单开始 */}
        <div className="mt30 plr25 border-default flex jc-center">
          <Form
            style={{ width: "900px", paddingTop: "40px" }}
            onSubmit={this.handleSubmit}
          >
            {/*1. 选择公众号类型 */}
            <FormItem {...formItemLayout} label="选择公众号类型">
              {getFieldDecorator("type", {
                rules: [{ required: true, message: "请选择公众号类型" }]
              })(
                <RadioGroup className="inline-block" onChange={this.wxChange}>
                  <Radio value={1}>服务号</Radio>
                  <Radio value={2}>订阅号</Radio>
                </RadioGroup>
              )}
            </FormItem>
            {/*2. 海报名称 */}
            <FormItem {...formItemLayout} label="海报名称">
              {getFieldDecorator("title", {
                rules: [{ required: true, message: "请填写海报名称" }]
              })(<Input style={{ width: "250px" }} placeholder="海报名称" />)}
            </FormItem>
            {/*3. 海报上传与预览 */}
            <div className="flex">
              <div className="ant-col-4 ant-form-item-label">
                <label className="ant-form-item-required c333 text-right">海报设计</label>
              </div>
              {/*3.1 海报预览 */}
              <div className="flex equal">
                <div
                  className="plr20 ptb20 border-default mr20"
                  style={{ width: "320px", minHeight: "540px" }}
                >
                  <img style={{ height: "470px" }} src="" alt="" />
                </div>
                {/*3.2 海报上传 */}
                <div className="plr20 ptb20 border-default equal">
                  {/*3.3 选择海报元素 */}
                  <FormItem {...formItemLayoutSamll} label="元素">
                    {getFieldDecorator("posterCon")(
                      <CheckboxGroup
                        options={PosterOptions}
                        onChange={value => this.getValue(value, 1)}
                      />
                    )}
                  </FormItem>
                  <FormItem {...formItemLayoutSamll} label="背景">
                    {getFieldDecorator("image", {
                      rules: [{ required: true, message: "请上传图片" }]
                    })(
                      <Upload
                        action="http://mp.duduapp.net/upload/image"
                        listType="picture"
                        // customRequest={this.customRequest}
                        showUploadList={false}
                        // onChange={info => this.handleChange(info, 1)}
                        // beforeUpload={(file, fileList) =>
                        //   this.beforeUpload(file, fileList, 640, 1080)
                        // }
                      >
                        <Button>
                          <Icon
                            type={`${imageLoading ? "loading" : "upload"}`}
                          />上传图片
                        </Button>
                      </Upload>
                    )}
                  </FormItem>
                  {/* 上传的图片缩略图 */}
                  {imageUrl && (
                    <div
                      className="relative mb10"
                      style={{ width: "80px", height: "135px" }}
                    >
                      <img className="w-100 h-100" src={imageUrl} alt="" />
                      <div
                        onClick={this.removeImg}
                        className="absolute font20 lh100 common-curson"
                        style={{
                          backgroundColor: "none",
                          border: "none",
                          top: "-10px",
                          right: "-10px"
                        }}
                      >
                        <Icon type="close-circle" />
                      </div>
                    </div>
                  )}
                  <div className="common-warning">海报尺寸：640X1080px；</div>
                  <div className="common-warning">
                    大小200kb以内，支持png/jpg文件
                  </div>
                  {/* 订阅号专属 */}
                  {wxType === 2 && (
                    <div className="pt30">
                      <FormItem {...formItemLayoutSamll} label="二维码">
                        {getFieldDecorator("ercode", {
                          rules: [{ required: true, message: "请上传二维码" }]
                        })(
                          <Upload
                            action="http://mp.dev.duduapp.net/upload/image"
                            listType="picture"
                            showUploadList={false}
                            onChange={info => this.handleChange(info, 2)}
                            beforeUpload={(file, fileList) =>
                              this.beforeUpload(file, fileList, 200, 200)
                            }
                          >
                            <Button>
                              <Icon
                                type={`${ercodeLoading ? "loading" : "upload"}`}
                              />上传二维码
                            </Button>
                          </Upload>
                        )}
                      </FormItem>
                      {ercodeUrl && (
                        <div
                          className="relative mb10"
                          style={{ width: "50px", height: "50px" }}
                        >
                          <img
                            className="w-100 h-100"
                            src="http://p3oeo2qki.bkt.clouddn.com/18-4-14/95596364.jpg"
                            alt=""
                          />
                          <div
                            onClick={this.removeImg}
                            className="absolute font20 lh100 common-curson"
                            style={{
                              top: "-10px",
                              right: "-10px"
                            }}
                          >
                            <Icon type="close-circle" />
                          </div>
                        </div>
                      )}
                      <div className="common-warning">
                        二维码尺寸：200X200px；
                      </div>
                      <div className="common-warning">
                        大小200kb以内，支持png/jpg文件
                      </div>
                      <div className="flex">
                        <div className="ant-col-5 ant-form-item-label c333">
                         <label className="ant-form-item-required">邀请码</label>
                        </div>
                        <div>
                          <div className="flex">
                            <FormItem
                              style={{ marginRight: "10px" }}
                              {...formItemLayoutSamll}
                            >
                              {getFieldDecorator("code_start", {
                                rules: [
                                  { required: true, message: "请填写开始值" }
                                ]
                              })(
                                <InputNumber
                                  onChange={value => this.getValue(value, 2)}
                                  placeholder="开始值"
                                />
                              )}
                            </FormItem>
                            <FormItem {...formItemLayoutSamll}>
                              {getFieldDecorator("code_end", {
                                rules: [
                                  { required: true, message: "请填写结束值" }
                                ]
                              })(
                                <InputNumber
                                  placeholder="结束值"
                                  onChange={value => this.getValue(value, 3)}
                                />
                              )}
                            </FormItem>
                          </div>
                          <div className="flex">
                            <FormItem {...formItemLayoutSamll}>
                              {getFieldDecorator("code_font_size", {
                                rules: [
                                  { required: true, message: "请填写字体大小" }
                                ]
                              })(
                                <InputNumber
                                  onChange={value => this.getValue(value, 4)}
                                  placeholder="字体大小"
                                  style={{
                                    marginRight: "10px"
                                  }}
                                />
                              )}
                            </FormItem>
                            <FormItem {...formItemLayoutSamll}>
                              {getFieldDecorator("code_font_color", {
                                rules: [
                                  { required: true, message: "请填写字体颜色" }
                                ]
                              })(
                                <Input
                                  onChange={value => this.getValue(value, 5)}
                                  placeholder="字体颜色"
                                />
                              )}
                            </FormItem>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <Button className="mt30 ant-col-offset-5" type="primary">
                    预览
                  </Button>
                </div>
              </div>
            </div>
            <FormItem
              style={{ marginTop: "20px" }}
              {...formItemLayout}
              label="自动生成海报"
            >
              {getFieldDecorator("is_auto")(<Switch />)}
              <div className="c666 font12">
                活动开始时开启，关闭则不会生成海报
              </div>
            </FormItem>
            <FormItem {...formItemLayout} label="海报关键字">
              {getFieldDecorator("keyword", {
                rules: [{ required: true, message: "请填写海报关键字" }]
              })(
                <Input
                  style={{ width: "250px" }}
                  placeholder="请填写海报关键字"
                />
              )}
              <div className="c666 font12">
                海报关键字是在公众号回复关键词可弹出海报，关键词建议为汉字
              </div>
            </FormItem>
            <FormItem {...formItemLayout} label="生成海报提示">
              {getFieldDecorator("reply_content", {
                rules: [{ required: true, message: "请填写生成海报提示" }]
              })(
                <TextArea
                  maxLength={200}
                  style={{ resize: "none" }}
                  rows={5}
                  placeholder="文字自定义，主要介绍活动奖品以及玩法，同时可添加活动攻略超链接、添加排行榜超链接、添加直接购买链接。150个字符以内。"
                />
              )}
              <div className="c666 font12">
                说明：粉丝点击菜单或者回复关键词获取海报之前弹出文字提示
              </div>
            </FormItem>
            <FormItem wrapperCol={{ span: 12, offset: 4 }}>
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
Home = Form.create({})(Home);
export default inject("user")(observer(Home));
