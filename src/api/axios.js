import axios from "axios";
import { message } from "antd";

// Add a request interceptor
axios.interceptors.request.use(
  function(config) {
    config.baseURL = "http://localhost";
    return config;
  },
  function(error) {
    message.error("出现异常");;
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    return response.data;
  },
  function(error) {
    message.error("出现异常");
    return Promise.reject(error);
  }
);

export default axios;