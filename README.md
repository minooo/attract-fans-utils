## 嘟嘟科技-[公众号吸粉工具管理后台]-前端项目

## 前端备忘
- [create-react-app 指北](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md)

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
