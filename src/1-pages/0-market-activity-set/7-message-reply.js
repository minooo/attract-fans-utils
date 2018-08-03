import React, { Component, Fragment } from "react";
import { Input, Form, Button, Upload, Icon, Modal, message } from "antd";
import { http } from "4-utils";
import { Nav, LoadingFetch } from "0-components";

const FormItem = Form.Item;
const { TextArea } = Input;

class Message extends Component {
  state = {
    show: false,
    submitting: false,
    previewVisible: false,
    previewImage: "",
    fileList: [],
    submit: false
  };
  componentDidMount() {
    this.getData();
  }
  getData = async () => {
    this.setState(() => ({
      show: true
    }));
    const { errcode, msg, result } = await http.get(null, {
      action: "customSetting"
    });
    if (parseInt(errcode, 10) === 0 && msg === "success") {
      this.setState({
        show: false,
        result: result
      });
      if (result.task_image) {
        this.setState({
          fileList: [
            {
              uid: -1,
              name: "1.png",
              status: "done",
              url: result.task_image
            }
          ]
        });
      }
    } else {
      message.error(msg);
    }
  };
  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFieldsAndScroll(
      { first: true, force: true },
      (err, values) => {
        if (!err) {
          const { fileList } = this.state;
          const { follow, task_content, cancel, repeat, poster_end } = values;
          if (fileList.length > 0) {
            var task_image =
              (fileList[0].response && fileList[0].response.url) ||
              fileList[0].url;
          }
          const { id } = this.props.match.params;
          http.postC(
            null,
            {
              action: "customSetting",
              poster_id: id,
              follow,
              task_content,
              task_image,
              cancel,
              repeat,
              poster_end
            },
            data => {
              message.success("客服回复消息设置成功", 2, () => {
                this.setState({ submit: true });
              });
            }
          );
        }
      }
    );
  };
  // 处理预览
  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };
  // 处理预览取消
  handleCancel = () => this.setState({ previewVisible: false });
  // 处理上传图片
  handleChange = ({ fileList }) => {
    this.setState({ fileList });
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
    const {
      submitting,
      previewVisible,
      previewImage,
      fileList,
      submit,
      show,
      result
    } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" className=" font32 c999" />
        <div className=" mt10 c666">Upload</div>
      </div>
    );
    return (
      <Fragment>
        <Nav submit={submit} />
        {show && <LoadingFetch />}
        <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
          <FormItem
            {...formItemLayout}
            label="关注自动回复"
            extra="扫码自动回复"
          >
            {getFieldDecorator("follow", {
              initialValue: result && result.follow,
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
              initialValue: result && result.cancel,
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
              initialValue: result && result.repeat,
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
              initialValue: result && result.poster_end,
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
              initialValue: result && result.task_content,
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
          <FormItem
            {...formItemLayout}
            label="任务完成推送"
            extra="任务完成后推送图片。"
          >
            <Upload
              action="?_api=upload"
              listType="picture-card"
              fileList={fileList}
              accept="image/*"
              onPreview={this.handlePreview}
              onChange={this.handleChange}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal
              visible={previewVisible}
              footer={null}
              onCancel={this.handleCancel}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
          </FormItem>
          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" loading={submitting}>
              提交
            </Button>
          </FormItem>
        </Form>
      </Fragment>
    );
  }
}
export default Form.create()(Message);
