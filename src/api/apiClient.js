import axios from "axios";
import AuthService from "../auth/AuthService";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

apiClient.interceptors.request.use(
  (config) => {
    const token = AuthService.getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;
    const status = error?.response?.status;

    // Retry GET once for 5xx
    if (
      status &&
      [500, 502, 503, 504].includes(status) &&
      originalRequest?.method === "get" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      await sleep(1000);
      return apiClient(originalRequest);
    }

    if (status === 401) {
      AuthService.logout();
    }

    const apiError = {
      status,
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong. Please try again.",
      data: error?.response?.data,
    };

    console.error("API Error:", apiError);
    return Promise.reject(apiError);
  }
);

export default apiClient;
