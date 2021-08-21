import axios from "axios";
import qs from "qs";

const request = axios.create({
  baseURL: "",
  timeout: 20000,
});

request.interceptors.request.use(
  (config) => {
    if (
      config.method === "post" ||
      config.method === "POST" ||
      config.method === "Post"
    ) {
      console.log(config);
      config.headers["Authorization"] = "Bearer " + new Date().getTime();
      config.headers["X-Request-Id"] = +new Date();
      config.headers["Content-Type"] = "application/json";
      // config.data = qs.stringify(config.data);
    }
    return config;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  }
);
export default request;
