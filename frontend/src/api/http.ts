import axios from "axios";

export const http = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" }
});

// Optional: nicer error messages
http.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg =
      err?.response?.data?.message ??
      err?.response?.data?.error ??
      err?.message ??
      "Request failed";
    return Promise.reject(new Error(msg));
  }
);
