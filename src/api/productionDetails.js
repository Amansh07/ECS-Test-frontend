import { api8084Client } from "./clients";
// ---------------- CROP PRODUCTION CREATE ----------------
export const createCropProduction = async (payload) => {
  const response = await api8084Client.post(
    "/api/v1/inventory/crop-productions",
    payload
  );

  // response is already unwrapped
  return response;
};

// ---------------- CROP PRODUCTION UPDATE ----------------
export const updateCropProduction = async (id, payload) => {
  const response = await api8084Client.put(
    `/api/v1/inventory/crop-productions/${id}`,
    payload
  );
  return response;
};

// ---------------- CROP PRODUCTION LIST ----------------
export const getCropProductionList = async ({
  fpoId,
  page = 0,
  size = 10,
  sort = "asc",
}) => {
  const response = await api8084Client.get(
    `/api/v1/inventory/crop-productions/list?fpoId=${fpoId}&page=${page}&size=${size}&sort=${sort}`
  );

  // response is already unwrapped
  return response;
};

// ---------------- CROP PRODUCTION GET BY ID ----------------
export const getCropProductionById = async (id) => {
  const response = await api8084Client.get(
    `/api/v1/inventory/crop-productions/${id}`
  );
  return response;
};
