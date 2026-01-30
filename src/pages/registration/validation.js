// src/validation/registrationValidation.js
import * as Yup from "yup";

// Regex for PAN (India): 5 letters, 4 digits, 1 letter
const companyPanRegex = /^[A-Z]{3}C[A-Z][0-9]{4}[A-Z]$/;


const cinStrictRegex = /^[LU][0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/;

const gigwPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,20}$/;

  
export const registrationValidationSchema = Yup.object().shape({
  registeredUnder: Yup.number().required("Registered Under is required"),
  agency: Yup.string().required("Agency is required"),
  blockId: Yup.string().required("Block is required"),
  districtId: Yup.string().required("District is required"),
  communicationAddress: Yup.string().required("Communication Address is required"),
  pincode: Yup.string()
    .matches(/^\d{6}$/, "Pincode must be exactly 6 digits")
    .required("Pincode is required"),
  totalFarmers: Yup.string()
    .required("Total shareholders are required")
    .matches(/^\d+$/, "Only digits are allowed")
    .test(
      "min-total",
      "Total shareholders must be at least 1",
      (value) => !value || Number(value) >= 1
    ),

  maleFarmers: Yup.string()
    .required("Male shareholders are required")
    .matches(/^\d+$/, "Only digits are allowed")
    .test(
      "male-non-negative",
      "Male shareholders cannot be negative",
      (value) => !value || Number(value) >= 0
    )
    .test(
      "male-less-than-total",
      "Male shareholders cannot exceed total shareholders",
      function (value) {
        const { totalFarmers } = this.parent;
        if (!value || !totalFarmers) return true;
        return Number(value) <= Number(totalFarmers);
      }
    ),

  femaleFarmers: Yup.string()
    .required("Female shareholders are required")
    .matches(/^\d+$/, "Only digits are allowed")
    .test(
      "female-non-negative",
      "Female shareholders cannot be negative",
      (value) => !value || Number(value) >= 0
    )
    .test(
      "female-less-than-total",
      "Female shareholders cannot exceed total shareholders",
      function (value) {
        const { totalFarmers } = this.parent;
        if (!value || !totalFarmers) return true;
        return Number(value) <= Number(totalFarmers);
      }
    )
    .test(
      "sum-equals-total",
      "Sum of male and female shareholders must equal total shareholders",
      function () {
        const { maleFarmers, femaleFarmers, totalFarmers } = this.parent;
        if (!maleFarmers || !femaleFarmers || !totalFarmers) return true;
        return Number(maleFarmers) + Number(femaleFarmers) === Number(totalFarmers);
      }
    ),

  landOwnedByFpo: Yup.string()
    .required("Land Owned by FPO is required")
    .matches(/^\d+$/, "Only digits are allowed")
    .test(
      "non-negative-land",
      "Land cannot be negative",
      (value) => !value || Number(value) >= 0
    ),

  emailAddress: Yup.string().email("Invalid email").required("Email is required"),
  mobileNumber: Yup.string()
    .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits")
    .required("Mobile number is required"),
  secondaryEmail: Yup.string().email("Invalid email").required("Secondary email is required"),
  secondaryMobile: Yup.string()
    .matches(/^\d{10}$/, "Secondary mobile number must be exactly 10 digits")
    .required("Secondary mobile number is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .required("Password is mandatory")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must not exceed 20 characters")
    .matches(
      gigwPasswordRegex,
      "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character"
    )
    .test(
      "no-spaces",
      "Password must not contain spaces",
      (value) => !/\s/.test(value || "")
    ),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  fpoPanNo: Yup.string()
    .required("PAN is mandatory")
    .length(10, "PAN must be 10 characters")
    .matches(
      /^[A-Z0-9]+$/,
      "PAN must contain only letters and numbers"
    )
    .matches(
      companyPanRegex,
      "Invalid PAN format. Example: ABCCC1234D"
    )
    .test(
      "company-pan-check",
      "Invalid PAN for Company. Fourth character must be 'C'.",
      (value) => {
        if (!value || value.length < 4) return false;
        return value[3] === "C";
      }
    ),


  // Conditional validation for company
  companyDetails: Yup.lazy((value, options) => {
    const registeredUnder = options.parent.registeredUnder;
    if (registeredUnder === 6) {
      return Yup.object().shape({
        cin: Yup.string()
          .required("CIN is required")
          .length(21, "CIN must be exactly 21 characters")
          .matches(
            cinStrictRegex,
            "Invalid CIN format. Example: U01100UP2022PTC174584"
          ),

        companyName: Yup.string().required("Company name is required"),
        companyStatus: Yup.string().required("Company status is required"),
        incorporationDate: Yup.date()
          .required("Date of Incorporation is required")
          .max(new Date(), "Date of Incorporation must be before today"),
        rocName: Yup.string().required("ROC name is required"),
      });
    }
    return Yup.object().shape({
      cin: Yup.string(),
      companyName: Yup.string(),
      companyStatus: Yup.string(),
      incorporationDate: Yup.date(),
      rocName: Yup.string(),
    });
  }),


  // Conditional validation for society
  societyDetails: Yup.lazy((value, options) => {
    const registeredUnder = options.parent.registeredUnder;
    if (registeredUnder === 7) {
      return Yup.object().shape({
        regdNo: Yup.string()
          .required("Registration number is required"),
        coopsocietyName: Yup.string().required("Cooperative/Society name is required"),
        doreg: Yup.date().required("Date of registration is required"),
        companyStatus: Yup.string().required("Status is required"),
        roaName: Yup.string().required("ROA name is required"),
      });
    }
    return Yup.object().shape({
      regdNo: Yup.string(),
      coopsocietyName: Yup.string(),
      doreg: Yup.date(),
      companyStatus: Yup.string(),
      roaName: Yup.string(),
    });
  }),
});
