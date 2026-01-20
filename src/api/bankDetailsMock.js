// Mock API for Bank Details

export const listBankDetails = (fpoId = 1, page = 0, size = 10) => {
  console.log("Mock listBankDetails called:", { fpoId, page, size });
  return {
    "data": [
      {
        "accountNumber": "34564356755",
        "bankMasterId": 2,
        "bankName": "SBI",
        "branchName": "SVBP University branch)",
        "fpoId": 1,
        "id": 1,
        "ifscCode": "SBIN0010653"
      },
      {
        "accountNumber": "34564356345",
        "bankMasterId": 3,
        "bankName": "BOB",
        "branchName": "BOB Pune Branch",
        "fpoId": 1,
        "id": 2,
        "ifscCode": "BOBI0010652"
      }
    ],
    "error": null,
    "message": "Data fetched successfully",
    "metadata": null,
    "pagination": {
      "page": 0,
      "size": 10,
      "totalElements": 2,
      "totalPages": 1
    },
    "success": true
  };
};

export const createBankDetails = async (payload) => {
  console.log("Mock createBankDetails called:", payload);
  return {
    status: 200,
    data: {
      success: true,
      message: "Bank details created successfully (mock)",
      data: {
        id: Date.now(),
        fpoId: payload.fpoId || 1,
        ifscCode: payload.ifscCode,
        bankName: payload.bankName,
        branchName: payload.branchName,
        accountNumber: payload.accountNumber,
        bankMasterId: payload.bankMasterId || null,
      },
      error: null,
    }
  };
};

export const getBankDetailsById = async (id) => {
  console.log("Mock getBankDetailsById called:", id);
  return {
    status: 200,
    data: {
      success: true,
      data: {
        id,
        fpoId: 1,
        ifscCode: "SBIN0010653",
        bankName: "SBI",
        branchName: "SVBP University branch)",
        accountNumber: "34564356755",
        bankMasterId: 2,
      },
      error: null,
    }
  };
};

export const updateBankDetails = async (id, payload) => {
  console.log("Mock updateBankDetails called:", id, payload);
  return {
    status: 200,
    data: {
      success: true,
      message: "Bank details updated successfully (mock)",
      data: {
        id,
        ...payload,
        updatedOn: new Date().toISOString()
      },
      error: null,
    }
  };
};

export const deleteBankDetails = async (id) => {
  console.log("Mock deleteBankDetails called:", id);
  return {
    status: 200,
    data: {
      success: true,
      message: `Bank details with ID ${id} deleted (mock)`,
      error: null,
    }
  };
};
