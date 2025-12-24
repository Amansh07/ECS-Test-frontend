import axios from "axios";
import AuthService from "../auth/AuthService";
import { useErrorBoundary } from "react-error-boundary";

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

/**
 * Request interceptor
 */
apiClient.interceptors.request.use(
  async (config) => {
     const { showBoundary } = useErrorBoundary();
   try { const token = await AuthService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }}
    catch(err){
      showBoundary(err); 
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response interceptor
 */
apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;
    const status = error?.response?.status;

    /**
     * Retry GET requests once for server errors
     */
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

    /**
     * Let OIDC handle session expiry
     */
    const { showBoundary } = useErrorBoundary()
    if (status === 401) {
      try{
        AuthService.signIn();
      }catch (err) {
      // This manually triggers the Error Boundary
      showBoundary(err); 
    }
      
    }

    return Promise.reject({
      status,
      message:
        error?.response?.data?.message ||
        error?.message ||
        "API Error",
      data: error?.response?.data,
    });
  }
);

export default apiClient;
