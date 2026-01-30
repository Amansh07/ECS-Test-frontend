import React, { useState, useEffect } from "react";
import { setNestedObjectValues, useFormik } from "formik";
import * as Yup from "yup";
import { AccordionGroup } from "../../components/Accordion";
import { TextField, SelectField, RadioGroup } from "../../components/FormFields";
import { Button } from "../../components/Buttons";
import Table from "../../components/Table";
import AddDocuments from "../../components/AddDocuments";
import editSvg from "../../assets/edit.svg";
import viewSvg from "../../assets/view.svg";
import "./Registration.css";
import ValidationModal from "../../components/ValidationModal";
import PreviewModal from "../../components/PreviewModal";
import deleteSvg from '../../assets/deleteAction.svg';
import ConfirmationModal from "../../components/ConfirmationModal";
import { registrationValidationSchema } from "./validation";
import UploadDocument from "../../components/UploadDocument";
import { useNavigate } from "react-router-dom";
import { getDistricts, getBlocksByDistrictId, getGeneral } from "../../api/master";
import { uploadBulkDocumentsRegistration } from "../../api/upload";
import { registerFPO } from "../../api/registration";
import { temprorayToken } from "../../api/authApi";
import StatusModal from "../../components/StatusModal";
import Loader from "../../components/Loader";

