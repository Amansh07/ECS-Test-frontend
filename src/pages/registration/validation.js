// src/validation/registrationValidation.js
import * as Yup from "yup";

  // ---------------- VALIDATION SCHEMA ----------------
export const registrationValidationSchema = Yup.object().shape({
    registeredUnder: Yup.number().required("Required"),
    agency: Yup.string().required("Required"),
    blockId: Yup.string().required("Required"),
    districtId: Yup.string().required("Required"),
    communicationAddress: Yup.string().required("Required"),
    pincode: Yup.string().required("Required"),
    totalFarmers: Yup.number().required("Required").min(1),
    maleFarmers: Yup.number().required("Required").min(1),
    femaleFarmers: Yup.number().required("Required").min(1),
    landOwnedByFpo: Yup.number().required("Required").min(0),
    emailAddress: Yup.string().email("Invalid email").required("Required"),
    mobileNumber: Yup.string().required("Required"),
    secondaryEmail: Yup.string().email("Invalid email").required("Required"),
    secondaryMobile: Yup.string().required("Required"),
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required("Required"),
    fpoPanNo: Yup.string().required("Required"),
    // financialYear: Yup.string().required("Required"),
    // turnOver: Yup.number().required("Required"),
    // profitLoss: Yup.number().required("Required"),
    // financialRange: Yup.string().required("Required"),
    // auditApplicability: Yup.string().required("Required"),
    // auditStatus: Yup.string().required("Required"),
    // auditType: Yup.string().required("Required"),
    // Use Yup.lazy to access parent value
    companyDetails: Yup.lazy((value, options) => {
      const registeredUnder = options.parent.registeredUnder;
      if (registeredUnder === 6) {
        return Yup.object().shape({
          cin: Yup.string().required("Required"),
          companyName: Yup.string().required("Required"),
          companyStatus: Yup.string().required("Required"),
          incorporationDate: Yup.date().required("Required"),
          rocName: Yup.string().required("Required"),
        });
      }
      // Not required if not "companies"
      return Yup.object().shape({
        cin: Yup.string(),
        companyName: Yup.string(),
        companyStatus: Yup.string(),
        incorporationDate: Yup.date(),
        rocName: Yup.string(),
      });
    }),

    societyDetails: Yup.lazy((value, options) => {
      const registeredUnder = options.parent.registeredUnder;
      if (registeredUnder === 7) {
        return Yup.object().shape({
          regdNo: Yup.string().required("Required"),
          coopsocietyName: Yup.string().required("Required"),
          doreg: Yup.date().required("Required"),
          companyStatus: Yup.string().required("Required"),
          roaName: Yup.string().required("Required"),
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
