import { api8083Client } from "./clients"; // same client as login

export const registerFPO = async (payload) => {
  // Just return the axios call; errors will be handled where you call this
  return await api8083Client.post("/api/v1/fpo/registration", payload);
};
