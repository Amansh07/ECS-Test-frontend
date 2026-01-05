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