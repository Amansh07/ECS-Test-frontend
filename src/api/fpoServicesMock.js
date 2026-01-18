export const createFertilizer = async (payload) => {
    console.log("Mock createFertilizer called:", payload);

    return {
        status: 200,
        data: {
            success: true,
            message: "Fertilizer entry created successfully (mock)",
            data: {
                id: 1, // mock id
                fpoId: payload.fpoId,
                fertilizerType: payload.fertilizerType,
                fertilizerGrade: payload.fertilizerGrade,
                fertilizerName: payload.fertilizerName,
                manufacturerName: payload.manufacturerName,
                quantityType: payload.quantityType,
                quantity: payload.quantity,
                purchaseDate: payload.purchaseDate,
                expiryDate: payload.expiryDate,
                batchNo: payload.batchNo,
                remarks: payload.remarks,
                docId: payload.docId || "FERT-MOCK-0001",
                createdOn: new Date().toISOString(),
                isActive: true
            }
        }
    };
};

export const getFertilizerById = async (id) => {
    console.log("Mock getFertilizerById called:", id);

    return {
        status: 200,
        data: {
            success: true,
            data: {
                id,
                fpoId: 1,
                fertilizerType: 2,
                fertilizerGrade: 102,
                fertilizerName: "Super NPK Mix",
                manufacturerName: "AgriChem",
                quantityType: 201,
                quantity: 500,
                purchaseDate: "2024-02-15",
                expiryDate: "2025-02-15",
                batchNo: "CHEM20240215",
                remarks: "High yield NPK fertilizer",
                docId: "FERT-MOCK-5678",
                isActive: true,
                createdOn: "2024-01-01T09:30:00Z"
            }
        }
    };
};

export const updateFertilizer = async (id, payload) => {
    console.log("Mock updateFertilizer called:", id, payload);

    return {
        status: 200,
        data: {
            success: true,
            message: "Fertilizer entry updated successfully (mock)",
            data: {
                id,
                ...payload,
                updatedOn: new Date().toISOString()
            }
        }
    };
};


export const listFertilizer = () => {
    return {
        success: true,
        message: "Success",
        error: null,
        metadata: null,
        pagination: {
            page: 0,
            size: 10,
            totalElements: 4,
            totalPages: 1
        },
        data: [
            {
                id: 1,
                fpoId: 1,
                fertilizerType: 1,
                fertilizerTypeName: "Organic",
                fertilizerGrade: 101,
                fertilizerGradeName: "NPK 10:26:26",
                fertilizerName: "Bio Compost",
                manufacturerName: "GreenGrow",
                quantityType: 201,
                quantityTypeName: "Kg",
                quantity: 500,
                purchaseDate: "2024-01-10",
                expiryDate: "2025-01-10",
                batchNo: "ORG001",
                remarks: "Organic fertilizer suitable for vegetables",
                isActive: true,
                createdOn: null,
                docId: null
            },
            {
                id: 2,
                fpoId: 1,
                fertilizerType: 2,
                fertilizerTypeName: "Inorganic",
                fertilizerGrade: 102,
                fertilizerGradeName: "NPK 12:32:16",
                fertilizerName: "Super NPK Mix",
                manufacturerName: "AgriChem",
                quantityType: 202,
                quantityTypeName: "Ton",
                quantity: 2.5,
                purchaseDate: "2024-02-15",
                expiryDate: "2025-02-15",
                batchNo: "CHEM20240215",
                remarks: "High yield performance",
                isActive: true,
                createdOn: null,
                docId: null
            },
            {
                id: 3,
                fpoId: 1,
                fertilizerType: 3,
                fertilizerTypeName: "Bio-Fertilizer",
                fertilizerGrade: 105,
                fertilizerGradeName: "Compost",
                fertilizerName: "Vermi Compost",
                manufacturerName: "SoilWorks",
                quantityType: 201,
                quantityTypeName: "Kg",
                quantity: 300,
                purchaseDate: "2024-03-02",
                expiryDate: "2024-12-31",
                batchNo: "BIO300",
                remarks: null,
                isActive: true,
                createdOn: null,
                docId: null
            },
            {
                id: 4,
                fpoId: 1,
                fertilizerType: 2,
                fertilizerTypeName: "Inorganic",
                fertilizerGrade: 103,
                fertilizerGradeName: "Urea (46% N)",
                fertilizerName: "Premium Urea",
                manufacturerName: "FarmCorp",
                quantityType: 201,
                quantityTypeName: "Kg",
                quantity: 1000,
                purchaseDate: "2024-05-12",
                expiryDate: "2025-05-12",
                batchNo: "UREA20240512",
                remarks: "Standard urea nitrogen fertilizer",
                isActive: true,
                createdOn: null,
                docId: "FERTIMG001"
            }
        ]
    };
};

