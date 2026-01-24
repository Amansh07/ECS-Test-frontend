import axios from "axios";
import AuthService from "../auth/AuthService";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const createApiClient = ({ baseURL, withAuth = true }) => {
  const client = axios.create({
    baseURL,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  // Attach token if required
  if (withAuth) {
    client.interceptors.request.use((config) => {
      const token = AuthService.getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  // Global response + error handling
  client.interceptors.response.use(
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
        return client(originalRequest);
      }

      // 401 → logout
      if (withAuth && status === 401) {
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

      console.error("API Error:", baseURL, apiError);
      return Promise.reject(apiError);
    }
  );

  return client;
};
