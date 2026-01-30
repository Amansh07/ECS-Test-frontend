
let mockData = [
  {
    id: 1,
    fpoId: 1,
    financialYear: 2024,              // start year (FY 2024-25)
    financialYearName: "2024-25",     // display
    annualTurnoverAmt: 5000000,       // in rupees
    totalProfit: 1000000,
    totalDividend: 200000,
    docId: "Balancesheet_2024.pdf",   // truthy => has file
    isActive: true,
  },
  {
    id: 2,
    fpoId: 1,
    financialYear: 2023,
    financialYearName: "2023-24",
    annualTurnoverAmt: 4500000,
    totalProfit: 800000,
    totalDividend: 150000,
    docId: "Balancesheet_2023.pdf",
    isActive: true,
  },
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Utility: paginate an array
const paginate = (arr, page = 0, size = 10) => {
  const start = page * size;
  return {
    page,
    size,
    totalElements: arr.length,
    totalPages: Math.ceil(arr.length / size),
    data: arr.slice(start, start + size),
  };
};

// Public API
export const annualTurnoverMock = {
  // CREATE
  async create(payload) {
    await delay(200);
    const nowId = Date.now();
    const item = {
      id: nowId,
      fpoId: payload?.fpoId ?? 1,
      financialYear: Number(payload?.financialYear) || new Date().getFullYear(),
      financialYearName: payload?.financialYearName ?? String(payload?.financialYear ?? ""),
      annualTurnoverAmt: Number(payload?.annualTurnoverAmt ?? 0),
      totalProfit: Number(payload?.totalProfit ?? 0),
      totalDividend: Number(payload?.totalDividend ?? 0),
      docId: payload?.docId ?? null,
      isActive: true,
    };
    mockData.unshift(item);
    return {
      success: true,
      message: "Annual turnover record created successfully",
      error: null,
      metadata: null,
      pagination: null,
      data: item,
    };
  },

  // READ by ID
  async getById(id) {
    await delay(150);
    const item = mockData.find((x) => x.id === Number(id));
    if (!item) {
      return { success: false, message: "Record not found", error: "NOT_FOUND", data: null };
    }
    return { success: true, message: "OK", error: null, metadata: null, pagination: null, data: item };
  },

  // LIST by FPO with pagination
  async getListByFpo(fpoId, page = 0, size = 10) {
    await delay(150);
    const filtered = mockData.filter((x) => x.fpoId === Number(fpoId) && x.isActive);
    const paged = paginate(filtered, page, size);
    return {
      success: true,
      message: "OK",
      error: null,
      metadata: null,
      pagination: {
        page: paged.page,
        size: paged.size,
        totalElements: paged.totalElements,
        totalPages: paged.totalPages,
      },
      data: paged.data,
    };
  },

  // UPDATE
  async update(id, payload) {
    await delay(200);
    const index = mockData.findIndex((x) => x.id === Number(id));
    if (index === -1) {
      return { success: false, message: "Record not found", error: "NOT_FOUND", data: null };
    }
    const existing = mockData[index];
    const updated = {
      ...existing,
      financialYear: payload?.financialYear ?? existing.financialYear,
      financialYearName: payload?.financialYearName ?? existing.financialYearName,
      annualTurnoverAmt: payload?.annualTurnoverAmt ?? existing.annualTurnoverAmt,
      totalProfit: payload?.totalProfit ?? existing.totalProfit,
      totalDividend: payload?.totalDividend ?? existing.totalDividend,
      // keep previous doc if not provided
      docId: payload?.docId ?? existing.docId,
      isActive: true,
    };
    mockData[index] = updated;
    return {
      success: true,
      message: "Annual turnover record updated successfully",
      error: null,
      metadata: null,
      pagination: null,
      data: updated,
    };
  },

  // DELETE (soft)
  async delete(id) {
    await delay(120);
    const index = mockData.findIndex((x) => x.id === Number(id));
    if (index === -1) {
      return { success: false, message: "Record not found", error: "NOT_FOUND", data: null };
    }
    mockData[index].isActive = false;
    return {
      success: true,
      message: "Annual turnover record deleted successfully",
      error: null,
      metadata: null,
      pagination: null,
      data: null,
    };
  },
};
