import * as Yup from "yup";

export const fertilizerDetailsValidationSchema = Yup.object({
  fertilizerType: Yup.string()
    .required("Fertilizer type is required"),

  // fertilizerName: Yup.string()
  //   .required("Fertilizer name is required"),

  // fertilizerGrade: Yup.string()
  //   .required("Fertilizer grade is required"),

  manufacturerName: Yup.string()
    .required("Name of manufacturer is required"),

  quantityType: Yup.string()
    .required("Quantity type is required"),

  // quantity: Yup.number()
  //   .typeError("Quantity must be a number")
  //   .positive("Quantity must be greater than zero")
  //   .required("Quantity is required"),

  remarks: Yup.string()
    .max(200, "Remarks cannot exceed 200 characters")
    .nullable(),
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
  insecticideType: Yup.string()
    .required("Insecticide / Pesticide type is required"),

  insecticideName: Yup.string()
    .required("Insecticide / Pesticide name is required"),

  manufacturerName: Yup.string()
    .required("Name of manufacturer is required"),

  quantityType: Yup.string()
    .required("Quantity type is required"),

  quantity: Yup.number()
    .typeError("Quantity must be a number")
    .positive("Quantity must be greater than zero")
    .required("Quantity is required"),

  purchaseDate: Yup.string()
    .required("Purchase date is required"),

  expiryDate: Yup.string()
    .required("Expiry date is required"),

  batchNo: Yup.string()
    .required("Batch number is required"),

  // remarks: Yup.string()
  //   .required("Remarks are required"),
});


export const machineryValidationSchema = Yup.object().shape({
  machineryCategory: Yup.string().required('Machinery Category is required'),
  machineryName: Yup.string().required('Machinery Name is required'),
  brandName: Yup.string().required('Brand Name is required'),
  unit: Yup.string().required('Unit is required'),
  rentAmount: Yup.number()
    .typeError('Rent Amount must be a number')
    .required('Rent Amount is required')
    .positive('Rent Amount must be positive'),
  quantity: Yup.number()
    .typeError('Quantity must be a number')
    .required('Quantity is required')
    .positive('Quantity must be positive')
    .integer('Quantity must be an integer'),
  address: Yup.string().required('Address is required'),
  specifications: Yup.string(),
  manufacturerName: Yup.string(),
  stateExtension: Yup.object(),
});
