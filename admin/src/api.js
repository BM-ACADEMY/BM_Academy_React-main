import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URI,
  headers: {
    "Content-Type": "application/json",
  },
});

// 1. Request Interceptor: Attaches the token to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 2. Response Interceptor: Catches 401 (Token Expired) errors
API.interceptors.response.use(
  (response) => {
    // If the response is successful, just return it
    return response;
  },
  (error) => {
    // Check if the error is a 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      console.warn("Session expired. Logging out...");

      // Clear all auth data
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user_email");

      // Force redirect to login page
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;
