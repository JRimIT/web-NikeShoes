import axios from "axios";
<<<<<<< HEAD
=======
// import { useNavigate } from "react-router-dom";
>>>>>>> 5394466e2f357ff7d74e7a8ee2bd13000e5ac89b

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

<<<<<<< HEAD
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
    // return error;
=======
    // Check if the error response status is 401 and contains a token expired message
    if (error.response && error.response.status === 401) {
      const message = error.response.data?.message;

      if (message === "Token expired. Please login again.") {
        alert(message);
        // Clear the token from local storage and redirect to the login page
        localStorage.clear();
        window.location.href = "/login"; // Redirect to login
      }
    }

    if (error.response && error.response.status === 403) {
      const message = error.response.data?.message;
      if (message === "Permission Denied") {
        window.location.href = "/DenyAccess";
      } else if (message === "Invalid token.") {
        window.location.href = "/DenyAccess";
      }
    }

    // if (error.response && error.response.status === 500) {
    //   window.location.href = "/errorPage";
    // }

    // Return the error object or message for further handling
    return Promise.reject(error.response?.data || error);
>>>>>>> 5394466e2f357ff7d74e7a8ee2bd13000e5ac89b
  }
);

export default instance;
