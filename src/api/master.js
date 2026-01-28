// src/api/masterApi.js
import { masterApiClient } from "./clients"; // same client as login

// Get all districts
export const getDistricts = () => {
  return masterApiClient.get("/api/v1/master/districts");
};

// Get blocks by districtId
export const getBlocksByDistrictId = (districtId) => {
  return masterApiClient.get(`/api/v1/master/blocks/district/${districtId}`);
};

// Get generic master data (e.g., agencies)
export const getGeneral = (type) => {
  return masterApiClient.get(`/api/v1/master/generic/${type}`);
};

// ---------------- GET CROPS BY SEASON ----------------
export const getCropsBySeason = (seasonId) => {
  return masterApiClient.get(
    `/api/v1/agri-master/getCropBySeason/${seasonId}`
  );
};

// ---------------- GET VARIETIES BY CROP ----------------
export const getVarietiesByCrop = (cropId) => {
  return masterApiClient.get(
    `/api/v1/agri-master/getVarietyByCrop/${cropId}`
  );
};


