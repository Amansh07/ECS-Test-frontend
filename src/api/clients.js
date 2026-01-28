import { createApiClient } from "./createApiClient";

// ENV
const AUTH_API = import.meta.env.VITE_API_AUTH_URL;
const REGISTRATION_API = import.meta.env.VITE_API_REGISTRATION_URL;
const MASTER_API = import.meta.env.VITE_API_MASTER_URL;
const UPLOAD_API = import.meta.env.VITE_API_UPLOAD_URL;

// 8082 — Main API (with auth)
export const masterApiClient = createApiClient({
  baseURL: MASTER_API,
  withAuth: true,
});

// 8083 — Alt API (with auth)
export const registrationApiClient = createApiClient({
  baseURL: REGISTRATION_API,
  withAuth: true,
});

// 8086 — Login/Auth API (NO auth header)
export const authApiClient = createApiClient({
  baseURL: AUTH_API,
  withAuth: false,
});

// 9092 — Socket/Other HTTP (usually no auth)
export const uploadApiClient = createApiClient({
  baseURL: UPLOAD_API,
  withAuth: false,
});
