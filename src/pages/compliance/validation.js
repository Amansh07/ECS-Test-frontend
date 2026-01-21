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

  uploadFileURL: Yup.string().required("Proof of meeting is required")

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

export const annualTurnoverValidationSchema = Yup.object({
  financialYear: Yup.string()
    .required("Financial Year is required"),

  annualTurnover: Yup.number()
    .typeError("Annual Turnover must be a number")
    .positive("Annual Turnover must be greater than zero")
    .required("Annual Turnover is required"),

  totalAnnualProfit: Yup.number()
    .typeError("Total Annual Profit must be a number")
    .positive("Total Annual Profit must be greater than zero")
    .required("Total Annual Profit is required"),

  totalDividendPaid: Yup.number()
    .typeError("Total Dividend Paid must be a number")
    .min(0, "Total Dividend Paid cannot be negative")
    .nullable(),
});

export const bankDetailsValidationSchema = Yup.object({
  ifscCode: Yup.string()
    .required("IFSC Code is required")
    .matches(/^[A-Za-z]{4}0[A-Za-z0-9]{6}$/, "Invalid IFSC Code format (should be 11 characters: 4 letters, 0, then 6 alphanumeric)"),

  bankName: Yup.string()
    .required("Bank Name is required"),

  branchName: Yup.string()
    .required("Branch Name is required"),

  accountNumber: Yup.string()
    .required("Account Number is required")
    .matches(/^\d+$/, "Account Number must contain only numbers")
    .min(9, "Account Number must be at least 9 digits")
    .max(18, "Account Number must be at most 18 digits"),
});

export const licenseUpdateValidationSchema = Yup.object({
  licenseId: Yup.string()
    .required("License Name is required"),

  licenseName: Yup.string().when("licenseId", {
    is: (val) => val === 26 || val === "26", // handle both number and string
    then: (schema) => schema.required("Other License Name is required when License Name is 'Other'"),
    otherwise: (schema) => schema.notRequired(),
  }),

  issuedBy: Yup.string()
    .required("Issued By is required"),

  // issuedDate: Yup.string()
  //   .required("Issue Date is required"),

  // validDate: Yup.string()
  //   .required("License Valid Till is required"),

  licenseNumber: Yup.string()
    .required("License Number is required"),

  isUnlimited: Yup.boolean(),
});
