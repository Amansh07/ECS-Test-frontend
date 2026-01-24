import { authApiClient } from "./clients";
import AuthService from "../auth/AuthService";

export const login = async (username, password) => {
  const response = await authApiClient.post("/v1/auth/login", {
    username,
    password,
  });

  // response is already unwrapped
  AuthService.setTokens(response);

  return response;
};
