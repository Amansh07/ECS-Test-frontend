// Mock API for FPO Capital Update

export const listCapitalDetails = (fpoId = 1, page = 0, size = 10) => {
    console.log("Mock listCapitalDetails called:", { fpoId, page, size });
    return {
        "data": [
            {
                "id": 1,
                "crtBy": null,
                "crtOn": null,
                "fpoEquityGrantAmt": 23,
                "fpoId": 1,
                "isActive": true,
                "isEquityGrant": true,
                "totalFpoEquityCap": 870,
                "updBy": null,
                "updOn": "2026-01-19T13:02:18.119963"
            },
            {
                "id": 2,
                "crtBy": null,
                "crtOn": "2026-01-10T20:49:56.110296",
                "fpoEquityGrantAmt": 5400000,
                "fpoId": 1,
                "isActive": true,
                "isEquityGrant": true,
                "totalFpoEquityCap": 56000000,
                "updBy": null,
                "updOn": null
            },
            {
                "id": 3,
                "crtBy": null,
                "crtOn": "2026-01-10T20:50:08.339713",
                "fpoEquityGrantAmt": 8000000,
                "fpoId": 1,
                "isActive": true,
                "isEquityGrant": true,
                "totalFpoEquityCap": 87000000,
                "updBy": null,
                "updOn": null
            }
        ],
        "error": null,
        "message": "Data fetched successfully",
        "metadata": null,
        "pagination": {
            "page": 0,
            "size": 10,
            "totalElements": 3,
            "totalPages": 1
        },
        "success": true
    };
};

export const getCapitalDetailsById = async (id) => {
    console.log("Mock getCapitalDetailsById called:", id);
    return {
        status: 200,
        data: {
            "data": {
                "id": id,
                "crtBy": null,
                "crtOn": null,
                "fpoEquityGrantAmt": 23,
                "fpoId": 1,
                "isActive": true,
                "isEquityGrant": true,
                "totalFpoEquityCap": 870,
                "updBy": null,
                "updOn": "2026-01-19T13:02:18.119963"
            },
            "error": null,
            "message": "Data fetched successfully",
            "metadata": null,
            "pagination": null,
            "success": true
        }
    };
};

export const createCapitalDetails = async (payload) => {
    console.log("Mock createCapitalDetails called:", payload);
    return {
        status: 200,
        data: {
            "data": {
                "id": Date.now(),
                "crtBy": null,
                "crtOn": new Date().toISOString(),
                "fpoEquityGrantAmt": payload.fpoEquityGrantAmt,
                "fpoId": payload.fpoId || 1,
                "isActive": true,
                "isEquityGrant": payload.isEquityGrant,
                "totalFpoEquityCap": payload.totalFpoEquityCap,
                "updBy": null,
                "updOn": null
            },
            "error": null,
            "message": "Data saved successfully",
            "metadata": null,
            "pagination": null,
            "success": true
        }
    };
};

export const updateCapitalDetails = async (id, payload) => {
    console.log("Mock updateCapitalDetails called:", id, payload);
    return {
        status: 200,
        data: {
            "data": {
                "id": id,
                "crtBy": null,
                "crtOn": null,
                "fpoEquityGrantAmt": payload.fpoEquityGrantAmt,
                "fpoId": payload.fpoId || 1,
                "isActive": null,
                "isEquityGrant": payload.isEquityGrant,
                "totalFpoEquityCap": payload.totalFpoEquityCap,
                "updBy": null,
                "updOn": null
            },
            "error": null,
            "message": "Record updated successfully",
            "metadata": null,
            "pagination": null,
            "success": true
        }
    };
};

export const deleteCapitalDetails = async (id) => {
    console.log("Mock deleteCapitalDetails called:", id);
    return {
        status: 200,
        data: {
            success: true,
            message: `Record with ID ${id} deleted (mock)`,
            error: null,
        }
    };
};
