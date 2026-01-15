import * as Yup from "yup";

export const cropProductionValidationSchema = Yup.object({
    season: Yup.string().required("Season is required"),
    crop: Yup.string().required("Crop is required"),
    cropVariety: Yup.string().required("Crop Variety is required"),
    productionInQtl: Yup.number().required("Required"),
    estHarMarSupInQtl: Yup.number().required("Required"),
    dateOfHarvesting: Yup.string().required("Required"),
    estOrHar: Yup.string().required("Required"),
    cropDescription: Yup.string().required("Required"),
});

export const commodityProductionValidationSchema = Yup.object({
  productCategoryId: Yup.number()
    .nullable()
    .required("Product Category is required"),
  productSubcategoryId: Yup.number()
    .nullable()
    .required("Product Subcategory is required"),
  productId: Yup.number()
    .nullable()
    .required("Product Name is required"),
  isOrganic: Yup.boolean(),
  annualProductionCap: Yup.number()
    .typeError("Annual Production Capacity must be a number")
    .required("Annual Production Capacity is required"),
  inProduction: Yup.boolean(),
  availableStock: Yup.number()
    .typeError("Available Stock must be a number")
    .required("Available Stock is required"),
  dateOfAvailability: Yup.string()
    .required("Date Of Availability is required"),
  productDescription: Yup.string()
    .required("Product Description is required"),
});
