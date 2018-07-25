import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import { LocaleProvider } from "antd";
import zhCN from "antd/lib/locale-provider/zh_CN";
import registerServiceWorker from "./registerServiceWorker";

// 统一引进store
import * as stores from "./3-store";
import App from "./5-root";

// 样式最后引，这样好覆盖。
import "./2-static/styles/common/common.css";

const app = (
  <LocaleProvider locale={zhCN}>
    <Provider {...stores}>
      <App />
    </Provider>
  </LocaleProvider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
