import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { http } from "4-utils";
import { SketchPicker } from "react-color";
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
  Tooltip,
  Modal
} from "antd";
import { Nav } from "0-components";

const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;
class Home extends Component {
  state = {
    wxType: 1,
    PosterOptions: ["头像", "昵称"],
    imageLoading: false,
    ercodeLoading: false,
    poster_id: null,
    isPicker: false,
    code_font_color: "#333333",
    posterCon: []
  };
  // 当前选中 1.服务号 2.订阅号
  wxChange = e => {
    const { value } = e.target;
    if (value === 1) {
      this.setState(() => ({
        wxType: value
      }));
    } else {
      this.setState(() => ({
        wxType: value
      }));
    }
  };
  handleSubmit = e => {
    e.preventDefault();
    const {
      wxType,
      image,
      qrcode,
      posterCon,
      code_font_color,
      submit
    } = this.state;
    const { history } = this.props;
    if (submit) {
      message.info("请不要重复提交", 2);
      return;
    }
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        message.error("请填写必要信息");
      } else {
        if (!image) {
          message.error("请上传海报", 2);
          return;
        }
        if (wxType === 2 && !qrcode) {
          message.error("请上传二维码", 2);
          return;
        }
        const {
          title,
          code_font_size,
          keyword,
          reply_content,
          is_auto
        } = values;
        const param = {
          action: "poster",
          operation: "store",
          type: wxType,
          title,
          image,
          is_auto: is_auto ? 1 : 0,
          keyword,
          reply_content,
          is_avatar: posterCon.includes("头像") ? 1 : 0,
          is_nickname: posterCon.includes("昵称") ? 1 : 0
        };
        http.postC(
          "",
          wxType === 1
            ? { ...param }
            : { ...param, code_font_color, code_font_size, qrcode },
          ({ id }) => {
            this.setState(
              () => ({
                submit: true,
                poster_id: id
              }),
              () =>
                message.success("提交成功,即将前往基本设置页面", 2, () =>
                  history.replace(`/base-info-set_${id}`)
                )
            );
          }
        );
      }
    });
  };
  // 上传图片
  customRequest = (files, type) => {
    // type 1.海报上传 2.图片上传
    const { file } = files;
    // 限制格式
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
        const width = type === 1 ? 640 : 200;
        const height = type === 1 ? 1080 : 200;
        const w = image.width;
        const h = image.height;
        if (w !== width || h !== height) {
          message.error("请上传符合尺寸的图片", 2);
        } else {
          this.setState(() => ({
            imageLoading: type === 1,
            ercodeLoading: type === 2
          }));
          let formData = new FormData();
          formData.append("file", file);
          // _api=upload
          http
            .post("?_api=upload", formData)
            .then(({ url }) => {
              if (type === 1) {
                this.setState(() => ({
                  image: url,
                  imageLoading: false
                }));
              } else {
                this.setState(() => ({
                  qrcode: url,
                  ercodeLoading: false
                }));
              }
            })
            .catch(err => {
              this.setState(() => ({
                ercodeLoading: false,
                imageLoading: false
              }),()=>message.error("网络出错，请稍后再试！", 2));
            });
        }
      });
      image.src = data;
    });
    reader.readAsDataURL(file);
  };
  // 预览图片需要数据
  getValue = (value, type) => {
    // 1.图片内容,2字体尺寸,3字体颜色
    switch (type) {
      case 1:
        this.setState(() => ({
          posterCon: value
        }));
        break;
      case 2:
        this.setState(() => ({
          code_start: value
        }));
        break;
      case 3:
        this.setState(() => ({
          code_end: value
        }));
        break;
      case 4:
        this.setState(() => ({
          code_font_size: value
        }));
        break;
      case 5:
        this.setState(() => ({
          code_font_color: value.hex
        }));
        break;
      default:
        return;
    }
  };
  // 删除图片
  removeImg = type => {
    confirm({
      title: "确定删除",
      content: "你真的要删除该海报吗",
      okText: "确定",
      okType: "danger",
      cancelText: "取消",
      onOk: () => {
        if (type === 1) {
          this.setState(() => ({
            image: null
          }));
        } else {
          this.setState(() => ({
            qrcode: null
          }));
        }
      }
    });
  };
  // 预览图片
  onPreview = () => {
    const {
      code_font_color,
      code_font_size,
      wxType,
      posterCon,
      image,
      qrcode
    } = this.state;
    if (!image) {
      message.error("请上传海报", 2);
    } else if (wxType === 2 && !qrcode) {
      message.error("请上传二维码", 2);
    } else if (wxType === 2 && !code_font_color) {
      message.error("请填写邀请码字体颜色", 2);
    } else if (wxType === 2 && !code_font_size) {
      message.error("请填写邀请码字体大小", 2);
    } else {
      //mp.dev.duduapp.net/h5backend/L15aP8O79DN1QVyKRbpd?action=poster&operation=preview&type=2&image=https://file.duduapp.net/image/2018/05/03/f5ef981fce98dc805d7714cd319982c0.gif&is_avatar=1&is_nickname=1&is_qrcode=1&code_font_size=36&code_font_color=FF00FF
      const param = {
        action: "poster",
        operation: "preview",
        type: wxType,
        image,
        is_avatar: posterCon.includes("头像") ? 1 : 0,
        is_nickname: posterCon.includes("昵称") ? 1 : 0
      };
      http.getC(
        "",
        wxType === 1
          ? { ...param }
          : { ...param, code_font_color, code_font_size, qrcode },
        ({ url }) => {
          this.setState(() => ({
            posterUrl: url
          }));
        }
      );
    }
  };
  // 颜色选择
  colorPicker = () => {
    this.setState(pre => ({
      isPicker: !pre.isPicker
    }));
  };
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const {
      wxType,
      PosterOptions,
      imageLoading,
      ercodeLoading,
      image,
      qrcode,
      poster_id,
      submit,
      isPicker,
      code_font_color,
      posterUrl
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
                <label className="ant-form-item-required c333 text-right">
                  海报设计
                </label>
              </div>
              {/*3.1 海报预览 */}
              <div className="flex equal">
                <div
                  className="plr20 ptb20 border-default mr20"
                  style={{ width: "320px", minHeight: "540px" }}
                >
                  <img style={{ height: "470px" }} src={posterUrl} alt="" />
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
                        action="http://mp.dev.duduapp.net/h5backend/L15aP8O79DN1QVyKRbpd?_api=upload"
                        listType="picture"
                        customRequest={data => this.customRequest(data, 1)}
                        showUploadList={false}
                        disabled={imageLoading}
                        onChange={this.onChange}
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
                  {image && (
                    <div
                      className="relative mb10 ant-col-offset-5"
                      style={{ width: "80px", height: "135px" }}
                    >
                      <img className="w-100 h-100" src={image} alt="" />
                      <div
                        onClick={() => this.removeImg(1)}
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
                            disabled={ercodeLoading}
                            customRequest={data => this.customRequest(data, 2)}
                          >
                            <Button>
                              <Icon
                                type={`${ercodeLoading ? "loading" : "upload"}`}
                              />上传二维码
                            </Button>
                          </Upload>
                        )}
                      </FormItem>
                      {qrcode && (
                        <div
                          className="relative mb10 ant-col-offset-5"
                          style={{ width: "50px", height: "50px" }}
                        >
                          <img className="w-100 h-100" src={qrcode} alt="" />
                          <div
                            onClick={() => this.removeImg(2)}
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
                                  onChange={value => this.getValue(value, 2)}
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
                                  max={100}
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
                              <Tooltip placement="topLeft" title="选择字体颜色">
                                <div
                                  onClick={this.colorPicker}
                                  style={{
                                    margin: "0px",
                                    backgroundColor: `${code_font_color}`
                                  }}
                                  className="w32 h32 r4 common-curson"
                                />
                              </Tooltip>
                              {isPicker && (
                                <div className="absolute z20">
                                  <div
                                    className="common-cover"
                                    onClick={this.colorPicker}
                                  />
                                  <SketchPicker
                                    disableAlpha
                                    color={code_font_color}
                                    onChange={value => this.getValue(value, 5)}
                                    handleChangeComplete={
                                      this.handleChangeComplete
                                    }
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <Button
                    onClick={this.onPreview}
                    className="mt30 ant-col-offset-5"
                    type="primary"
                  >
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
                说明：活动开始时开启，关闭则不会生成海报
              </div>
            </FormItem>
            <FormItem {...formItemLayout} label="海报关键字">
              {getFieldDecorator("keyword", {
                rules: [
                  {
                    required: !!getFieldValue("is_auto"),
                    message: "请填写海报关键字"
                  }
                ]
              })(
                <Input
                  style={{ width: "250px" }}
                  placeholder="请填写海报关键字"
                />
              )}
              <div className="c666 font12">
                说明：海报关键字是在公众号回复关键词可弹出海报，关键词建议为汉字
              </div>
            </FormItem>
            <FormItem {...formItemLayout} label="生成海报提示">
              {getFieldDecorator("reply_content", {
                rules: [
                  {
                    required: !!getFieldValue("is_auto"),
                    message: "请填写生成海报提示"
                  }
                ]
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
              <div className="c666 font12">
                说明：你至少要完成基本设置才能创建活动。
              </div>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}
Home = Form.create({})(Home);
export default inject("user")(observer(Home));
