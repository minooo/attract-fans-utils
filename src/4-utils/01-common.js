export const serializeParams = params =>
  Object.entries(params)
    .map(n => `${n[0]}=${n[1]}`)
    .join("&");

export const isIphoneX = () =>
  /iphone/gi.test(navigator.userAgent) &&
  (window.screen.height === 812 && window.screen.width === 375);

export const isMobile = mobile => {
  if (!mobile) {
    return false;
  }
  const m = mobile.replace(/ /g, "");
  return /^1[3|4|5|7|8]\d{9}$/.test(m) ? m : false;
};

export const isIDNumber = id => {
  if (!id) {
    return false;
  }
  const m = id.replace(/ /g, "");
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(m) ? m : false;
};

export const isName = name => {
  if (!name) {
    return false;
  }
  const m = name.replace(/ /g, "");
  return /^[\u4e00-\u9fa5]{2,4}$/.test(m) ? m : false;
};

export const isIOS = () => /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);

export const isAndroid = () => /(Android)/i.test(navigator.userAgent);

export const setTitle = title => {
  document.title = title;
  // eslint-disable-next-line
  if (isIOS() && !window.__wxjs_is_wkwebview) {
    const i = document.createElement("iframe");
    i.src = "/favicon.ico";
    i.style.display = "none";
    i.onload = () => {
      setTimeout(() => {
        i.remove();
      }, 0);
    };
    document.body.appendChild(i);
  }
};

// 对价格的去0处理
export const clipPrice = item => {
  const re = /^\d+.?\d*$/;
  const num = +item;
  const str = num.toFixed(2);

  if (!re.test(item)) {
    console.info(item, "传入的参数为非法数字，请检查！");
  }

  if (str.substr(-1) !== "0") {
    return str;
  } else if (str.substr(-2) === "00") {
    return num.toFixed(0);
  }
  return num.toFixed(1);
};

// 对价格后的小数进行分离处理  135 ["135", ]
export const tipPrice = item => {
  const re = /^\d+.?\d*$/;
  const num = +item;
  const str = num.toFixed(2);

  if (!re.test(item)) {
    console.info(item, "传入的参数为非法数字，请检查！");
  }
  const [int, dec] = str.split(".");
  return { int, dec };
};

// 大额数字转万 / 亿
export const clipBigNum = item => {
  const num = +item;
  if (num >= 100000000) {
    const n1 = num / 100000000;
    const n2 = parseInt(n1, 0);
    const s2 = (parseInt(num / 10000000, 0) / 10).toFixed(1);
    if (n1 === n2 || +s2 === n2) {
      return `${n2}亿`;
    }
    return `${s2}亿`;
  }
  if (num >= 10000) {
    const n1 = num / 10000;
    const n2 = parseInt(n1, 0);
    const s2 = (parseInt(num / 1000, 0) / 10).toFixed(1);
    if (n1 === n2 || +s2 === n2) {
      return `${n2}万`;
    }
    return `${s2}万`;
  }
  return item;
};

// 从数组中随机取出若干不同的元素
export const getSomeFromArr = (arr, num) => {
  if (!arr) return null;
  if (arr.length <= num) {
    return arr;
  }
  const oldArr = [...arr];
  const newArr = [];
  function gg(array) {
    newArr.push(array.splice(Math.floor(Math.random() * array.length), 1)[0]);
  }
  for (let i = 0; i < num; i += 1) {
    gg(oldArr);
  }
  return newArr;
};

// search 转为 obj
export const searchToObj = path => {
  // window.location.search
  const obj = {};
  if (!path) return obj;
  const search = path.slice(path.indexOf("?"));
  if (!search || search.length < 4) return obj;
  const arr = search.slice(1).split("&");
  arr.forEach(item => {
    const itemArr = item.split("=");
    const key = itemArr[0];
    const val = itemArr[1];
    obj[key] = val;
  });
  return obj;
};

export const addDefault = (fromArr, toArr) => {
  toArr.forEach(item => {
    const o1 = fromArr.find(x => x.key === item.key);
    item.list.unshift(o1);
  });
  return toArr;
};

