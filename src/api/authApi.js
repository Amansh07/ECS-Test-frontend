import { authApiClient } from "./clients";
import AuthService from "../auth/AuthService";

export const login = async (username, password) => {
  const response = await authApiClient.post("/api/v1/auth/login", {
    username,
    password,
  });

  // response is already unwrapped
  AuthService.setTokens(response);

  return response;
};

// authApi.js
export const refreshAccessToken = async (refreshToken) => {
  return authApiClient.post("/api/v1/auth/refresh", {
    refreshToken,
  });
};


export const temprorayToken = async () => {
  const response = await authApiClient.post("api/v1/auth/temp-token", "");

  // response is already unwrapped
  // AuthService.setTokens(response);

  return response;
};

// ---------------- CAPTCHA GENERATE ----------------
export const generateCaptcha = async () => {
  const response = await authApiClient.get("/api/v1/captcha/generate");
  return response;
};

// ---------------- CAPTCHA VERIFY ----------------
export const verifyCaptchaApi = async (captchaId, userAnswer) => {
  const response = await authApiClient.post("/api/v1/captcha/verify", {
    captchaId,
    userAnswer,
  });

  return response;
};
