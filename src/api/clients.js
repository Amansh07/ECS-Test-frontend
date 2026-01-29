import { createApiClient } from "./createApiClient";

// ENV
const AUTH_API = import.meta.env.VITE_API_AUTH_URL;
const API_8082 = import.meta.env.VITE_API_8082_URL;
const API_8083 = import.meta.env.VITE_API_8083_URL;
const API_8084 = import.meta.env.VITE_API_8084_URL;
const API_8085 = import.meta.env.VITE_API_8085_URL;
const UPLOAD_API = import.meta.env.VITE_API_UPLOAD_URL;

// 8082 — Main API (with auth)
export const masterApiClient = createApiClient({
  baseURL: API_8082,
  withAuth: true,
});

export const registrationClient = createApiClient({
  baseURL: API_8083,
  withAuth: false,
});

// 8083 — Alt API (with auth)
export const api8083Client = createApiClient({
  baseURL: API_8083,
  withAuth: true,
});

// 8084 — Alt API (with auth)
export const api8084Client = createApiClient({
  baseURL: API_8084,
  withAuth: true,
});

// 8085 — Alt API (with auth)
export const api8085Client = createApiClient({
  baseURL: API_8085,
  withAuth: true,
});

// 8086 — Login/Auth API (NO auth header)
export const authApiClient = createApiClient({
  baseURL: AUTH_API,
  withAuth: false,
});

// 9092 — Socket/Other HTTP (usually no auth)
export const uploadApiClientWithAuth = createApiClient({
  baseURL: UPLOAD_API,
  withAuth: true,
});

// 9092 — Socket/Other HTTP (usually no auth)
export const uploadApiClientWithoutAuth = createApiClient({
  baseURL: UPLOAD_API,
  withAuth: false,
});