// 针对card loan 的 filter数据重构
export const addFilter = (initObj, toArr) => {
  const arr = [];
  toArr.forEach(item => {
    const { key } = item;
    const list = initObj[key];
    const newList = item.list.concat(list);
    arr.push({ ...item, list: newList });
  });
  return arr;
};

export const setCookie = (key, value, expiredays = 29) => {
  const exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = `${key}=${encodeURIComponent(
    value
  )};expires=${exdate.toUTCString()};path=/`;
};

export const getCookie = key => {
  const reg = new RegExp(`(^| )${key}=([^;]*)(;|$)`);
  const arr = document.cookie.match(reg);
  if (arr) return decodeURIComponent(arr[2]);
  return null;
};

export const delCookie = key => {
  const exdate = new Date();
  exdate.setTime(exdate.getTime() - 1);
  const value = getCookie(key);
  if (value)
    document.cookie = `${key}=${encodeURIComponent(
      value
    )};expires=${exdate.toUTCString()}`;
};

export const getUrlLastStr = pathStr => {
  // window.location.href
  const parts = pathStr && pathStr.split("/");
  const param = parts.pop() || parts.pop();
  const index = param.indexOf("?");
  if (index !== -1) {
    return param.slice(0, index);
  }
  return param;
};

// 判断当前路由是否激活
export const isActiveLink = (navLink, currentLink) => {
  const index = currentLink.indexOf("?");
  let initStr;
  if (index === -1) {
    initStr = currentLink;
  } else {
    initStr = currentLink.substr(0, index);
  }
  const keyStr = navLink.substr(1);
  const keyArr = initStr.split("/").slice(1);
  return keyArr.some(item => item === keyStr);
};

export const phoneHid = mobile => {
  if (!mobile) {
    return false;
  }
  const m = `${mobile.substr(0, 3)}****${mobile.substr(7)}`;
  return m;
};

export const textHid = text => {
  if (!text) {
    return false;
  } else if (text.length < 12) {
    return text;
  }
  const tex = `${text.substr(0, 12)}...`;
  return tex;
};

export const nameHid = name => {
  if (!name) {
    return false;
  }
  const tex = `${name.substr(0, 1)}***${name.substr(
    name.length - 2,
    name.length - 1
  )}`;
  return tex;
};
// 设置token
export const setToken = () => {
  const { token } = searchToObj(window.location.search);
  if (token) setCookie("token", token);
};

// 倒计时

const HOER = 3600000;
const MINUTES = 60000;
const SECOND = 1000;
// 倒计时
// upDateParse为格式化之后的时间，timer为定时器。
// 需要使用倒计时的页面需要在componentDidMount装载一个定时器在componentWillUnmount移除。
export const countDown = (upDateParse, timer) => {
  const dateDifference = upDateParse - new Date();
  // 时间到
  if (dateDifference <= 0) {
    if (timer) clearInterval(timer)
    return false;
  }
  /* eslint-disable */
  // 小时数
  const hourDifference = Math.floor(dateDifference / HOER);
  // 剩余天数
  const getdays = Math.floor(hourDifference / 24);
  // 分钟数
  const minuteDifference = Math.floor(
    (dateDifference - hourDifference * HOER) / MINUTES
  );
  // 秒数
  const secondDifference = Math.floor(
    (dateDifference - hourDifference * HOER - minuteDifference * MINUTES) /
      SECOND
  );
  // 小于10前面加0
  const residueHours = getdays > 0 ? hourDifference % 24 : hourDifference;
  const getHours = residueHours < 10 ? `0${residueHours}` : residueHours;
  const getMinutes =
    minuteDifference < 10 ? `0${minuteDifference}` : minuteDifference;
  const getSeconds =
    secondDifference < 10 ? `0${secondDifference}` : secondDifference;
  /* eslint-enable */
  // 大于一天
  return {
    getdays,
    getHours,
    getMinutes,
    getSeconds
  };
};
