import * as Yup from "yup";

export const cropProductionValidationSchema = Yup.object().shape({
  seasonId: Yup.number().required("Season is required"),
  cropId: Yup.number().required("Crop is required"),
  cropVarietyId: Yup.number().required("Variety is required"),
  productionQuantity: Yup.number()
    .typeError("Production quantity must be a number")
    .required("Production quantity is required")
    .positive("Production quantity must be greater than zero"),
  harvestedSurplus: Yup.number()
    .typeError("Marketable surplus must be a number")
    .required("Marketable surplus is required")
    .min(0, "Marketable surplus cannot be negative"),
  dateOfHarvesting: Yup.date().required("Harvest date is required"),
  estimatedOrHarvestedId: Yup.string().required("Estimated/Harvested info is required"),
  description: Yup.string().required("Description is required"),
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
