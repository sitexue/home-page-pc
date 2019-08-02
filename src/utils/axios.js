import axios from "axios";
import { message } from "antd";

const Axios = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  responseType: "json",
  withCredentials: true, // 是否允许带cookie这些
});

//POST传参序列化(添加请求拦截器)
Axios.interceptors.request.use(
  config => {
    if (
      config.method === "get" ||
      config.method === "delete"
    ) {
      // 序列化
      config.params = config.data;
    }
    return config;
  },
  error => {
    message.error(error)
    return Promise.reject(error.data.error.message);
  }
);

//返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
  response => {
    const res = response.data
    const regx = /^401\d?$/
    if (regx.test(res.status)) {
      message.error('登录失效，请重新登录')
      return Promise.reject(res);
    }
    if(res.status !== 200){
      message.error(res.msg)
      return Promise.reject(res);
    }
    return res;
  },
  error => {
    if (error.response) {
      if (/^40\d$/.test(error.response.status)) {
        message.error(`${error.response.status}: ${error.response.statusText}`)
      }
    }
    return Promise.reject(error)
  }
);

export default Axios
