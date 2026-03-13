import axios, { type InternalAxiosRequestConfig } from "axios";
import { auth } from "../config/firebase";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
});

http.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const user = auth.currentUser;

    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
