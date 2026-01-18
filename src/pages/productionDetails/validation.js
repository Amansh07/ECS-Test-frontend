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
  // description: Yup.string().required("Description is required"),
});


export const commodityProductionValidationSchema = Yup.object({
  productCategoryId: Yup.string().required("Category is required"),
  productSubcategoryId: Yup.string().required("Subcategory is required"),
  productId: Yup.string().required("Product is required"),
  annualProductionCap: Yup.number().typeError("Must be a number").required("Annual Production Cap is required"),
  availableStock: Yup.number().typeError("Must be a number").required("Available Stock is required"),
  dateOfAvailability: Yup.string().required("Date of Availability is required"),
});