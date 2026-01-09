import * as Yup from "yup";

export const fpoCapitalValidationSchema = Yup.object({
  totalEquity: Yup.string()
  .matches(/^\d{0,50}$/, "Amount allowed only up to 50 digits")
  .required("Total FPO Equity Capital is Required"),
  isGrantReceived: Yup.string()
  .required("Whether Equity Grant Recieved is required"),
grantReceived: Yup.string()
.when('isGrantRecieved', {
      is: "Yes",
      then: (schema) => schema.matches(/^\d{0,50}$/, "Amount allowed only up to 50 digits")
  .required("Total FPO Equity Capital is Required"), // Rules if 'hasDiscount' is true
      otherwise: (schema) => schema.notRequired(), // Rules if 'hasDiscount' is false
    }),

});

export const AGMMeetingValidationSchema = Yup.object({
  financialYear: Yup.string()
  .required("Financial Year is Required."),
  //isAgmConducted: Yup.string()
  //.required("Please answer this question."),
agmCount: Yup.string()
// .when('isAgmConducted', {
//       is: "Yes",
//       then: (schema) => schema.matches(/^\d{0,50}$/, "Amount allowed only up to 50 digits")
  .required("Total FPO Equity Capital is Required"), // Rules if 'hasDiscount' is true
    //   otherwise: (schema) => schema.notRequired(), // Rules if 'hasDiscount' is false
    // }),,

    uploadFileURL:Yup.string().required("Proof of meeting is required")

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
