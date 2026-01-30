// src/api/masterApi.js
import { masterApiClient } from "./clients"; // same client as login

// Get all districts
export const getDistricts = async() => {
  return await masterApiClient.get("/api/v1/master/districts");
};

// Get blocks by districtId
export const getBlocksByDistrictId = async(districtId) => {
  return await masterApiClient.get(`/api/v1/master/blocks/district/${districtId}`);
};

// Get generic master data (e.g., agencies)
export const getGeneral = async(type) => {
  return await masterApiClient.get(`/api/v1/master/generic/${type}`);
};

// ---------------- GET CROPS BY SEASON ----------------
export const getCropsBySeason = async(seasonId) => {
  return await masterApiClient.get(
    `/api/v1/agri-master/getCropBySeason/${seasonId}`
  );
};

// ---------------- GET VARIETIES BY CROP ----------------
export const getVarietiesByCrop = async(cropId) => {
  return await masterApiClient.get(
    `/api/v1/agri-master/getVarietyByCrop/${cropId}`
  );
};

// ---------------- PRODUCT CATEGORY LIST ----------------
export const getProductCategoryList = async () => {
  return await masterApiClient.get(
    "/api/v1/master/product-categories"
  );
};

// ---------------- PRODUCT CATEGORY SUBCATEGORIES ----------------
export const getSubcategoriesByProductCategoryId = async (productCategoryId) => {
  return await masterApiClient.get(
    `/api/v1/master/product-categories/${productCategoryId}/subcategories`
  );
};

// ---------------- GET PRODUCTS BY SUBCATEGORY ----------------
export const getProductsBySubcategoryId = async (productSubcategoryId) => {
  return await masterApiClient.get(
    `/api/v1/master/product-categories/subcategories/${productSubcategoryId}/products`
  );
};
