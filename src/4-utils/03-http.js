import axios from "axios";
import { message } from "antd";

// axios config https://github.com/axios/axios#request-config
// const myApi = 'https://www.easy-mock.com/mock/58fff6e5739ac1685205acb1/data/'

// axios.interceptors.response.use((response) => {
//   console.info(response, "rr")
//   return response;
// }, function (error) {
//   console.info(error.response, 'asd')
// });
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
const { origin, pathname } = window.location
const dev = process.env.NODE_ENV !== "production"
const apiUrl = origin + pathname

const callApi = (url, method, data, options = {}) => {
  const opts = { ...options };
  return axios(
    Object.assign(
      {},
      {
        baseURL: dev ? "/L15aP8O79DN1QVyKRbpd/" : apiUrl,
        url,
        method,
        params: method === "get" ? data : {}, // 添加在请求URL后面的参数
        data: method !== "get" ? data : {}, // 适用于 PUT POST PATCH
        withCredentials: true // 请求时是否携带cookie
      },
      opts
    )
  ).then(data => data.data);
};

const commonCallApi = (url, method, data, options = {}) => successFn =>
  callApi(url, method, data, options).then(data => {
    const { errcode } = data
    if (!errcode) {
      successFn(data)
    } else {
      message.error(data.msg)
    }
  }).catch(err => {
    message.error("网络出错，请稍后再试！")
    console.error(err)
  });

export default {
  callApi,
  get: (url, data = {}) => callApi(url, "get", data),
  getC: (url, data = {}, successFn) =>
    commonCallApi(url, "get", data)(successFn),

  put: (url, data = {}) => callApi(url, "put", data),
  putC: (url, data = {}, successFn) =>
    commonCallApi(url, "put", data)(successFn),

  post: (url, data = {}) => callApi(url, "post", data),
  postC: (url, data = {}, successFn) =>
    commonCallApi(url, "post", data)(successFn),

  delete: (url, data = {}) => callApi(url, "delete", data),
  deleteC: (url, data = {}, successFn) =>
    commonCallApi(url, "delete", data)(successFn)
};
