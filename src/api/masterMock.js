export const getGeneralMasterByType = (type) => {
  switch (type.toLowerCase()) {
    case "season":
      return {
        data: [
          { id: 8, name: "Kharif", typeId: 4, parentId: null, displayOrder: null, isActive: true },
          { id: 9, name: "Rabi", typeId: 4, parentId: null, displayOrder: null, isActive: true },
          { id: 10, name: "Zayad", typeId: 4, parentId: null, displayOrder: null, isActive: true }
        ],
        error: null,
        message: "Success",
        metadata: null,
        pagination: null,
        success: true
      };

    case "crop":
      return {
        data: [
          { id: 1, name: "Wheat", typeId: 1, parentId: null, displayOrder: null, isActive: true },
          { id: 2, name: "Rice", typeId: 1, parentId: null, displayOrder: null, isActive: true },
          { id: 3, name: "Maize", typeId: 1, parentId: null, displayOrder: null, isActive: true }
        ],
        error: null,
        message: "Success",
        metadata: null,
        pagination: null,
        success: true
      };

    default:
      return {
        data: [],
        error: `No data found for type: ${type}`,
        message: "Failed",
        metadata: null,
        pagination: null,
        success: false
      };
  }
};

export const getCropsBySeason = (seasonId) => {
  // Sample mapping of seasonId -> crop list
  const cropsBySeason = {
    8: [ // Kharif
      { id: 2, name: "Arhar" },
      { id: 3, name: "Ash Gourd" },
      { id: 4, name: "Ashwagandha" },
      { id: 6, name: "Banana" },
      { id: 9, name: "Bitter Gourd" },
      { id: 11, name: "Bottle Gourd" },
      { id: 13, name: "Brinjal" },
      { id: 16, name: "Capsicum" },
      { id: 18, name: "Cashewnut" },
      { id: 24, name: "Coconut" },
      { id: 27, name: "Cucumber" },
      { id: 34, name: "Finger Millet" },
      { id: 36, name: "French Bean" },
      { id: 44, name: "Guava" },
      { id: 46, name: "Horse gram" },
      { id: 48, name: "Kinnow" },
      { id: 51, name: "Kodo" },
      { id: 57, name: "Maize" },
      { id: 59, name: "Mango" },
      { id: 62, name: "Mint" },
      { id: 63, name: "Moong" },
      { id: 65, name: "Moringa" },
      { id: 68, name: "Moth" },
      { id: 69, name: "Mushroom" },
      { id: 72, name: "Musk Melon" },
      { id: 76, name: "Okra" },
      { id: 79, name: "Paddy" },
      { id: 80, name: "Papaya" },
      { id: 81, name: "Pearl Millet" },
      { id: 83, name: "Pineapple" },
      { id: 84, name: "Pointed Gourd" },
      { id: 87, name: "Ridge Gourd" },
      { id: 89, name: "Sanva" },
      { id: 90, name: "Sarpagandha" },
      { id: 91, name: "Snake  Gourd" },
      { id: 92, name: "Sorghum" },
      { id: 93, name: "Soyabean" },
      { id: 94, name: "Spine Gourd" },
      { id: 95, name: "Sponge  Gourd" },
      { id: 97, name: "Sugarcane" },
      { id: 100, name: "Til" },
      { id: 101, name: "Tomato" },
      { id: 104, name: "Tulasi" },
      { id: 106, name: "Urad" },
      { id: 109, name: "Water Melon" }
    ],
    9: [ // Rabi
      { id: 110, name: "Wheat" },
      { id: 111, name: "Barley" },
      { id: 112, name: "Mustard" }
    ],
    10: [ // Zayad
      { id: 120, name: "Cotton" },
      { id: 121, name: "Sugarcane" },
      { id: 122, name: "Sesame" }
    ]
  };

  const crops = cropsBySeason[seasonId] || [];

  return {
    data: crops,
    error: null,
    message: "Success",
    metadata: null,
    pagination: null,
    success: true
  };
};

export const getVarietyByCrop = (cropId) => {
  // Sample mapping of cropId -> variety list
  const varietiesByCrop = {
    2: [ // Arhar
      { id: 152, name: "Other" },
      { id: 205, name: "UPF-203" },
      { id: 222, name: "Pusa Parvaty" },
      { id: 240, name: "KFPD 1" },
      { id: 340, name: "Contender" }
    ],
    3: [ // Ash Gourd
      { id: 400, name: "White Ash" },
      { id: 401, name: "Round Ash" }
    ],
    4: [ // Ashwagandha
      { id: 410, name: "Jawahar" },
      { id: 411, name: "Prashant" }
    ]
    // Add more crops as needed
  };

  const varieties = varietiesByCrop[cropId] || [];

  return {
    data: varieties,
    error: null,
    message: "Success",
    metadata: null,
    pagination: null,
    success: true
  };
};

