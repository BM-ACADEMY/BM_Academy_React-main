import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URI,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // or "access_token" — pick one and use it everywhere
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } 
  return config;
});

export default API;
