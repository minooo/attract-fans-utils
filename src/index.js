import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import registerServiceWorker from "./registerServiceWorker";

// 统一引进store
import * as stores from "./3-store";
import App from "./5-root";

// 样式最后引，这样好覆盖。
import "./2-static/styles/common/common.css";

const app = (
  <Provider {...stores}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