export const getProductCategories = () => {
  return {
    success: true,
    message: "Success",
    data: [
      {
        productCategoryId: 1,
        productCategoryName: "Dairy",
        isActive: true,
        crtOn: "2025-12-23T08:35:13.714358",
      },
      {
        productCategoryId: 2,
        productCategoryName: "Artisans/Handicrafts",
        isActive: true,
        crtOn: "2025-12-23T08:35:13.714358",
      },
      {
        productCategoryId: 3,
        productCategoryName: "Poultry",
        isActive: true,
        crtOn: "2025-12-23T08:35:13.714358",
      },
      {
        productCategoryId: 4,
        productCategoryName: "Gotary",
        isActive: true,
        crtOn: "2025-12-23T08:35:13.714358",
      },
      {
        productCategoryId: 5,
        productCategoryName: "Superfood",
        isActive: true,
        crtOn: "2025-12-23T08:35:13.714358",
      },
      {
        productCategoryId: 6,
        productCategoryName: "Inputs",
        isActive: true,
        crtOn: "2025-12-23T08:35:13.714358",
      },
      {
        productCategoryId: 7,
        productCategoryName: "Medicinal and Aromatic Plants",
        isActive: true,
        crtOn: "2025-12-23T08:35:13.714358",
      },
      {
        productCategoryId: 8,
        productCategoryName: "Fishery",
        isActive: true,
        crtOn: "2025-12-23T08:35:13.714358",
      },
      {
        productCategoryId: 9,
        productCategoryName: "Processed/value added products",
        isActive: true,
        crtOn: "2025-12-23T08:35:13.714358",
      },
      {
        productCategoryId: 10,
        productCategoryName: "Honey",
        isActive: true,
        crtOn: "2025-12-23T08:35:13.714358",
      },
    ],
    error: null,
    metadata: null,
    pagination: null,
  };
};

export const getSubCategoriesById = (productCategoryId) => {
  const allSubcategories = [
    {
      productSubcategoryId: 2,
      productCategoryId: 1,
      subcategoryName: "Khoya",
      unitId: null,
      isActive: true,
      crtOn: "2025-12-23T08:35:30.72792",
    },
    {
      productSubcategoryId: 19,
      productCategoryId: 1,
      subcategoryName: "Others",
      unitId: null,
      isActive: true,
      crtOn: "2025-12-23T08:35:30.72792",
    },
    {
      productSubcategoryId: 24,
      productCategoryId: 1,
      subcategoryName: "Ghee",
      unitId: null,
      isActive: true,
      crtOn: "2025-12-23T08:35:30.72792",
    },
    {
      productSubcategoryId: 29,
      productCategoryId: 1,
      subcategoryName: "Milk",
      unitId: null,
      isActive: true,
      crtOn: "2025-12-23T08:35:30.72792",
    },
    {
      productSubcategoryId: 36,
      productCategoryId: 1,
      subcategoryName: "Curd",
      unitId: null,
      isActive: true,
      crtOn: "2025-12-23T08:35:30.72792",
    },
    {
      productSubcategoryId: 52,
      productCategoryId: 1,
      subcategoryName: "Paneer",
      unitId: null,
      isActive: true,
      crtOn: "2025-12-23T08:35:30.72792",
    },
  ];

  const filtered = allSubcategories.filter(
    (x) => x.productCategoryId === productCategoryId
  );

  return {
    success: true,
    message: "Success",
    data: filtered,
    error: null,
    metadata: null,
    pagination: null,
  };
};

export const getProductsBySubCategoryId = (subCategoryId) => {
  const allProducts = [
    {
      id: 23,
      productName: "Terracotta Pots",
      productSubcategoryId: 1,
      isActive: true,
    },
    {
      id: 24,
      productName: "Terracotta Diyas",
      productSubcategoryId: 2,
      isActive: true,
    },
    {
      id: 25,
      productName: "Terracotta Showpieces",
      productSubcategoryId: 1,
      isActive: true,
    },
    {
      id: 26,
      productName: "Terracotta Kulhad",
      productSubcategoryId: 1,
      isActive: true,
    },
  ];

  const filtered = allProducts.filter(
    (p) => p.productSubcategoryId === subCategoryId
  );

  return {
    success: true,
    message: "Success",
    data: filtered,
    error: null,
    metadata: null,
    pagination: null,
  };
};
