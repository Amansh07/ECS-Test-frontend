import axios from "axios";
import AuthService from "../auth/AuthService";
import { refreshAccessToken } from "./authApi";

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

  // ---------------- REQUEST INTERCEPTOR ----------------
  if (withAuth) {
    client.interceptors.request.use((config) => {
      const token = AuthService.getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  // ---------------- RESPONSE INTERCEPTOR ----------------
  client.interceptors.response.use(
    (response) => response.data,

    async (error) => {
      const originalRequest = error.config;
      const status = error?.response?.status;

      // ========== REFRESH TOKEN FLOW ==========
      if (withAuth && status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = AuthService.getRefreshToken();

          // No refresh token → force logout
          if (!refreshToken) {
            AuthService.logout("expired");
            return Promise.reject(error);
          }

          const refreshRes = await refreshAccessToken(refreshToken);

          const newAccessToken = refreshRes?.accessToken;

          if (!newAccessToken) {
            // Refresh API didn't return token
            AuthService.logout("expired");
            return Promise.reject(error);
          }

          // Save new access token
          AuthService.setAccessToken(newAccessToken);

          // Retry original request
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return client(originalRequest);

        } catch (refreshError) {
          console.error("Refresh token failed:", refreshError);

          // Refresh token expired / invalid
          AuthService.logout("expired");
          return Promise.reject(refreshError);
        }
      }

      // ========== RETRY GET ON 5xx ==========
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

      // ========== NORMAL ERROR ==========
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
