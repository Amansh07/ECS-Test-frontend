import * as Yup from "yup";

export const boardMembersValidationSchema = Yup.object({
  boardMemberName: Yup.string().required("Board member name is required"),
  fatherName: Yup.string().required("Father's/Husband's name is required"),
  designation: Yup.string().required("Designation is required"),
  gender: Yup.string().required("Gender is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  district: Yup.string().required("District is required"),
  block: Yup.string().required("Block is required"),
  gramPanchayat: Yup.string().required("Gram Panchayat is required"),
  village: Yup.string().required("Village is required"),
});

export const resourceMembersValidationSchema = Yup.object({
  resourceName: Yup.string().required("Resource name is required"),
  resourcefatherName: Yup.string().required("Father's/Husband's name is required"),
  designation: Yup.string().required("Designation is required"),
  gender: Yup.string().required("Gender is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  district: Yup.string().required("District is required"),
  block: Yup.string().required("Block is required"),
});
