
// Mock API for Infrastructure Details

// Master Data for Categories (Simulated)
const categoryMap = {
    "Cultivation": 955,
    "Processing": 956,
    955: "Cultivation",
    956: "Processing"
};

// Master Data for Subcategories
const subcategoryData = {
    955: [
        { id: 1, subcategoryName: "Greenhouse / Polyhouse", unit: "Square Feet (SqF)" },
        { id: 2, subcategoryName: "Hardening Chamber", unit: "Square Feet (SqF)" },
        { id: 3, subcategoryName: "Tissue Culture Facility", unit: "Square Feet (SqF)" },
        { id: 4, subcategoryName: "Drone Facility", unit: "Number of Drones" }
    ],
    956: [
        { id: 8, subcategoryName: "Ripening Chamber", unit: "Metric Tons (MT)" },
        { id: 9, subcategoryName: "Seed Processing Unit", unit: "Quintals per day" },
        { id: 10, subcategoryName: "Food Processing Unit", unit: "Kg/Liters per day" },
        { id: 11, subcategoryName: "Others", unit: "Metric tons (MT)" } // Assuming standard unit for others
    ]
};

export const getAllInfrastructure = (fpoId = 1, page = 0, size = 10) => {
    console.log("Mock getAllInfrastructure called:", { fpoId, page, size });

    // Static data return, similar to other mocks
    return {
        "data": [
            {
                availableCapacity: 11,
                fpoId: 1,
                id: 3,
                infraCategory: 955,
                infraCategoryName: "Cultivation",
                infraSubCategory: 1,
                infraSubCategoryName: "Greenhouse / Polyhouse",
                unit: null,
                unitName: "Square Feet (SqF)"
            },
            {
                availableCapacity: 10,
                fpoId: 1,
                id: 4,
                infraCategory: 956,
                infraCategoryName: "Processing",
                infraSubCategory: 8,
                infraSubCategoryName: "Ripening Chamber",
                unit: null,
                unitName: "Metric Tons (MT)"
            }
        ],
        "error": null,
        "message": "Data fetched successfully",
        "metadata": null,
        "pagination": {
            "page": page,
            "size": size,
            "totalElements": 2,
            "totalPages": 1
        },
        "success": true
    };
};

export const getArchivedInfrastructure = (fpoId = 1, page = 0, size = 10) => {
    console.log("Mock getArchivedInfrastructure called:", { fpoId, page, size });

    // Static dummy data for archived items
    return {
        "data": [
            {
                availableCapacity: 50,
                fpoId: 1,
                id: 99,
                infraCategory: 955,
                infraCategoryName: "Cultivation",
                infraSubCategory: 4,
                infraSubCategoryName: "Drone Facility",
                unit: null,
                unitName: "Number of Drones"
            }
        ],
        "error": null,
        "message": "Archived data fetched successfully",
        "metadata": null,
        "pagination": {
            "page": page,
            "size": size,
            "totalElements": 1,
            "totalPages": 1
        },
        "success": true
    };
};

export const getInfrastructureById = async (id) => {
    console.log("Mock getInfrastructureById called:", id);
    return {
        status: 200,
        data: {
            "data": {
                availableCapacity: 11,
                fpoId: 1,
                id: id,
                infraCategory: 955,
                infraCategoryName: "Cultivation",
                infraSubCategory: 1,
                infraSubCategoryName: "Greenhouse / Polyhouse",
                unit: null,
                unitName: "Square Feet (SqF)"
            },
            "error": null,
            "message": "Details fetched successfully",
            "metadata": null,
            "pagination": null,
            "success": true
        }
    };
};

export const getInfraSubcategoriesByCategoryId = async (categoryId) => {
    console.log("Mock getInfraSubcategoriesByCategoryId called:", categoryId);
    const data = subcategoryData[categoryId] || [];
    // Transform to match API response format
    const formattedData = data.map(sub => ({
        categoryId: parseInt(categoryId),
        displayOrder: null,
        id: sub.id,
        subcategoryName: sub.subcategoryName,
        unit: sub.unit
    }));

    return {
        "data": formattedData,
        "error": null,
        "message": "Success",
        "metadata": null,
        "pagination": null,
        "success": true
    };
};

export const createInfrastructure = async (payload) => {
    console.log("Mock createInfrastructure called:", payload);
    return {
        status: 200,
        data: {
            "data": {
                active: true,
                availableCapacity: payload.availableCapacity,
                createdBy: null,
                createdOn: new Date().toISOString(),
                fpoId: payload.fpoId,
                id: Date.now(),
                infraCategory: payload.infraCategory,
                infraSubCategory: payload.infraSubCategory,
                unit: null,
                updatedBy: null,
                updatedOn: null
            },
            "error": null,
            "message": "Infrastructure created successfully (mock)",
            "metadata": null,
            "pagination": null,
            "success": true
        }
    };
};

export const updateInfrastructure = async (id, payload) => {
    console.log("Mock updateInfrastructure called:", id, payload);
    return {
        status: 200,
        data: {
            "data": {
                id: id,
                ...payload,
                updatedOn: new Date().toISOString()
            },
            "error": null,
            "message": "Infrastructure updated successfully (mock)",
            "metadata": null,
            "pagination": null,
            "success": true
        }
    };
};

export const deleteInfrastructure = async (id) => {
    console.log("Mock deleteInfrastructure called:", id);
    return {
        status: 200,
        data: {
            success: true,
            message: `Infrastructure deleted successfully (mock)`,
            error: null
        }
    };
};
