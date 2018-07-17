import React, { Fragment } from "react";

export default ({ type = "loading", text, err }) => (
  <Fragment>
    {type === "loading" && (
      <div className="flex column ai-center ptb20">
        <i className="i-loading font28 c666 mb10 common-loading" />
        <span>加载中...</span>
      </div>
    )}
    {type === "no-more" && (
      <div
        style={{
          width: "65%",
          borderTop: "1px solid #d9d9d9",
          margin: "2.4em auto 1.5em"
        }}
        className="c999 text-center"
      >
        <span
          style={{
            position: "relative",
            top: "-0.6em"
          }}
          className="plr15 lh100 c999 font28 bg-border"
        >
          扯到底了
        </span>
      </div>
    )}
    {type === "no-data" && (
      <div className="flex column jc-center ai-center ptb20">
        <div className="common-no-data mt30" />
        <div className="mt20 c999 font28">{text || "暂无相关数据"}</div>
      </div>
    )}
    {type === "no-net" && (
      <div className="flex column jc-center ai-center ptb20">
        <div className="common-no-net mt30" />
        <div className="mt20 c999 font28">
          {text || "啊哦~网络开小差了"}
        </div>
      </div>
    )}
    {type === "error" && (
      <div style={{ height: "2rem" }} className="flex column ai-center jc-center plr25 ptb20 h-full">
        {console.info("错误详情", err)}
        <div className="font32 c333 ptb20 mt30">无法显示页面</div>
        <div className="font28 c999">
          抱歉，服务器获取数据失败，请稍后再试！
        </div>
      </div>
    )}
  </Fragment>
);
