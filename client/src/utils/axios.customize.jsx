import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/",
  // timeout: 1000,
  // headers: { 'X-Custom-Header': 'foobar' }
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    console.log(">>> Interceptor", response);

    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log("Run error: ", error.response);

    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
    // return error;
  }
);

export default instance;
