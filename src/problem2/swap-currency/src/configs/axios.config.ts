import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BE_URL,
});

api.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(response.data);
      }, 3000)
    );
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
