import * as Yup from "yup";

export const forgotPasswordValidationSchema = Yup.object({
  password: Yup.string()
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/, "Amount allowed only up to 50 digits")
 // .required("Total FPO Equity Capital is Required"),
  //isGrantReceived: Yup.string()
//   .required("Whether Equity Grant Recieved is required"),
// grantReceived: Yup.string()
// .when('isGrantRecieved', {
//       is: "Yes",
//       then: (schema) => schema.matches(/^\d{0,50}$/, "Amount allowed only up to 50 digits")
//   .required("Total FPO Equity Capital is Required"), // Rules if 'hasDiscount' is true
//       otherwise: (schema) => schema.notRequired(), // Rules if 'hasDiscount' is false
//     }),

});

