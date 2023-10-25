import axios from "axios";
import { ENDPOINT, PORT_TOKEN } from "../constants";
import Cookies from "js-cookie";
import { message } from "antd";

const request = axios.create({
  baseURL: `${ENDPOINT}api/v1/`,
  timeout: 10000,
  headers: { Authorization: `Bearer ${Cookies.get(PORT_TOKEN)}` },
});

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    message.error(err.response.data.message);
    return Promise.reject(err);
  }
);

export default request;
