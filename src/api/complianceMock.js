// ==============================================
// fpoServicesLicenseMock.js
// ==============================================

// ================= CREATE =================
export const createLicense = async (payload) => {
    console.log("Mock createLicense called:", payload);

    return {
        status: 200,
        data: {
            success: true,
            message: "FPO license created successfully (mock)",
            data: {
                id: Date.now(), // mock id
                fpoId: payload.fpoId,
                licenseId: payload.licenseId,
                licenseNumber: payload.licenseNumber,
                licenseIssuedBy: payload.licenseIssuedBy,
                licenseIssuedDt: payload.licenseIssuedDt,
                licenseValidTill: payload.licenseValidTill,
                unlimitedLicenseVal: payload.unlimitedLicenseVal,
                docId: payload.docId || "LIC-MOCK-0001",
                isActive: true,
                createdOn: new Date().toISOString()
            }
        }
    };
};

// ================= GET BY ID =================
export const getLicenseById = async (id) => {
    console.log("Mock getLicenseById called:", id);

    return {
        status: 200,
        data: {
            success: true,
            data: {
                id,
                fpoId: 1,
                licenseId: 5,
                licenseNumber: "123456",
                licenseName: "",
                licenseIssuedBy: "Anurag",
                licenseIssuedDt: "2026-01-16",
                licenseValidTill: "2026-01-16",
                unlimitedLicenseVal: true,
                docId: "LIC-MOCK-5678",
                isActive: true,
                createdOn: "2026-01-17T18:10:40.3152319"
            }
        }
    };
};

// ================= UPDATE =================
export const updateLicense = async (id, payload) => {
    console.log("Mock updateLicense called:", id, payload);

    return {
        status: 200,
        data: {
            success: true,
            message: "FPO license updated successfully (mock)",
            data: {
                id,
                ...payload,
                updatedOn: new Date().toISOString()
            }
        }
    };
};

// ================= LIST =================
export const listLicense = () => {
    return {
        success: true,
        message: "Success",
        error: null,
        metadata: null,
        pagination: {
            page: 0,
            size: 10,
            totalElements: 2,
            totalPages: 1
        },
        data: [
            {
                id: 1,
                fpoId: 1,
                licenseId: 1,
                licenseNumber: "LIC-001",
                licenseName: "",
                licenseIssuedBy: "Govt Authority",
                licenseIssuedDt: "2025-01-10",
                licenseValidTill: "2026-01-10",
                unlimitedLicenseVal: false,
                docId: "LICIMG001",
                isActive: true,
                createdOn: "2025-01-10T09:30:00Z"
            },
            {
                id: 2,
                fpoId: 1,
                licenseId: 2,
                licenseNumber: "LIC-002",
                licenseName: "",
                licenseIssuedBy: "State Authority",
                licenseIssuedDt: "2024-06-15",
                licenseValidTill: "2027-06-15",
                unlimitedLicenseVal: true,
                docId: null,
                isActive: true,
                createdOn: "2024-06-15T11:15:00Z"
            }
        ]
    };
};


// api/mockLicense.js

export const getLicenses = () => {
  const licenses = [
    { licenseId: 1, licenseName: "Agricultural Import & Export Licenses" },
    { licenseId: 2, licenseName: "Seed Licenses" },
    { licenseId: 3, licenseName: "Insecticidal Licences" },
    { licenseId: 4, licenseName: "Dairy Plant Registration" },
    { licenseId: 5, licenseName: "Private Research License" },
    { licenseId: 6, licenseName: "Livestock Licenses" },
    { licenseId: 7, licenseName: "Fertilizer License" },
    { licenseId: 8, licenseName: "Seed Dealership License" },
    { licenseId: 9, licenseName: "Udyog Aadhaar" },
    { licenseId: 10, licenseName: "Food Processing" },
    { licenseId: 11, licenseName: "Mandi Samiti" },
    { licenseId: 12, licenseName: "District Seed Dealership License" },
    { licenseId: 13, licenseName: "License for Insecticides Manufacturing" },
    { licenseId: 14, licenseName: "License to Sell or Stock Insecticides" },
    { licenseId: 15, licenseName: "Food and Safety Standard License" },
    { licenseId: 16, licenseName: "Nursery License" },
    { licenseId: 17, licenseName: "Cold Storage License" },
    { licenseId: 18, licenseName: "Fruit Processing and Preservation" },
    { licenseId: 19, licenseName: "Fertilizer Manufacturing" },
    { licenseId: 20, licenseName: "Fertilizer Dealership" },
    { licenseId: 21, licenseName: "eNAM" },
    { licenseId: 22, licenseName: "State Seed Dealership License" },
    { licenseId: 23, licenseName: "Pesticide" },
    { licenseId: 24, licenseName: "Seed production" },
    { licenseId: 25, licenseName: "Contract Farming Licenses" },
    { licenseId: 26, licenseName: "Other" },
    { licenseId: 27, licenseName: "Organic Certificate (PGS)" },
  ];

  return {
    data: licenses,
    error: null,
    message: "Success",
    metadata: null,
    pagination: null,
    success: true
  };
};
