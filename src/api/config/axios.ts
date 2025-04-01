import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: process.env.DUMMY_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = window.localStorage.getItem("token");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    config.headers.Accept = "application/json";

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error?.response?.status || 0;
    if (status === 401) {
      if (localStorage.getItem("token")) {
        localStorage.clear();
        window.location.assign("/");
        return Promise.reject(error);
      } else {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
