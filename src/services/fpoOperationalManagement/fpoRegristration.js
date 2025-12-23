import apiClient from "../api/apiClient";

/**
 * GET all FPO registrations
 */
export const getFpoRegistrations = () => {
  return apiClient.get("/fpo");
};

/**
 * GET single FPO by ID
 */
export const getFpoById = (id) => {
  return apiClient.get(`/fpo/${id}`);
};

/**
 * CREATE FPO registration
 */
export const createFpo = (payload) => {
  return apiClient.post("/fpo", payload);
};

/**
 * UPDATE FPO registration
 */
export const updateFpo = (id, payload) => {
  return apiClient.put(`/fpo/${id}`, payload);
};

/**
 * DELETE FPO registration
 */
export const deleteFpo = (id) => {
  return apiClient.delete(`/fpo/${id}`);
};
