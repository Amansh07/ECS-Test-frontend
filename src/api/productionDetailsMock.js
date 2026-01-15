export const createCropProduction = async (payload) => {
  console.log("Mock createCropProduction called:", payload);
  return {
    status: 200,
    data: {
      success: true,
      message: "Crop Production created successfully (mock)",
      data: {
        id: 1,
        fpoId: payload.fpoId,
        seasonId: payload.seasonId,
        cropId: payload.cropId,
        cropVarietyId: payload.cropVarietyId,
        productionQuantity: payload.productionQuantity,
        harvestedSurplus: payload.harvestedSurplus,
        estimatedOrHarvestedId: payload.estimatedOrHarvestedId,
        dateOfHarvesting: payload.dateOfHarvesting,
        description: payload.description,
        emartPublish: payload.emartPublish ?? false,
        docId: payload.docId || "DOC-MOCK-0001",
        isActive: true,
        createdOn: new Date().toISOString()
      }
    }
  };
};

export const getCropProductionById = async (id) => {
  console.log("Mock getCropProductionById called:", id);
  return {
    status: 200,
    data: {
      success: true,
      data: {
        id,
        fpoId: 12,
        seasonId: 1,
        cropId: 10,
        cropVarietyId: 3,
        productionQuantity: 1200,
        harvestedSurplus: 450,
        estimatedOrHarvestedId: 2,
        dateOfHarvesting: "2025-02-18",
        description: "Mocked sample data",
        emartPublish: true,
        docId: "DOC-MOCK-1234",
        isActive: true,
        createdOn: "2025-01-10T10:00:00Z"
      }
    }
  };
};

export const updateCropProduction = async (id, payload) => {
  console.log("Mock updateCropProduction called:", id, payload);
  return {
    status: 200,
    data: {
      success: true,
      message: "Crop Production updated successfully (mock)",
      data: {
        id,
        ...payload,
        updatedOn: new Date().toISOString()
      }
    }
  };
};

export const deleteCropProduction = async (id) => {
  console.log("Mock deleteCropProduction called:", id);
  return {
    status: 200,
    data: {
      success: true,
      message: `Crop Production with ID ${id} deleted (mock)`
    }
  };
};

export const listCropProduction = async (fpoId) => {
  console.log("Mock listCropProduction called for FPO:", fpoId);
  return {
    status: 200,
    data: {
      success: true,
      data: [
        {
          id: 1,
          fpoId,
          seasonId: 1,
          cropId: 10,
          cropVarietyId: 2,
          productionQuantity: 900,
          harvestedSurplus: 300,
          estimatedOrHarvestedId: 2,
          dateOfHarvesting: "2025-01-15",
          emartPublish: false
        },
        {
          id: 2,
          fpoId,
          seasonId: 2,
          cropId: 11,
          cropVarietyId: 4,
          productionQuantity: 700,
          harvestedSurplus: 200,
          estimatedOrHarvestedId: 1,
          dateOfHarvesting: "2025-03-20",
          emartPublish: true
        }
      ]
    }
  };
};

export const createCommodityProduction = async (payload) => {
  console.log("Mock createCommodityProduction called:", payload);
  return {
    status: 200,
    data: {
      success: true,
      message: "Commodity Production created successfully (mock)",
      data: {
        id: 101,
        fpoId: payload.fpoId,
        productCategoryId: payload.productCategoryId,
        productSubcategoryId: payload.productSubcategoryId,
        productName: payload.productName,
        annualProductionCap: payload.annualProductionCap,
        inProduction: payload.inProduction,
        availableStock: payload.availableStock,
        dateOfAvailability: payload.dateOfAvailability,
        isOrganic: payload.isOrganic,
        emartPublish: payload.emartPublish ?? false,
        docId: payload.docId || "DOC-MOCK-COM-01",
        crtBy: 1,
        crtOn: new Date().toISOString(),
        updBy: 1,
        updOn: new Date().toISOString()
      }
    }
  };
};

export const getCommodityProductionById = async (id) => {
  console.log("Mock getCommodityProductionById called:", id);
  return {
    status: 200,
    data: {
      success: true,
      data: {
        id,
        fpoId: 12,
        productCategoryId: 4,
        productSubcategoryId: 7,
        productName: "Mock Commodity",
        annualProductionCap: 5000,
        inProduction: true,
        availableStock: 1200,
        dateOfAvailability: "2025-03-01",
        isOrganic: false,
        emartPublish: true,
        docId: "DOC-MOCK-5678",
        crtBy: 1,
        crtOn: "2025-01-10T10:00:00Z",
        updBy: 1,
        updOn: "2025-01-10T10:00:00Z"
      }
    }
  };
};

export const updateCommodityProduction = async (id, payload) => {
  console.log("Mock updateCommodityProduction called:", id, payload);
  return {
    status: 200,
    data: {
      success: true,
      message: "Commodity Production updated (mock)",
      data: {
        id,
        ...payload,
        updOn: new Date().toISOString()
      }
    }
  };
};

export const listCommodityProduction = async (fpoId) => {
  console.log("Mock listCommodityProduction called for FPO:", fpoId);
  return {
    status: 200,
    data: {
      success: true,
      data: [
        {
          id: 101,
          fpoId,
          productCategoryId: 1,
          productSubcategoryId: 11,
          productId: 1,
          isOrganic: true,
          annualProductionCap: 2000,
          inProduction: true,
          availableStock: 1200,
          dateOfAvailability: "2025-01-15",
          emartPublish: true,
          docId: "DOC-COM-001",
        },
        {
          id: 102,
          fpoId,
          productCategoryId: 1,
          productSubcategoryId: 12,
          productId: 3,
          isOrganic: false,
          annualProductionCap: 1000,
          inProduction: false,
          availableStock: 800,
          dateOfAvailability: "2025-02-20",
          emartPublish: false,
          docId: "DOC-COM-002",
        },
        {
          id: 103,
          fpoId,
          productCategoryId: 2,
          productSubcategoryId: 21,
          productId: 4,
          isOrganic: true,
          annualProductionCap: 500,
          inProduction: true,
          availableStock: 350,
          dateOfAvailability: "2025-03-10",
          emartPublish: true,
          docId: "DOC-COM-003",
        },
      ],
    },
  };
};


export const getCommodityProductionByFpo = async (fpoId) => {
  console.log("Mock getCommodityProductionByFpo called:", fpoId);
  return {
    status: 200,
    data: {
      success: true,
      data: [
        {
          id: 201,
          fpoId,
          productName: "Cashew",
          availableStock: 500,
          inProduction: true
        },
        {
          id: 202,
          fpoId,
          productName: "Rubber Sheets",
          availableStock: 2000,
          inProduction: true
        }
      ]
    }
  };
};
