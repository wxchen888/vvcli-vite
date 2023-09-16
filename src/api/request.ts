import axios, { AxiosResponse } from "axios";

type TReturnData<T = object> = {
  code: string;
  message: string;
  success: boolean;
  data: T;
  timestamp: number;
};
export type ReturnPromise<T> = Promise<AxiosResponse<TReturnData<T>>>;

const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 1000 * 60
});

request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    if (response) {
      switch ((response.data as TReturnData).code) {
        case "401":
          //do logout
          break;
        default:
          break;
      }
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default request;