// ==============================================
// fpoServicesInsecticideMock.js
// ==============================================

// ================= CREATE =================
export const createInsecticide = async (payload) => {
  console.log("Mock createInsecticide called:", payload);

  return {
    status: 200,
    data: {
      success: true,
      message: "Insecticide entry created successfully (mock)",
      data: {
        id: 1, // mock id
        fpoId: payload.fpoId,
        insecticideType: payload.insecticideType,
        insecticideName: payload.insecticideName,
        manufacturerName: payload.manufacturerName,
        quantityType: payload.quantityType,
        quantity: payload.quantity,
        purchaseDate: payload.purchaseDate,
        expiryDate: payload.expiryDate,
        batchNo: payload.batchNo,
        remarks: payload.remarks,
        docId: payload.docId || "INSECT-MOCK-0001",
        createdOn: new Date().toISOString(),
        isActive: true,
      },
    },
  };
};

// ================= GET BY ID =================
export const getInsecticideById = async (id) => {
  console.log("Mock getInsecticideById called:", id);

  return {
    status: 200,
    data: {
      success: true,
      data: {
        id,
        fpoId: 1,
        insecticideType: 1,
        insecticideName: "Sample Insecticide",
        manufacturerName: "ABC Chemicals",
        quantityType: 201,
        quantity: 50,
        purchaseDate: "2024-01-10",
        expiryDate: "2025-01-10",
        batchNo: "BATCH001",
        remarks: "Sample remarks",
        docId: "INSECT-MOCK-1234",
        isActive: true,
        createdOn: "2024-01-01T09:30:00Z",
      },
    },
  };
};

// ================= UPDATE =================
export const updateInsecticide = async (id, payload) => {
  console.log("Mock updateInsecticide called:", id, payload);

  return {
    status: 200,
    data: {
      success: true,
      message: "Insecticide entry updated successfully (mock)",
      data: {
        id,
        ...payload,
        updatedOn: new Date().toISOString(),
      },
    },
  };
};

// ================= LIST =================
export const listInsecticide = () => {
  return {
    success: true,
    message: "Success",
    error: null,
    metadata: null,
    pagination: {
      page: 0,
      size: 10,
      totalElements: 3,
      totalPages: 1,
    },
    data: [
      {
        id: 1,
        fpoId: 1,
        insecticideType: 1,
        insecticideTypeName: "Chemical",
        insecticideName: "Sample Insecticide",
        manufacturerName: "ABC Chemicals",
        quantityType: 201,
        quantityTypeName: "Liters",
        quantity: 50,
        purchaseDate: "2024-01-10",
        expiryDate: "2025-01-10",
        batchNo: "BATCH001",
        remarks: "Sample remarks",
        isActive: true,
        createdOn: null,
        docId: null,
      },
      {
        id: 2,
        fpoId: 1,
        insecticideType: 2,
        insecticideTypeName: "Organic",
        insecticideName: "Neem Extract",
        manufacturerName: "GreenGrow",
        quantityType: 1,
        quantityTypeName: "Liters",
        quantity: 30,
        purchaseDate: "2024-02-15",
        expiryDate: "2025-02-15",
        batchNo: "ORGNEEM001",
        remarks: "Safe for vegetables",
        isActive: true,
        createdOn: null,
        docId: null,
      },
      {
        id: 3,
        fpoId: 1,
        insecticideType: 1,
        insecticideTypeName: "Chemical",
        insecticideName: "Pyrethrin Spray",
        manufacturerName: "AgriChem",
        quantityType: 2,
        quantityTypeName: "Kg",
        quantity: 10,
        purchaseDate: "2024-03-05",
        expiryDate: "2025-03-05",
        batchNo: "CHEMPS001",
        remarks: "High efficiency insecticide",
        isActive: true,
        createdOn: null,
        docId: "INSECTIMG001",
      },
    ],
  };
};

