export const getAllVillages = async () => {
  return {
    status: 200,
    data: {
      success: true,
      data: [
        { id: 1, name: "Village A", panchayatId: 10 },
        { id: 2, name: "Village B", panchayatId: 10 },
        { id: 3, name: "Village C", panchayatId: 11 },
        { id: 4, name: "Village D", panchayatId: 11 },
        { id: 5, name: "Village E", panchayatId: 12 },
        { id: 6, name: "Village F", panchayatId: 12 },
        { id: 7, name: "Village G", panchayatId: 13 },
        { id: 8, name: "Village H", panchayatId: 13 },
        { id: 9, name: "Village I", panchayatId: 14 },
        { id: 10, name: "Village J", panchayatId: 14 }
      ]
    }
  };
};

export const getVillageById = async (id) => {
  return {
    status: 200,
    data: {
      success: true,
      data: { id, name: `Village ${String.fromCharCode(64 + id)}`, panchayatId: 10 + (id % 5) }
    }
  };
};

export const getVillageByPanchayatId = async (panchayatId) => {
  let villages = [];
  for (let i = 1; i <= 10; i++) {
    villages.push({ id: i, name: `Village ${String.fromCharCode(64 + i)}`, panchayatId });
  }
  return { status: 200, data: { success: true, data: villages } };
};

export const getAllStates = async () => {
  return {
    status: 200,
    data: {
      success: true,
      data: [
        { id: 1, name: "Karnataka", countryId: 1 },
        { id: 2, name: "Kerala", countryId: 1 },
        { id: 3, name: "Tamil Nadu", countryId: 1 },
        { id: 4, name: "Andhra Pradesh", countryId: 1 },
        { id: 5, name: "Maharashtra", countryId: 1 },
        { id: 6, name: "Gujarat", countryId: 1 },
        { id: 7, name: "Rajasthan", countryId: 1 },
        { id: 8, name: "West Bengal", countryId: 1 },
        { id: 9, name: "Odisha", countryId: 1 },
        { id: 10, name: "Punjab", countryId: 1 }
      ]
    }
  };
};

export const getStateById = async (id) => {
  return {
    status: 200,
    data: { success: true, data: { id, name: `State ${id}`, countryId: 1 } }
  };
};

export const getStatesByCountryId = async (countryId) => {
  let states = [];
  for (let i = 1; i <= 10; i++) {
    states.push({ id: i, name: `State ${i}`, countryId });
  }
  return { status: 200, data: { success: true, data: states } };
};

export const getAllProductCategories = async () => {
  return {
    status: 200,
    data: {
      success: true,
      data: [
        { id: 1, name: "Cereals" },
        { id: 2, name: "Spices" },
        { id: 3, name: "Vegetables" },
        { id: 4, name: "Fruits" },
        { id: 5, name: "Pulses" },
        { id: 6, name: "Oilseeds" },
        { id: 7, name: "Flowers" },
        { id: 8, name: "Herbs" },
        { id: 9, name: "Fibers" },
        { id: 10, name: "Cash Crops" }
      ]
    }
  };
};

export const getProductCategoryById = async (productCategoryId) => {
  return {
    status: 200,
    data: { success: true, data: { id: productCategoryId, name: `Category ${productCategoryId}` } }
  };
};

export const getSubcategoriesByCategoryId = async (productCategoryId) => {
  let subcategories = [];
  for (let i = 1; i <= 10; i++) {
    subcategories.push({ id: i + 10, name: `Subcategory ${i}`, productCategoryId });
  }
  return { status: 200, data: { success: true, data: subcategories } };
};

export const getProductSubcategoryById = async (productSubcategoryId) => {
  return {
    status: 200,
    data: { success: true, data: { id: productSubcategoryId, name: `Subcategory ${productSubcategoryId}`, productCategoryId: 1 } }
  };
};

export const getAllGramPanchayat = async () => {
  let panchayats = [];
  for (let i = 1; i <= 10; i++) {
    panchayats.push({ id: i + 10, name: `Panchayat ${i}`, blockId: 100 + i });
  }
  return { status: 200, data: { success: true, data: panchayats } };
};

export const getGramPanchayatById = async (id) => {
  return { status: 200, data: { success: true, data: { id, name: `Panchayat ${id}`, blockId: 100 + id } } };
};

export const getGramPanchayatByBlock = async (blockId) => {
  let panchayats = [];
  for (let i = 1; i <= 10; i++) {
    panchayats.push({ id: i + 10, name: `Panchayat ${i}`, blockId });
  }
  return { status: 200, data: { success: true, data: panchayats } };
};

export const getGeneralMasterByType = async (type) => {
  let masters = [];
  for (let i = 1; i <= 10; i++) {
    masters.push({ id: i, type, name: `${type} Option ${i}` });
  }
  return { status: 200, data: { success: true, data: masters } };
};

export const getAllGeneralAgencies = async () => {
  let agencies = [];
  for (let i = 1; i <= 10; i++) {
    agencies.push({ id: i, name: `Agency ${i}` });
  }
  return { status: 200, data: { success: true, data: agencies } };
};

export const getGeneralMasterById = async (id) => {
  return { status: 200, data: { success: true, data: { id, name: `General Master ${id}`, type: "GENERIC" } } };
};

export const getAllDistricts = async () => {
  let districts = [];
  for (let i = 1; i <= 10; i++) {
    districts.push({ id: 100 + i, name: `District ${i}`, stateId: 1 });
  }
  return { status: 200, data: districts };
};

export const getDistrictById = async (id) => {
  return { status: 200, data: { id, name: `District ${id}`, stateId: 1 } };
};

export const getAllCountries = async () => {
  let countries = [];
  for (let i = 1; i <= 10; i++) {
    countries.push({ id: i, name: `Country ${i}` });
  }
  return { status: 200, data: countries };
};

export const getCountryById = async (id) => {
  return { status: 200, data: { id, name: `Country ${id}` } };
};

export const getAllBlocks = async () => {
  let blocks = [];
  for (let i = 1; i <= 10; i++) {
    blocks.push({ id: 100 + i, name: `Block ${i}`, districtId: 100 + i });
  }
  return { status: 200, data: blocks };
};

export const getBlockById = async (id) => {
  return { status: 200, data: { id, name: `Block ${id}`, districtId: 100 + id } };
};

export const getBlocksByDistrictId = async (districtId) => {
  let blocks = [];
  for (let i = 1; i <= 10; i++) {
    blocks.push({ id: 100 + i, name: `Block ${i}`, districtId });
  }
  return { status: 200, data: blocks };
};
