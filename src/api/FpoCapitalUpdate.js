
const LS_KEY = "fpoCapitalStore_v1";

const nowIso = () => new Date().toISOString();

const loadStore = () => {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    // ignore
  }
  // Seed data (same as your mock list intent)
  return [
    {
      id: 1,
      fpoId: 1,
      totalFpoEquityCap: 870,
      isEquityGrant: true,
      fpoEquityGrantAmt: 23,
      isActive: true,
      crtBy: null,
      crtOn: null,
      updBy: null,
      updOn: "2026-01-19T13:02:18.119963",
    },
    {
      id: 2,
      fpoId: 1,
      totalFpoEquityCap: 56000000,
      isEquityGrant: true,
      fpoEquityGrantAmt: 5400000,
      isActive: true,
      crtBy: null,
      crtOn: "2026-01-10T20:49:56.110296",
      updBy: null,
      updOn: null,
    },
    {
      id: 3,
      fpoId: 1,
      totalFpoEquityCap: 87000000,
      isEquityGrant: true,
      fpoEquityGrantAmt: 8000000,
      isActive: true,
      crtBy: null,
      crtOn: "2026-01-10T20:50:08.339713",
      updBy: null,
      updOn: null,
    },
  ];
};

let store = loadStore();

const saveStore = () => {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(store));
  } catch (e) {
    // ignore
  }
};

// ---------------- LIST ----------------
export const listCapitalDetails = (fpoId = 1, page = 0, size = 10) => {
  const filtered = store.filter((x) => x.fpoId === Number(fpoId) && x.isActive);
  const start = page * size;
  const paged = filtered.slice(start, start + size);

  return {
    data: paged,
    error: null,
    message: "Data fetched successfully",
    metadata: null,
    pagination: {
      page,
      size,
      totalElements: filtered.length,
      totalPages: Math.ceil(filtered.length / size),
    },
    success: true,
  };
};

// ---------------- GET BY ID ----------------
export const getCapitalDetailsById = async (id) => {
  const found = store.find((x) => x.id === Number(id));
  return {
    status: 200,
    data: {
      data: found || null,
      error: found ? null : "NOT_FOUND",
      message: found ? "Data fetched successfully" : "Record not found",
      metadata: null,
      pagination: null,
      success: !!found,
    },
  };
};

// ---------------- CREATE ----------------
export const createCapitalDetails = async (payload) => {
  const created = {
    id: Date.now(),
    fpoId: payload?.fpoId ?? 1,
    totalFpoEquityCap: Number(payload?.totalFpoEquityCap ?? 0),
    isEquityGrant: !!payload?.isEquityGrant,
    fpoEquityGrantAmt: Number(payload?.fpoEquityGrantAmt ?? 0),
    isActive: true,
    crtBy: null,
    crtOn: nowIso(),
    updBy: null,
    updOn: null,
  };
  store = [created, ...store];
  saveStore();

  return {
    status: 200,
    data: {
      data: created,
      error: null,
      message: "Data saved successfully",
      metadata: null,
      pagination: null,
      success: true,
    },
  };
};

// ---------------- UPDATE ----------------
export const updateCapitalDetails = async (id, payload) => {
  const idx = store.findIndex((x) => x.id === Number(id));
  if (idx === -1) {
    return {
      status: 200,
      data: {
        data: null,
        error: "NOT_FOUND",
        message: "Record not found",
        metadata: null,
        pagination: null,
        success: false,
      },
    };
  }

  const existing = store[idx];
  const updated = {
    ...existing,
    totalFpoEquityCap: Number(payload?.totalFpoEquityCap ?? existing.totalFpoEquityCap),
    isEquityGrant: payload?.isEquityGrant ?? existing.isEquityGrant,
    fpoEquityGrantAmt: Number(payload?.fpoEquityGrantAmt ?? existing.fpoEquityGrantAmt),
    isActive: true,
    updBy: null,
    updOn: nowIso(),
  };

  store[idx] = updated;
  saveStore();

  return {
    status: 200,
    data: {
      data: updated,
      error: null,
      message: "Record updated successfully",
      metadata: null,
      pagination: null,
      success: true,
    },
  };
};

// ---------------- DELETE (soft) ----------------
export const deleteCapitalDetails = async (id) => {
  const idx = store.findIndex((x) => x.id === Number(id));
  if (idx === -1) {
    return {
      status: 200,
      data: { success: false, message: "Record not found", error: "NOT_FOUND" },
    };
  }
  store[idx].isActive = false;
  store[idx].updOn = nowIso();
  saveStore();

  return {
    status: 200,
    data: { success: true, message: `Record with ID ${id} deleted (mock)`, error: null },
  };
};