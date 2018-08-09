## 嘟嘟科技-[公众号吸粉工具管理后台]-前端项目

## 前端备忘
- [create-react-app 指北](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md)
- [react-router](https://reacttraining.com/react-router/web/guides/philosophy)

# 一些必要讲解的
- 支持直接引入图片
```js
import React from 'react';
import logo from './logo.png'; // Tell Webpack this JS file uses this image

console.log(logo); // /logo.84287d09.png

function Header() {
  // Import result is the URL of your image
  return <img src={logo} alt="Logo" />;
}

export default Header;
```
## 打包
```
打包后，将build下的文件部署到 dolife-public/attract-fans-utils-static/backend
```

## Nav使用

一共有三个参数
```js
finish: 当前的活动是否开启，开启之后不能在进入基本设置页面。
poster_id：任务的id，只有创建海报页面需要。
submit：当前页面是否提交。
```

