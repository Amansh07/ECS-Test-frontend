// src/validation/registrationValidation.js
import * as Yup from "yup";

// Regex for PAN (India): 5 letters, 4 digits, 1 letter
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

// Regex for CIN (Companies): 1 letter + 5 digits + 2 letters + 4 digits + 3 letters + 6 digits
const cinRegex = /^[A-Z]{1}[0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/;

// Regex for LLPIN: 2 letters + 6 digits + 2 letters
const llpinRegex = /^[A-Z]{2}[0-9]{6}[A-Z]{2}$/;

// Regex for FCRN: 2 letters + 6 digits + 2 letters
const fcrnRegex = /^[A-Z]{2}[0-9]{6}[A-Z]{2}$/;

export const registrationValidationSchema = Yup.object().shape({
  registeredUnder: Yup.number().required("Registered Under is required"),
  agency: Yup.string().required("Agency is required"),
  blockId: Yup.string().required("Block is required"),
  // districtId: Yup.string().required("District is required"),
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
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  fpoPanNo: Yup.string()
    .matches(panRegex, "PAN number is invalid")
    .required("FPO PAN number is required"),

  // Conditional validation for company
  companyDetails: Yup.lazy((value, options) => {
    const registeredUnder = options.parent.registeredUnder;
    if (registeredUnder === 6) {
      return Yup.object().shape({
        cin: Yup.string()
          .required("CIN/LLPIN/FCRN is required")
          .test(
            "valid-cin-llpin-fcrn",
            "Must be a valid CIN, LLPIN, or FCRN",
            function (value) {
              if (!value) return false;
              return cinRegex.test(value) || llpinRegex.test(value) || fcrnRegex.test(value);
            }
          ),
        companyName: Yup.string().required("Company name is required"),
        companyStatus: Yup.string().required("Company status is required"),
        incorporationDate: Yup.date().required("Incorporation date is required"),
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