const RegistrationForm = ({ showForm = true, showDocuments = true, disabled = false, imgConfig, pdfConfig, activeStep, setActiveStep, nextButtonClicked, setNextButtonClicked, backButtonClicked, setBackButtonClicked, saveButtonClicked, setSaveButtonClicked, steps }) => {
  // ---------------- INITIAL FORM VALUES ----------------
  const initialValues = {
    registeredUnder: 6,
    agency: "",
    blockId: "",
    districtId: "",
    communicationAddress: "",
    pincode: "",
    totalFarmers: "",
    maleFarmers: "",
    femaleFarmers: "",
    percentageOfFemaleFarmers: "",
    landOwnedByFpo: "",
    emailAddress: "",
    mobileNumber: "",
    secondaryEmail: "",
    secondaryMobile: "",
    username: "",
    password: "",
    confirmPassword: "",
    fpoPanNo: "",
    financialYear: "",
    turnOver: "",
    profitLoss: "",
    financialRange: "",
    auditApplicability: "",
    auditStatus: "",
    auditType: "",
    companyDetails: {
      cin: "",
      companyName: "",
      companyStatus: "",
      incorporationDate: "",
      rocName: "",
    },
    societyDetails: {
      regdNo: "",
      coopsocietyName: "",
      doreg: "",
      companyStatus: "",
      roaName: "",
    },
  };

  const [statusModal, setStatusModal] = useState({
    isOpen: false,
    status: true, // true = success, false = error
    message: "",
  });


  const navigate = useNavigate();

  // ---------------- FORMIK ----------------
  const formik = useFormik({
    initialValues,
    validationSchema: registrationValidationSchema,
    onSubmit: (values) => console.log("Form Submitted:", values),
  });

  const mapFinancialPreviewData = (row) => {
    if (!row) return [];

    return [
      { label: "Financial Year", value: row.financialYear || "-" },
      { label: "Turnover", value: row.turnOver || "-" },
      { label: "Profit/Loss", value: row.profitLoss || "-" },
      { label: "Financial Range", value: row.financialRange || "-" },
      {
        label: "Audit Applicability",
        value: row.auditApplicability ? "Yes" : "No",
      },
      {
        label: "Audit Status",
        value: row.auditStatus ? "Done" : "Not Done",
      },
      { label: "Audit Type", value: row.auditType || "-" },
    ];
  };

  const resetAllFormData = () => {
    // Reset entire Formik form
    formik.resetForm({
      values: initialValues
    });

    // Clear financial table
    setFinancialData([]);

    // Clear financial section UI state
    setIsUpdateMode(false);
    setEditingFinancialId(null);
    setPreviewFinancialData(null);
    setIsFinancialPreviewOpen(false);

    // Clear confirmation + validation modals
    setIsConfirmationOpen(false);
    setPendingAction("");
    setPendingRow(null);
    setShowValidationModal(false);
    setImageFile(null);
    setPdfFile(null);
    setValidationMessage("");
    setStatusModal({
      isOpen: false,
      status: true, // false = error, true = success
      message: "",
    });

  };

  // const validationCheck = async () => {
  //   const errors = await formik.validateForm();

  //   console.log("errors :", errors);

  //   // Helper: mark all fields (nested 1 level) as touched
  //   const markAllTouched = (values) => {
  //     const touched = {};
  //     Object.keys(values).forEach((key) => {
  //       if (values[key] && typeof values[key] === "object" && !Array.isArray(values[key])) {
  //         touched[key] = {};
  //         Object.keys(values[key]).forEach((subKey) => {
  //           touched[key][subKey] = true;
  //         });
  //       } else {
  //         touched[key] = true;
  //       }
  //     });
  //     return touched;
  //   };

  //   if (Object.keys(errors).length > 0) {
  //     // Mark all fields as touched so errors show
  //     formik.setTouched(markAllTouched(formik.values));

  //     // Show validation modal
  //     setValidationMessage("Please complete all required fields before proceeding.");
  //     setShowValidationModal(true);
  //     return true;
  //   }
  // }

  const handleStatusClose = () => {
    const isSuccess = statusModal.status;

    setStatusModal(prev => ({ ...prev, isOpen: false }));

    if (isSuccess) {
      resetAllFormData();
      navigate("/");
    }
  };

  const validationCheck = async () => {
    const errors = await formik.validateForm();
    let financialError = false;

    // Check if financialData is empty
    if (financialData.length === 0) {
      financialError = true;
    }

    console.log("errors :", errors, "financialError:", financialError);

    // Mark all fields (nested 1 level) as touched
    const markAllTouched = (values) => {
      const touched = {};
      Object.keys(values).forEach((key) => {
        if (values[key] && typeof values[key] === "object" && !Array.isArray(values[key])) {
          touched[key] = {};
          Object.keys(values[key]).forEach((subKey) => {
            touched[key][subKey] = true;
          });
        } else {
          touched[key] = true;
        }
      });
      return touched;
    };

    if (Object.keys(errors).length > 0 || financialError) {
      // Mark all fields as touched so errors show
      formik.setTouched(markAllTouched(formik.values));

      // Set financial error state
      setHasFinancialError(financialError);

      // Show validation modal
      setValidationMessage(
        financialError
          ? "Please add at least one financial detail before proceeding."
          : "Please complete all required fields before proceeding."
      );
      setShowValidationModal(true);

      return true; // validation failed
    }

    // Clear financial error if everything is fine
    setHasFinancialError(false);

    return false; // validation passed
  };




  const handleUploadDocuments = async () => {
    try {
      const token = await temprorayToken();

      const res = await uploadBulkDocumentsRegistration({
        token: token.data.token, // get Temp Token
        docTypes: [920, 921], // image + pdf
        files: [imageFile, pdfFile],
      });

      if (res.success) {
        console.log("Documents uploaded successfully:", res);
        // setStatusModal({
        //   isOpen: true,
        //   status: true, // false = error, true = success
        //   message: "Documents uploaded successfully",
        // });

        return res;

        // Optional: do something after successful upload
        // e.g., navigate("/next-step");
      } else {
        setStatusModal({
          isOpen: true,
          status: false, // false = error, true = success
          message: res.message || "Upload Failed",
        });

        return false;
      }

    } catch (error) {
      // Errors from axios / interceptor

      setStatusModal({
        isOpen: true,
        status: false, // false = error, true = success
        message: error.message || "Something went wrong. Please try again.",
      });

      return false;
    }
  };


  const handleSave = async () => {
    // Validate the form manually
    const hasError = await validationCheck();
    if (hasError) return;   // STOP if invalid

    setIsRegistrationLoading(true);
    try {
      const uploadRes = await handleUploadDocuments();

      if (!uploadRes) {
        setIsRegistrationLoading(false);
        return;
      }

      docIds = uploadRes.results.map(item => item.documentId);
    } catch (error) {
      setIsRegistrationLoading(false);
      setStatusModal({
        isOpen: true,
        status: false,
        message: error.message || "Document upload failed. Please try again.",
      });
      return;
    }

    // Prepare payload
    const payload = {
      registeredUnder: values.registeredUnder,
      agency: parseInt(values.agency, 10),
      blockId: parseInt(values.blockId, 10),
      districtId: parseInt(values.districtId, 10),
      communicationAddress: values.communicationAddress,
      emailAddress: values.emailAddress,
      mobileNumber: values.mobileNumber,
      secondaryEmail: values.secondaryEmail || "",
      secondaryMobile: values.secondaryMobile || "",
      username: values.username,
      password: values.password,
      fpoPanNo: values.fpoPanNo,
      docIds: docIds,
      landOwnedByFpo: parseFloat(values.landOwnedByFpo),
      totalFarmers: parseInt(values.totalFarmers, 10),
      maleFarmers: parseInt(values.maleFarmers, 10),
      femaleFarmers: parseInt(values.femaleFarmers, 10),
      percentageOfFemaleFarmers: parseFloat(values.percentageOfFemaleFarmers),
      financialDetails: financialData.map((row) => ({
        financialYearId: parseInt(row.financialYear, 10),
        turnoverAmount: parseFloat(row.turnOver),
        profitLossAmount: parseFloat(row.profitLoss),
        financialRangeId: parseInt(row.financialRange, 10),
        auditApplicable: !!row.auditApplicability,
        auditStatus: !!row.auditStatus,
      })),
      companyDetails: {
        cin: values.companyDetails.cin || "",
        companyName: values.companyDetails.companyName || "",
        companyStatus: values.companyDetails.companyStatus || "",
        incorporationDate: values.companyDetails.incorporationDate || "",
        rocName: values.companyDetails.rocName || "",
      },
      societyDetails:
        values.registeredUnder === 7
          ? {
            regdNo: values.societyDetails.regdNo || "",
            coopsocietyName: values.societyDetails.coopsocietyName || "",
            doreg: values.societyDetails.doreg || "",
            companyStatus: values.societyDetails.companyStatus || "",
            roaName: values.societyDetails.roaName || "",
          }
          : null,
    };

    console.log("Payload for API:", payload);

    try {
      const regRes = await registerFPO(payload);

      if (regRes.success) {
        console.log("User registered successfully");
        // setValidationMessage("Registration successful!");
        // setShowValidationModal(true);

        setStatusModal({
          isOpen: true,
          status: true,
          message: "Registration successful!",
        });

        // setTimeout(() => {
        //   resetAllFormData();
        // }, 300);

        // // Optional: redirect or reset form
        // navigate("/");
      } else {
        // setValidationMessage(regRes.message || "Registration failed.");
        // setShowValidationModal(true);
        setStatusModal({
          isOpen: true,
          status: false, // false = error, true = success
          message: regRes.message || "Registration failed."
        });
      }
    } catch (error) {
      // Errors from axios / interceptor
      // setValidationMessage(error.message || "Something went wrong. Please try again.");
      // setShowValidationModal(true);
      setStatusModal({
        isOpen: true,
        status: false, // false = error, true = success
        message: error.message || "Something went wrong. Please try again."
      });
    } finally {
      setIsRegistrationLoading(false);
    }

    // navigate("/", { replace: true });
  };

  const { values, handleChange, handleBlur, setFieldValue, setFieldTouched, touched, errors } = formik;

  useEffect(() => {
    if (values.auditApplicability === "no") {
      if (values.auditStatus !== "notdone") {
        formik.setFieldValue("auditStatus", "notdone");
      }
      if (values.auditType !== "na") {
        formik.setFieldValue("auditType", "na");
      }
    } else {
      formik.setFieldValue("auditStatus", "");
    }
  }, [values.auditApplicability]);

  useEffect(() => {
    const total = parseFloat(values.totalFarmers);
    const female = parseFloat(values.femaleFarmers);

    if (!isNaN(total) && !isNaN(female) && total > 0) {
      const percentage = ((female / total) * 100).toFixed(2);

      setFieldValue("percentageOfFemaleFarmers", percentage);
    } else {
      setFieldValue("percentageOfFemaleFarmers", "");
    }
  }, [values.totalFarmers, values.femaleFarmers]);

  // ---------------- NESTED FIELD HANDLERS ----------------
  const handleNestedChange = (e) => {
    const { name, value } = e.target;
    const [parent, child] = name.split(".");
    setFieldValue(`${parent}.${child}`, value);
  };

  const handleNestedBlur = (e) => {
    const { name } = e.target;
    const [parent, child] = name.split(".");
    setFieldTouched(`${parent}.${child}`, true);
  };

  const handleRegisteredUnderChange = (e) => {
    setFieldValue("registeredUnder", parseInt(e.target.value, 10));
    setFieldTouched("registeredUnder", true);
  };


  // ---------------- FINANCIAL DATA ----------------
  const [financialData, setFinancialData] = useState([]);
  const [previewFinancialData, setPreviewFinancialData] = useState(null);
  const [isFinancialPreviewOpen, setIsFinancialPreviewOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [editingFinancialId, setEditingFinancialId] = useState(null);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState("");
  const [pendingRow, setPendingRow] = useState(null);

  const [imageFile, setImageFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  const [districtOptions, setDistrictOptions] = useState([]);
  const [agencyOptions, setAgencyOptions] = useState([]);
  const [blockOptions, setBlockOptions] = useState([]);
  const [yearOptions, setYearOptions] = useState([]);
  const [rangeOptions, setRangeOptions] = useState([]);
  const [districtLoading, setDistrictLoading] = useState(false);
  const [agencyLoading, setAgencyLoading] = useState(false);
  const [blockLoading, setBlockLoading] = useState(false);
  const [yearLoading, setYearLoading] = useState(false);
  const [rangeLoading, setRangeLoading] = useState(false);

  const [hasFinancialError, setHasFinancialError] = useState(false);
  const [isNextInSecondClicked, setIsNextInSecondClicked] = useState(false);
  const [sameAsPrimary, setSameAsPrimary] = useState(false);

  const [isRegistrationLoading, setIsRegistrationLoading] = useState(false);

  const handleSameAsPrimaryChange = (e) => {
    const checked = e.target.checked;
    setSameAsPrimary(checked);

    if (checked) {
      // Copy primary values
      setFieldValue("secondaryEmail", values.emailAddress || "");
      setFieldValue("secondaryMobile", values.mobileNumber || "");
    } else {
      // Clear secondary fields
      setFieldValue("secondaryEmail", "");
      setFieldValue("secondaryMobile", "");
    }
  };


  useEffect(() => {
    if (formik.values.districtId) {
      fetchBlocks(formik.values.districtId);
    } else {
      setBlockOptions([]);
    }
  }, [formik.values.districtId]);

  // --- FETCH BLOCKS BY DISTRICT ---
  const fetchBlocks = async (districtId) => {
    if (!districtId) {
      setBlockOptions([]);
      return;
    }

    setBlockLoading(true);
    try {
      const res = await getBlocksByDistrictId(districtId);

      if (res.success) {
        setBlockOptions(res.data || []);
      } else {
        setBlockOptions([]);
        // setValidationMessage(res.message || "Failed to fetch blocks");
        // setShowValidationModal(true);
        setStatusModal({
          isOpen: true,
          status: false, // false = error, true = success
          message: res.message || "Failed to fetch blocks"
        });
      }
    } catch (error) {
      setBlockOptions([]);
      // setValidationMessage(error?.message || "Error fetching blocks");
      // setShowValidationModal(true);
      setStatusModal({
        isOpen: true,
        status: false, // false = error, true = success
        message: error?.message || "Error fetching blocks"
      });
    } finally {
      setBlockLoading(false);
    }
  };

  useEffect(() => {
    const loadAllMasters = async () => {
      try {
        const results = await Promise.allSettled([
          getDistricts(),
          getGeneral("agency"),
          getGeneral("financial_range"),
          getGeneral("financial_year"),
        ]);

        const [districtRes, agencyRes, rangeRes, yearRes] = results;

        if (districtRes.status === "fulfilled" && districtRes.value.success) {
          setDistrictOptions(districtRes.value.data || []);
        }

        if (agencyRes.status === "fulfilled" && agencyRes.value.success) {
          setAgencyOptions(agencyRes.value.data || []);
        }

        if (rangeRes.status === "fulfilled" && rangeRes.value.success) {
          setRangeOptions(rangeRes.value.data || []);
        }

        if (yearRes.status === "fulfilled" && yearRes.value.success) {
          setYearOptions(yearRes.value.data || []);
        }

        const anyFailed = results.some(
          (r) => r.status === "rejected" || (r.value && !r.value.success)
        );

        if (anyFailed) {
          // setValidationMessage(
          //   "Some master data failed to load. Please refresh the page or contact support."
          // );
          // setShowValidationModal(true);
          setStatusModal({
            isOpen: true,
            status: false, // false = error, true = success
            message: "Some master data failed to load. Please refresh the page or contact support."
          });
        }
      } catch (err) {
        // setValidationMessage("Failed to load required data.");
        // setShowValidationModal(true);
        setStatusModal({
          isOpen: true,
          status: false, // false = error, true = success
          message: "Failed to load required data."
        });
      }
    };

    loadAllMasters();
  }, []);

  const [hasVisitedStep2, setHasVisitedStep2] = useState(false);

  useEffect(() => {
    if (!nextButtonClicked) return;

    const handleNextStep = async () => {

      console.log("NEXT clicked at step:", activeStep);

      // ---- STEP 2 SPECIAL CASE ----
      if (activeStep === 2) {
        // First time → skip validation
        if (!hasVisitedStep2) {
          setHasVisitedStep2(true);
          // setActiveStep((prev) => prev + 1);
          setNextButtonClicked(false);
          return;
        }
        setIsNextInSecondClicked(true);
        // Second time onwards → validate
        const isError = await validationCheck();
        console.log("Step 2 validation isError:", isError);

        if (isError) {
          setNextButtonClicked(false);
          return; // ❌ stay on step 2
        }

        // No error → go next
        setActiveStep((prev) => prev + 1);
        setNextButtonClicked(false);
        return;
      }

      if (activeStep === 3) {
        if (!imageFile || !pdfFile) {
          setValidationMessage("Please upload both Image and PDF files to proceed.");
          setShowValidationModal(true);
          setNextButtonClicked(false);
          return;
        }

        // Clear error and go next
        setValidationMessage("");
        setActiveStep((prev) => prev + 1);
        setNextButtonClicked(false);
        return;
      }

      // ---- NORMAL FLOW FOR OTHER STEPS ----
      if (activeStep < 4) {
        setActiveStep((prev) => prev + 1);
      }

      setNextButtonClicked(false);
    };

    handleNextStep();

  }, [nextButtonClicked, activeStep, hasVisitedStep2]);

  // useEffect(() => {
  //   if (!backButtonClicked) return;

  //   if (activeStep > 1) {
  //     setActiveStep((prev) => prev - 1);
  //   }

  //   setBackButtonClicked(false);
  // }, [backButtonClicked, activeStep]);


  useEffect(() => {
    if (!backButtonClicked) return;

    // Step 2 → Step 1 requires confirmation
    if (activeStep === 2) {
      setPendingAction("back");           // mark this as back action
      setIsConfirmationOpen(true);        // open modal
    } else if (activeStep > 1) {
      // Normal back flow for other steps
      setActiveStep((prev) => prev - 1);
    }

    setBackButtonClicked(false);          // reset click
  }, [backButtonClicked, activeStep]);


  useEffect(() => {
    if (saveButtonClicked) {
      handleSave();
      setBackButtonClicked(false);
    }
  }, [saveButtonClicked])

  const validateFinancialFields = () => {
    const financialErrors = {};

    if (!values.financialYear) financialErrors.financialYear = "Required";
    if (!values.turnOver) financialErrors.turnOver = "Required";
    if (!values.profitLoss) financialErrors.profitLoss = "Required";
    if (!values.financialRange) financialErrors.financialRange = "Required";
    if (!values.auditApplicability) financialErrors.auditApplicability = "Required";
    if (!values.auditStatus) financialErrors.auditStatus = "Required";
    if (!values.auditType) financialErrors.auditType = "Required";

    return financialErrors;
  };


  const handleAddOrUpdateFinancialRowClick = () => {
    // Validate financial fields first
    const requiredFields = [
      "financialYear",
      "turnOver",
      "profitLoss",
      "financialRange",
      "auditApplicability",
      "auditStatus",
      "auditType",
    ];

    const financialErrors = {};
    requiredFields.forEach((field) => {
      if (!values[field]) {
        financialErrors[field] = "Required";
        formik.setFieldTouched(field, true);
      }
    });

    console.log("financial errors :", financialErrors);

    if (Object.keys(financialErrors).length > 0) {
      setValidationMessage("Please complete all required financial fields before adding/updating.");
      setShowValidationModal(true);
      return;
    }

    // If valid, open confirmation modal
    setPendingAction(isUpdateMode ? "update" : "add");
    setPendingRow({
      id: isUpdateMode ? editingFinancialId : Date.now(),
      financialYear: values.financialYear,
      turnOver: parseFloat(values.turnOver),
      profitLoss: parseFloat(values.profitLoss),
      financialRange: values.financialRange,
      auditApplicability: values.auditApplicability,
      auditStatus: values.auditStatus,
      auditType: values.auditType,
    });
    setIsConfirmationOpen(true);
  };

  const handleDelete = (rowId) => {
    const rowToDelete = financialData.find((row) => row.id === rowId);
    setPendingAction("delete");
    setPendingRow(rowToDelete);
    setIsConfirmationOpen(true);
  };

  // const handleConfirm = () => {
  //   if (pendingAction === "add" || pendingAction === "update") {
  //     setFinancialData((prev) =>
  //       pendingAction === "update"
  //         ? prev.map((row) => (row.id === pendingRow.id ? pendingRow : row))
  //         : [...prev, pendingRow]
  //     );

  //     // Reset form fields
  //     ["financialYear", "turnOver", "profitLoss", "financialRange", "auditApplicability", "auditStatus", "auditType"]
  //       .forEach((field) => formik.setFieldValue(field, ""));

  //     setIsUpdateMode(false);
  //     setEditingFinancialId(null);
  //   } else if (pendingAction === "delete") {
  //     setFinancialData((prev) => prev.filter((row) => row.id !== pendingRow.id));
  //   }

  //   // Close modal and clear pending
  //   setIsConfirmationOpen(false);
  //   setPendingAction("");
  //   setPendingRow(null);
  // };

  const handleConfirm = () => {
    if (pendingAction === "add" || pendingAction === "update") {
      setFinancialData((prev) =>
        pendingAction === "update"
          ? prev.map((row) => (row.id === pendingRow.id ? pendingRow : row))
          : [...prev, pendingRow]
      );

      // Reset form fields
      ["financialYear", "turnOver", "profitLoss", "financialRange", "auditApplicability", "auditStatus", "auditType"]
        .forEach((field) => formik.setFieldValue(field, ""));

      setIsUpdateMode(false);
      setEditingFinancialId(null);
    } else if (pendingAction === "delete") {
      setFinancialData((prev) => prev.filter((row) => row.id !== pendingRow.id));
    } else if (pendingAction === "back") {
      // Only move back if user confirms
      setActiveStep((prev) => prev - 1);
    }

    // Close modal and clear pending
    setIsConfirmationOpen(false);
    setPendingAction("");
    setPendingRow(null);
  };



  const handleFinancialPreviewConfirm = () => {
    const rowData = { ...previewFinancialData, id: editingFinancialId || Date.now() };

    setFinancialData((prev) => {
      if (isUpdateMode) {
        return prev.map((row) => (row.id === editingFinancialId ? rowData : row));
      }
      return [...prev, rowData];
    });

    setIsFinancialPreviewOpen(false);
    setIsUpdateMode(false);
    setEditingFinancialId(null);

    // Reset form fields for financial details
    formik.setFieldValue("financialYear", "");
    formik.setFieldValue("turnOver", "");
    formik.setFieldValue("profitLoss", "");
    formik.setFieldValue("financialRange", "");
    formik.setFieldValue("auditApplicability", "");
    formik.setFieldValue("auditStatus", "");
    formik.setFieldValue("auditType", "");
  };

  const handleEditFinancialRow = (row) => {
    setIsUpdateMode(true);
    setEditingFinancialId(row.id);

    formik.setFieldValue("financialYear", row.financialYear);
    formik.setFieldValue("turnOver", row.turnOver);
    formik.setFieldValue("profitLoss", row.profitLoss);
    formik.setFieldValue("financialRange", row.financialRange);
    formik.setFieldValue("auditApplicability", row.auditApplicability);
    formik.setFieldValue("auditStatus", row.auditStatus);
    formik.setFieldValue("auditType", row.auditType);
  };

  const handleViewFinancialRow = (row) => {
    setPreviewFinancialData(row);
    setIsFinancialPreviewOpen(true);
  };

  const financialColumns = [
    "Financial Year",
    "Turnover",
    "Profit/Loss",
    "Financial Range",
    "Audit Applicability",
    "Audit Status",
    "Audit Type",
    "Actions",
  ];

  const isCoop = values.registeredUnder === 7;
  const detailsKey = isCoop ? "societyDetails" : "companyDetails";

  // ---------------- ACCORDION ITEMS ----------------
  const accordionItems = [
    {
      id: "reg-main",
      title: "Registration Details",
      isInitiallyOpen: true,
      content: (
        <>
          <p className="registration-help-text">
            Register FPO into the system and after approval credentials will be communicated via mail/SMS.
          </p>

          <div className="mb-4">
            <p className="registration-label">
              Registered Under <span className="registration-label-required">*</span>
            </p>
            <div className="flex flex-wrap gap-6 text-sm">
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="registeredUnder"
                  value={6}
                  checked={values.registeredUnder === 6}
                  onChange={handleRegisteredUnderChange}
                  onBlur={handleBlur}
                  disabled={disabled}
                />
                <span>Companies Act</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="registeredUnder"
                  value={7}
                  checked={values.registeredUnder === 7}
                  onChange={handleRegisteredUnderChange}
                  onBlur={handleBlur}
                  disabled={disabled}
                />
                <span>Cooperatives/Societies Act</span>
              </label>
            </div>
            {touched.registeredUnder && errors.registeredUnder && (
              <p className="text-red-600 text-xs">{errors.registeredUnder}</p>
            )}

            {/* COMPANY / COOP FIELDS */}
            {isCoop ? (
              <>
                {/* Cooperative Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <TextField
                    label="Registration Number"
                    required
                    name={`${detailsKey}.regdNo`}
                    placeholder="Registration Number"
                    value={values[detailsKey]?.regdNo || ""}
                    onChange={handleNestedChange}
                    onBlur={handleNestedBlur}
                    error={errors.societyDetails?.regdNo}
                    touched={touched.societyDetails?.regdNo}
                    disabled={disabled}
                  />
                  <TextField
                    label="Name of Cooperatives/Societies"
                    required
                    name={`${detailsKey}.coopsocietyName`}
                    placeholder="Name of Cooperatives/Societies"
                    value={values[detailsKey]?.coopsocietyName || ""}
                    onChange={handleNestedChange}
                    onBlur={handleNestedBlur}
                    error={errors.societyDetails?.coopsocietyName}
                    touched={touched.societyDetails?.coopsocietyName}
                    disabled={disabled}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <TextField
                    label="Date of Registration"
                    required
                    name={`${detailsKey}.doreg`}
                    type="date"
                    placeholder="dd/mm/yyyy"
                    value={values[detailsKey]?.doreg || ""}
                    onChange={handleNestedChange}
                    onBlur={handleNestedBlur}
                    error={errors.societyDetails?.doreg}
                    touched={touched.societyDetails?.doreg}
                    disabled={disabled}
                  />
                  <SelectField
                    label="Cooperative/Society status"
                    required
                    name={`${detailsKey}.companyStatus`}
                    value={values[detailsKey]?.companyStatus || ""}
                    onChange={handleNestedChange}
                    onBlur={handleNestedBlur}
                    error={errors.societyDetails?.companyStatus}
                    touched={touched.societyDetails?.companyStatus}
                    disabled={disabled}
                  >
                    <option value="">Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </SelectField>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <TextField
                    label="Registration Authority Name"
                    required
                    name={`${detailsKey}.roaName`}
                    placeholder="Registration Authority Name"
                    value={values[detailsKey]?.roaName || ""}
                    onChange={handleNestedChange}
                    onBlur={handleNestedBlur}
                    error={errors.societyDetails?.roaName}
                    touched={touched.societyDetails?.roaName}
                    disabled={disabled}
                  />
                </div>
              </>
            ) : (
              <>
                {/* Company Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <TextField
                    label="CIN / LLPIN / FCRN"
                    required
                    name={`${detailsKey}.cin`}
                    placeholder="Enter CIN"
                    value={values[detailsKey]?.cin || ""}
                    maxLength={21}   // hard UI limit
                    onChange={(e) => {
                      let value = e.target.value
                        .toUpperCase()
                        .replace(/[^A-Z0-9]/g, ""); // only A-Z & 0-9

                      // enforce 21 char max manually (extra safety)
                      if (value.length > 21) value = value.slice(0, 21);

                      setFieldValue(`${detailsKey}.cin`, value);
                    }}
                    onBlur={handleNestedBlur}
                    error={errors.companyDetails?.cin}
                    touched={touched.companyDetails?.cin}
                    disabled={disabled}
                  />


                  {!disabled && <div className="pt-6">
                    <Button type="button" disabled={disabled} buttonClassName="px-4 py-2 bg-green-600 text-white rounded">
                      Fetch Data from MCA
                    </Button>
                  </div>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <TextField
                    label="Name of Company"
                    required
                    name={`${detailsKey}.companyName`}
                    placeholder="Name of Company"
                    value={values[detailsKey]?.companyName || ""}
                    onChange={handleNestedChange}
                    onBlur={handleNestedBlur}
                    error={errors.companyDetails?.companyName}
                    touched={touched.companyDetails?.companyName}
                    disabled={disabled}
                  />
                  <TextField
                    label="Date of Incorporation"
                    required
                    name={`${detailsKey}.incorporationDate`}
                    type="date"
                    max={new Date().toISOString().split("T")[0]}   // ✅ today
                    placeholder="(dd/mm/yyyy)"
                    value={values[detailsKey]?.incorporationDate || ""}
                    onChange={handleNestedChange}
                    onBlur={handleNestedBlur}
                    error={errors.companyDetails?.incorporationDate}
                    touched={touched.companyDetails?.incorporationDate}
                    disabled={disabled}
                  />

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <SelectField
                    label="Company status"
                    required
                    name={`${detailsKey}.companyStatus`}
                    value={values[detailsKey]?.companyStatus || ""}
                    onChange={handleNestedChange}
                    onBlur={handleNestedBlur}
                    error={errors.companyDetails?.companyStatus}
                    touched={touched.companyDetails?.companyStatus}
                    disabled={disabled}
                  >
                    <option value="">Company status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </SelectField>
                  <TextField
                    label="ROC Name"
                    required
                    name={`${detailsKey}.rocName`}
                    placeholder="ROC Name"
                    value={values[detailsKey]?.rocName || ""}
                    onChange={handleNestedChange}
                    onBlur={handleNestedBlur}
                    error={errors.companyDetails?.rocName}
                    touched={touched.companyDetails?.rocName}
                    disabled={disabled}
                  />
                </div>
              </>
            )}
          </div>
        </>
      ),
    },
    // -------- CONTACT DETAILS --------
    {
      id: "contact",
      title: "Contact Details",
      isInitiallyOpen: false,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            label="Email Address"
            required
            name="emailAddress"
            type="email"
            placeholder="Email Address"
            value={values.emailAddress || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.emailAddress}
            touched={touched.emailAddress}
            disabled={disabled}
          />
          <TextField
            label="Contact Number"
            required
            name="mobileNumber"
            placeholder="Contact Number"
            value={values.mobileNumber || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            onInput={(e) => {
              // Allow only digits and max 10 characters
              e.target.value = e.target.value
                .replace(/\D/g, '')
                .slice(0, 10);
            }}
            error={errors.mobileNumber}
            touched={touched.mobileNumber}
            disabled={disabled}
          />
        </div>
      ),
    },
    // -------- FINANCIAL DETAILS --------
    {
      id: "financial-details",
      title: "Financial Details of Company",
      isInitiallyOpen: false,
      hasError: hasFinancialError,
      content: (
        <div className="mt-4">
          {!disabled && <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <SelectField
                label="Financial Year"
                required
                name="financialYear"
                value={values.financialYear}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.financialYear}
                touched={touched.financialYear}
                disabled={disabled || yearLoading}
              >
                {/* <option value="">Select Year</option>
              <option value="2023-24">2023-24</option>
              <option value="2022-23">2022-23</option> */}
                <option value="">{yearLoading ? "Year Loading..." : "Select Year"}</option>
                {yearOptions.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </SelectField>
              <TextField
                label="Turnover"
                required
                name="turnOver"
                // type="number"
                onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '')}
                placeholder="Enter Value"
                value={values.turnOver}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.turnOver}
                touched={touched.turnOver}
                disabled={disabled}
              />
              <TextField
                label="Profit/Loss"
                required
                name="profitLoss"
                // type="number"
                onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '')}
                placeholder="Enter Value"
                value={values.profitLoss}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.profitLoss}
                touched={touched.profitLoss}
                disabled={disabled}
              />
              <SelectField
                label="Financial Range"
                required
                name="financialRange"
                value={values.financialRange}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.financialRange}
                touched={touched.financialRange}
                disabled={disabled || rangeLoading}
              >
                {/* <option value="">Select Range</option>
              <option value="1-5Crores">1-5 Crores</option>
              <option value="6-20 Crores">6-20 Crores</option> */}
                <option value="">{rangeLoading ? "Range Loading..." : "Select Range"}</option>
                {rangeOptions.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </SelectField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <RadioGroup
                label="Audit Status Applicability"
                required
                name="auditApplicability"
                value={values.auditApplicability}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.auditApplicability}
                touched={touched.auditApplicability}
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
                disabled={disabled}
              />
              <RadioGroup
                label="Audit Status"
                required
                name="auditStatus"
                value={values.auditStatus}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.auditStatus}
                touched={touched.auditStatus}
                options={[
                  { value: "done", label: "Done" },
                  { value: "notdone", label: "Not Done" },
                ]}
                disabled={disabled || values.auditApplicability === "no"}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <SelectField
                label="Type"
                required
                name="auditType"
                value={values.auditType}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.auditType}
                touched={touched.auditType}
                disabled={disabled || values.auditApplicability === "no"}
              >
                <option value="na">Not Applicable</option>
                <option value="internal">Internal Audit</option>
                <option value="statutory">Statutory Audit</option>
              </SelectField>
            </div>

            {!disabled && <Button
              type="button"
              onClick={handleAddOrUpdateFinancialRowClick}
              buttonClassName="px-4 py-2 bg-green-600 text-white rounded mb-4"
            >
              {isUpdateMode ? "Update" : "Add"} Financial Details
            </Button>
            }
          </>}
          {/* Financial Table */}
          <Table
            columns={financialColumns}
            data={financialData.map((row) => ({
              "Financial Year": row.financialYear || "-",
              Turnover: row.turnOver || "-",
              "Profit/Loss": row.profitLoss || "-",
              "Financial Range": row.financialRange || "-",
              "Audit Applicability": row.auditApplicability || "-",
              "Audit Status": row.auditStatus || "-",
              "Audit Type": row.auditType || "-",
              Actions: "actions",
              ...row,
            }))}
            rowKey="id"
            renderActions={(row) => (
              <div className="flex gap-2 items-center justify-center">
                <img
                  src={editSvg}
                  alt="edit"
                  className="w-6 cursor-pointer"
                  onClick={() => handleEditFinancialRow(row)}
                />
                <img
                  src={viewSvg}
                  alt="view"
                  className="w-6 cursor-pointer"
                  onClick={() => {
                    setPreviewFinancialData(row);
                    setIsFinancialPreviewOpen(true);
                    setIsUpdateMode(false);
                    setEditingFinancialId(null);
                  }}

                />

                <img
                  src={deleteSvg}
                  alt="Delete"
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => handleDelete(row.id)}
                />

              </div>
            )}
            stickyLastColumn
          />
        </div>
      ),
    },
  ];

  useEffect(() => {

    // If there is no financial data, show error
    if (financialData.length === 0) {
      if (isNextInSecondClicked) {
        setHasFinancialError(true);
      }
    } else {
      // Clear error if user adds at least one row
      setHasFinancialError(false);
    }
  }, [financialData, isNextInSecondClicked]);

  return (
    <>
      {showForm && (
        <>
          <AccordionGroup items={accordionItems} />

          {/* ---------- Registration Information Fields ---------- */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-800 mb-4">Registration Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectField
                label="Implementing Agency (Associated with)"
                required
                name="agency"
                value={values.agency}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.agency}
                touched={touched.agency}
                disabled={disabled || agencyLoading}
              >
                <option value="">{agencyLoading ? "Agency Loading..." : "Select Agency"}</option>
                {agencyOptions.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </SelectField>

              <SelectField
                label="District"
                required
                name="districtId"
                value={values.districtId}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.districtId}
                touched={touched.districtId}
                disabled={disabled || districtLoading}
              >
                <option value="">
                  {districtLoading ? "Loading districts..." : "Select District"}
                </option>

                {districtOptions.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </SelectField>


              <SelectField
                label="Block"
                required
                name="blockId"
                value={values.blockId}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.blockId}
                touched={touched.blockId}
                disabled={disabled || blockLoading}
              >
                <option value="">Select Block</option>
                {blockOptions.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </SelectField>


              <TextField
                label="Address"
                type="text"
                name="communicationAddress"
                placeholder="Enter Address"
                value={values.communicationAddress}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.communicationAddress}
                touched={touched.communicationAddress}
                disabled={disabled}
              />
              <TextField
                label="Pincode"
                required
                type="text"
                name="pincode"
                placeholder="Enter Pincode"
                value={values.pincode}
                onInput={(e) => {
                  // Allow only digits and max 10 characters
                  e.target.value = e.target.value
                    .replace(/\D/g, '')
                    .slice(0, 6);
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.pincode}
                touched={touched.pincode}
                disabled={disabled}
              />
              <TextField
                label="Number of Shareholders"
                required
                name="totalFarmers"
                placeholder="Enter Value"
                value={values.totalFarmers}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  setFieldValue("totalFarmers", val);

                  // Update male automatically
                  const female = parseInt(values.femaleFarmers || 0, 10);
                  setFieldValue("maleFarmers", val ? Math.max(val - female, 0) : 0);
                }}
                onBlur={handleBlur}
                error={errors.totalFarmers}
                touched={touched.totalFarmers}
                disabled={disabled}
              />

              <TextField
                label="Number of Female Shareholders"
                required
                name="femaleFarmers"
                placeholder="Enter Value"
                value={values.femaleFarmers}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  setFieldValue("femaleFarmers", val);

                  // Update male automatically
                  const total = parseInt(values.totalFarmers || 0, 10);
                  setFieldValue("maleFarmers", total ? Math.max(total - val, 0) : 0);
                }}
                onBlur={handleBlur}
                error={errors.femaleFarmers}
                touched={touched.femaleFarmers}
                disabled={disabled}
              />

              <TextField
                label="Number of Male Shareholders"
                required
                name="maleFarmers"
                placeholder="Auto-calculated"
                value={values.maleFarmers || 0}
                disabled
              />

              <TextField
                label="Total Land Owned by FPO Farmers(In Hectares)"
                required
                name="landOwnedByFpo"
                placeholder="Enter Value"
                value={values.landOwnedByFpo}
                onChange={handleChange}
                onBlur={handleBlur}
                onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '')}
                error={errors.landOwnedByFpo}
                touched={touched.landOwnedByFpo}
                disabled={disabled}
              />

              <div className="mb-4 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="sameAsPrimary"
                  checked={sameAsPrimary}
                  onChange={handleSameAsPrimaryChange}
                  disabled={disabled}
                />
                <label htmlFor="sameAsPrimary" className="text-sm">
                  Same as primary email and contact
                </label>
              </div>

              <TextField
                label="Secondary FPO Email"
                required
                type="email"
                name="secondaryEmail"
                placeholder="Enter Email"
                value={values.secondaryEmail}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.secondaryEmail}
                touched={touched.secondaryEmail}
                disabled={disabled || sameAsPrimary}
              />

              <TextField
                label="Secondary FPO Contact Number"
                required
                type="text"
                name="secondaryMobile"
                placeholder="Enter Contact Number"
                value={values.secondaryMobile}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.secondaryMobile}
                touched={touched.secondaryMobile}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10);
                }}
                disabled={disabled || sameAsPrimary}
              />
              <TextField
                label="Username"
                required
                type="text"
                name="username"
                placeholder="Enter Text"
                value={values.username}
                onChange={(e) => {
                  // Remove spaces
                  const value = e.target.value.replace(/\s/g, "");
                  setFieldValue("username", value);
                }}
                onBlur={handleBlur}
                error={errors.username}
                touched={touched.username}
                disabled={disabled}
              />

              <TextField
                label="Password"
                required
                type="password"
                name="password"
                placeholder="Enter Password"
                value={values.password}
                onChange={(e) => {
                  let value = e.target.value.replace(/\s/g, ""); // Remove spaces
                  if (value.length > 20) value = value.slice(0, 20); // Limit to 20 chars
                  setFieldValue("password", value);
                }}
                onBlur={handleBlur}
                error={errors.password}
                touched={touched.password}
                disabled={disabled}
              />

              <TextField
                label="Confirm Password"
                required
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={values.confirmPassword}
                onChange={(e) => {
                  let value = e.target.value.replace(/\s/g, ""); // Remove spaces
                  if (value.length > 20) value = value.slice(0, 20); // Limit to 20 chars
                  setFieldValue("confirmPassword", value);
                }}
                onBlur={handleBlur}
                error={errors.confirmPassword}
                touched={touched.confirmPassword}
                disabled={disabled}
              />

              <TextField
                label="FPO PAN"
                required
                type="text"
                name="fpoPanNo"
                placeholder="Enter PAN Number"
                value={values.fpoPanNo || ""}
                maxLength={10}   // ✅ hard limit
                onChange={(e) => {
                  let value = e.target.value
                    .toUpperCase()
                    .replace(/[^A-Z0-9]/g, ""); // ✅ only A-Z & 0-9

                  if (value.length > 10) value = value.slice(0, 10);

                  setFieldValue("fpoPanNo", value);
                }}
                onBlur={handleBlur}
                error={errors.fpoPanNo}
                touched={touched.fpoPanNo}
                disabled={disabled}
              />


            </div>
          </div>
        </>
      )}

      {/* ---------- DOCUMENT UPLOAD ---------- */}
      {/* {showDocuments && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">Documents</h3>
          <AddDocuments
            imgConfig={imgConfig || { allowedTypes: ["image/png", "image/jpeg"], maxSizeMB: 5 }}
            pdfConfig={pdfConfig || { allowedTypes: ["application/pdf"], maxSizeMB: 10 }}
            onFileSelect={(files) => console.log("Selected files:", files)}
            disabled={disabled}
          />
        </div>
      )} */}

      {showDocuments && (
        <div className="pt-6 border-t border-gray-200">

          <div className="space-y-6">
            {/* Image Upload */}
            <UploadDocument
              config={imgConfig || { allowedTypes: ["image/png", "image/jpeg"], maxSizeMB: 5 }}
              onFileSelect={(file) => {
                setImageFile(file);
                console.log("Selected image:", file);
              }}
              disabled={disabled}
            />

            {/* PDF Upload */}
            <UploadDocument
              config={pdfConfig || { allowedTypes: ["application/pdf"], maxSizeMB: 10 }}
              onFileSelect={(file) => {
                setPdfFile(file);
                console.log("Selected pdf:", file);
              }}
              disabled={disabled}
            />
          </div>
        </div>
      )}

      {/* Financial Preview Modal */}
      <PreviewModal
        isOpen={isFinancialPreviewOpen}
        title="Preview Financial Details"
        data={mapFinancialPreviewData(previewFinancialData)}
        onClose={() => setIsFinancialPreviewOpen(false)}
        isDescriptionAvailable={false}
        onConfirm={handleFinancialPreviewConfirm}
        confirmText={isUpdateMode ? "Update" : "Add"}
      />

      {/* <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={handleConfirm}
        title={
          pendingAction === "delete"
            ? "Delete Record"
            : isUpdateMode
              ? "Update Record"
              : "Save Record"
        }
        description={
          pendingAction === "delete"
            ? "Are you sure you want to delete this financial record?"
            : `Are you sure you want to ${isUpdateMode ? "update" : "save"} this financial record?`
        }
      /> */}

      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => {
          setIsConfirmationOpen(false);
          setPendingAction(""); // clear pending action
        }}
        onConfirm={handleConfirm}
        title={
          pendingAction === "delete"
            ? "Delete Record"
            : pendingAction === "back"
              ? "Go Back"
              : isUpdateMode
                ? "Update Record"
                : "Save Record"
        }
        description={
          pendingAction === "delete"
            ? "Are you sure you want to delete this financial record?"
            : pendingAction === "back"
              ? "All your saved data will be lost, are you sure you want to continue?"
              : `Are you sure you want to ${isUpdateMode ? "update" : "save"} this financial record?`
        }
      />

      {/* Validation Modal */}
      <ValidationModal
        isOpen={showValidationModal}
        title="Validation Required"
        message={validationMessage}
        onClose={() => setShowValidationModal(false)}
      />

      <StatusModal
        isOpen={statusModal.isOpen}
        status={statusModal.status} // true = success, false = error
        message={statusModal.message}
        onClose={handleStatusClose}
      />


      {isRegistrationLoading && <Loader text="Registering..." />}

    </>
  );
};

export default RegistrationForm;
