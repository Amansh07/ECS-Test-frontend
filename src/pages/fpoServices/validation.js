import * as Yup from "yup";

export const fertilizerDetailsValidationSchema = Yup.object({
  fertilizerType: Yup.string()
    .required("Fertilizer type is required"),

  fertilizerName: Yup.string()
    .required("Fertilizer name is required"),

  fertilizerGrade: Yup.string()
    .required("Fertilizer grade is required"),

  nameOfManufacturer: Yup.string()
    .required("Name of manufacturer is required"),

  quantityType: Yup.string()
    .required("Quantity type is required"),

  quantity: Yup.number()
    .typeError("Quantity must be a number")
    .positive("Quantity must be greater than zero")
    .required("Quantity is required"),

  cropDescription: Yup.string()
    .required("Crop description is required"),
});

export const infraDetailsValidationSchema = Yup.object({
  category: Yup.string()
    .required("Infrastructure Category is required"),
  subCategory: Yup.string()
    .required("Sub Infrastructure Category is required"),

    other: Yup.string()
  .when('subCategory', {
        is: "Others",
        then: (schema) => schema.required("Other Facilities field is Required"), // Rules if 'hasDiscount' is true
        otherwise: (schema) => schema.notRequired(), // Rules if 'hasDiscount' is false
      }),
  unit: Yup.string().required("Unit is required!"),

  capacity: Yup.number()
  .typeError("Quantity must be a number")
    .positive("Quantity must be greater than zero")
    .test(
      "is-decimal",
      "Must have at most 20 decimal places",
      (value) => (value + "").match(/^\d+(\.\d{0,20})?$/) // Convert to string for regex
    )
    // .matches(/^\d{0,50}$/, "Amount allowed only up to 50 digits")
    .required("Capacity is required"),
     

});


export const insecticideOrPesticideDetailsValidationSchema = Yup.object({
  insecticideOrPesticideType: Yup.string()
    .required("Insecticide / Pesticide type is required"),

  insecticideOrPesticideName: Yup.string()
    .required("Insecticide / Pesticide name is required"),

  nameOfManufacturer: Yup.string()
    .required("Name of manufacturer is required"),

  cibRcNumber: Yup.string()
    .required("CIB & RC number is required"),

  cibRcIssueDate: Yup.string()
    .required("CIB & RC issue date is required"),

  quantityType: Yup.string()
    .required("Quantity type is required"),

  quantity: Yup.number()
    .typeError("Quantity must be a number")
    .positive("Quantity must be greater than zero")
    .required("Quantity is required"),

  insecticideOrPesticideDescription: Yup.string()
    .required("Description is required"),
});
