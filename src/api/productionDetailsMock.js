
import { getGeneralMasterByType } from "./masterMock";

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
      }
    }
  };
};

export const getCropProductionById = async (id) => {
  console.log("Mock getCropProductionById :", id);
  return {
    status: 200,
    data: {
      success: true,
      data: {
        id,
        fpoId: 12,
        seasonId: 8,
        cropId: 2,
        cropVarietyId: 222,
        productionQuantity: 1500.5,
        harvestedSurplus: 25.75,
        estimatedOrHarvestedId: 2,
        dateOfHarvesting: "2025-02-18",
        description: "Mocked samplee data",
        emartPublish: true,
        docId: null,
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

// masterMock.js (or wherever your API mocks are)

export const listCropProduction = () => {
  return {
    "data": [
      {
        "createdOn": null,
        "cropId": 2,
        "cropName": "Arhar",
        "cropVarietyId": 222,
        "cropVarietyName": "Pusa Parvaty",
        "dateOfHarvesting": "2025-01-10",
        "description": "hello",
        "docId": null,
        "emartPublish": true,
        "estimatedOrHarvestedId": 788,
        "harvestedSurplus": 25.75,
        "id": 2,
        "isActive": true,
        "productionQuantity": 1500.5,
        "seasonId": 8,
        "seasonName": "Kharif"
      },
      {
        "createdOn": null,
        "cropId": 12,
        "cropName": "Bougainvillea",
        "cropVarietyId": 3,
        "cropVarietyName": "Avon",
        "dateOfHarvesting": "2025-01-10",
        "description": null,
        "docId": null,
        "emartPublish": true,
        "estimatedOrHarvestedId": null,
        "harvestedSurplus": 25.75,
        "id": 3,
        "isActive": true,
        "productionQuantity": 1500.5,
        "seasonId": 8,
        "seasonName": "Kharif"
      },
      {
        "createdOn": null,
        "cropId": 12,
        "cropName": "Bougainvillea",
        "cropVarietyId": 3,
        "cropVarietyName": "Avon",
        "dateOfHarvesting": "2025-01-10",
        "description": null,
        "docId": null,
        "emartPublish": true,
        "estimatedOrHarvestedId": null,
        "harvestedSurplus": 25.75,
        "id": 4,
        "isActive": true,
        "productionQuantity": 1500.5,
        "seasonId": 8,
        "seasonName": "Kharif"
      },
      {
        "createdOn": null,
        "cropId": 12,
        "cropName": "Bougainvillea",
        "cropVarietyId": 3,
        "cropVarietyName": "Avon",
        "dateOfHarvesting": "2025-01-10",
        "description": null,
        "docId": null,
        "emartPublish": true,
        "estimatedOrHarvestedId": null,
        "harvestedSurplus": 25.75,
        "id": 5,
        "isActive": true,
        "productionQuantity": 1500.5,
        "seasonId": 8,
        "seasonName": "Kharif"
      },
      {
        "createdOn": null,
        "cropId": 12,
        "cropName": "Bougainvillea",
        "cropVarietyId": 3,
        "cropVarietyName": "Avon",
        "dateOfHarvesting": "2025-01-10",
        "description": "Rabi wheat production",
        "docId": "5",
        "emartPublish": true,
        "estimatedOrHarvestedId": 950,
        "harvestedSurplus": 26.75,
        "id": 7,
        "isActive": true,
        "productionQuantity": 1500.5,
        "seasonId": 8,
        "seasonName": "Kharif"
      },
      {
        "createdOn": null,
        "cropId": 12,
        "cropName": "Bougainvillea",
        "cropVarietyId": 3,
        "cropVarietyName": "Avon",
        "dateOfHarvesting": "2025-01-10",
        "description": "Rabi wheat production",
        "docId": "5",
        "emartPublish": true,
        "estimatedOrHarvestedId": 950,
        "harvestedSurplus": 26.75,
        "id": 6,
        "isActive": true,
        "productionQuantity": 1500.5,
        "seasonId": 8,
        "seasonName": "Kharif"
      }
    ],
    "error": null,
    "message": null,
    "metadata": null,
    "pagination": {
      "page": 0,
      "size": 10,
      "totalElements": 6,
      "totalPages": 1
    },
    "success": true
  }
};

export const createCommodityProduction = async (payload) => {
  console.log("Mock createCommodityProduction called:", payload);

  return {
    status: 200,
    data: {
      success: true,
      message: "Commodity production created successfully",
      data: {
        id: payload.id ?? 5, // mock assigned ID
        fpoId: payload.fpoId,
        productCategoryId: payload.productCategoryId,
        productSubcategoryId: payload.productSubcategoryId,
        productName: payload.productName,
        annualProductionCap: payload.annualProductionCap,
        availableStock: payload.availableStock,
        dateOfAvailability: payload.dateOfAvailability,
        inProduction: payload.inProduction,
        isOrganic: payload.isOrganic,
        emartPublish: payload.emartPublish ?? false,
        docId: payload.docId ?? "5",
        isActive: true,

        // mimic backend timestamps
        crtBy: null,
        crtOn: new Date().toISOString(),
        updBy: null,
        updOn: null
      },
      error: null,
      metadata: null,
      pagination: null
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
        productCategoryId: 1,
        productSubcategoryId: 2,
        productId: 24,
        productName: "Mock Commodity",
        annualProductionCap: 5000,
        inProduction: true,
        availableStock: 1200,
        dateOfAvailability: "2025-03-01",
        isOrganic: false,
        emartPublish: true,
        docId: null,
        crtBy: 1,
        crtOn: "2025-01-10T10:00:00Z",
        updBy: 1,
        updOn: "2025-01-10T10:00:00Z"
      }
    }
  };
};

export const updateCommodityProduction = async (payload) => {
  console.log("Mock updateCommodityProduction called:", payload);

  return {
    status: 200,
    data: {
      success: true,
      message: "Commodity production updated successfully",
      data: {
        id: payload.id ?? 5, // mock assigned ID
        fpoId: payload.fpoId,
        productCategoryId: payload.productCategoryId,
        productSubcategoryId: payload.productSubcategoryId,
        productName: payload.productName,
        annualProductionCap: payload.annualProductionCap,
        availableStock: payload.availableStock,
        dateOfAvailability: payload.dateOfAvailability,
        inProduction: payload.inProduction,
        isOrganic: payload.isOrganic,
        emartPublish: payload.emartPublish ?? false,
        docId: payload.docId ?? "5",
        isActive: true,

        // mimic backend timestamps
        crtBy: null,
        crtOn: new Date().toISOString(),
        updBy: null,
        updOn: null
      },
      error: null,
      metadata: null,
      pagination: null
    }
  };
};


export const listCommodityProduction = (fpoId) => {
  console.log("Mock listCommodityProduction called for FPO:", fpoId);
  return {
    "data": [
      {
        "annualProductionCap": 100,
        "availableStock": 10,
        "dateOfAvailability": "2026-01-15",
        "emartPublish": true,
        "fpoId": 1,
        "id": 2,
        "inProduction": true,
        "isActive": true,
        "isOrganic": true,
        "productCategoryId": 1,
        "productCategoryName": "Dairy",
        "productId": 24,
        "productName": "Terracotta Diyas",
        "productSubcategoryId": 2,
        "productSubcategoryName": "Khoya"
      },
      {
        "annualProductionCap": 100,
        "availableStock": 10,
        "dateOfAvailability": "2024-01-15",
        "emartPublish": true,
        "fpoId": 1,
        "id": 3,
        "inProduction": true,
        "isActive": true,
        "isOrganic": true,
        "productCategoryId": 1,
        "productCategoryName": "Dairy",
        "productName": null,
        "productSubcategoryId": 1,
        "productSubcategoryName": "Terracotta"
      },
      {
        "annualProductionCap": 100,
        "availableStock": 10,
        "dateOfAvailability": "2024-01-15",
        "emartPublish": true,
        "fpoId": 1,
        "id": 4,
        "inProduction": true,
        "isActive": true,
        "isOrganic": true,
        "productCategoryId": 1,
        "productCategoryName": "Dairy",
        "productName": null,
        "productSubcategoryId": 1,
        "productSubcategoryName": "Terracotta"
      },
      {
        "annualProductionCap": 100,
        "availableStock": 10,
        "dateOfAvailability": "2024-01-15",
        "emartPublish": true,
        "fpoId": 1,
        "id": 5,
        "inProduction": true,
        "isActive": true,
        "isOrganic": true,
        "productCategoryId": 1,
        "productCategoryName": "Dairy",
        "productName": "MILK",
        "productSubcategoryId": 1,
        "productSubcategoryName": "Terracotta"
      }
    ],
    "error": null,
    "message": null,
    "metadata": null,
    "pagination": {
      "page": 0,
      "size": 10,
      "totalElements": 4,
      "totalPages": 1
    },
    "success": true
  }
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


