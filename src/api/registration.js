import { registrationClient } from "./clients"; // same client as login

export const registerFPO = async (payload) => {
  // Just return the axios call; errors will be handled where you call this
  return await registrationClient.post("/api/v1/fpo/registration", payload);
};

export const checkDuplicate = async (type, value) => {
  return await registrationClient.get(
    `/api/v1/fpo/registration/duplicate-check?type=${type}&value=${value}`
  );
};
