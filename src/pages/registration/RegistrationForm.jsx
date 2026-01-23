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

const RegistrationForm = ({ showForm = true, showDocuments = true, disabled = false, imgConfig, pdfConfig, activeStep, setActiveStep, nextButtonClicked, setNextButtonClicked, backButtonClicked, setBackButtonClicked, saveButtonClicked, setSaveButtonClicked, steps }) => {
  // ---------------- INITIAL FORM VALUES ----------------
  const initialValues = {
    registeredUnder: "",
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
    setValidationMessage("");
  };

  const validationCheck = async () => {
    const errors = await formik.validateForm();

    console.log("errors :", errors);

    // Helper: mark all fields (nested 1 level) as touched
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

    if (Object.keys(errors).length > 0) {
      // Mark all fields as touched so errors show
      formik.setTouched(markAllTouched(formik.values));

      // Show validation modal
      setValidationMessage("Please complete all required fields before proceeding.");
      setShowValidationModal(true);
      return true;
    }
  }



  const handleSave = async () => {
    // Validate the form manually

    const hasError = await validationCheck();
    if (hasError) return;   // ✅ STOP if invalid


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

    setTimeout(() => {
      resetAllFormData();
    }, 300);
  };


  const { values, handleChange, handleBlur, setFieldValue, setFieldTouched, touched, errors } = formik;


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
  const [districtLoading, setDistrictLoading] = useState(false);


  const fetchDistricts = async () => {
    try {
      setDistrictLoading(true);

      const res = await fetch("http://10.0.1.6:8082/api/v1/master/districts");
      const json = await res.json();

      if (json.success) {
        setDistrictOptions(json.data || []);
      } else {
        setDistrictOptions([]);
        console.error("District API failed:", json.message);
      }
    } catch (error) {
      console.error("Error fetching districts:", error);
      setDistrictOptions([]);
    } finally {
      setDistrictLoading(false);
    }
  };


  useEffect(() => {
    // fetchDistricts();   // 👈 runs only once
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

      // ---- NORMAL FLOW FOR OTHER STEPS ----
      if (activeStep < 4) {
        setActiveStep((prev) => prev + 1);
      }

      setNextButtonClicked(false);
    };

    handleNextStep();

  }, [nextButtonClicked, activeStep, hasVisitedStep2]);

  useEffect(() => {
    if (!backButtonClicked) return;

    if (activeStep > 1) {
      setActiveStep((prev) => prev - 1);
    }

    setBackButtonClicked(false);
  }, [backButtonClicked, activeStep]);


  useEffect(() => {
    if(saveButtonClicked){
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


  // Mock options for Agency, Block, District
  const agencyOptions = [
    { id: 1, name: "Agency 1" },
    { id: 2, name: "Agency 2" },
    { id: 3, name: "Agency 3" },
    { id: 4, name: "Agency 4" },
  ];

  const blockOptions = [
    { id: 2677, name: "Block 1" },
    { id: 2678, name: "Block 2" },
    { id: 2679, name: "Block 3" },
  ];

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

  const handleAddFinancialRow = () => {
    setFinancialData((prev) => [
      ...prev,
      {
        id: Date.now(),
        financialYear: values.financialYear,
        turnOver: parseFloat(values.turnOver),
        profitLoss: parseFloat(values.profitLoss),
        financialRange: values.financialRange,
        auditApplicability: values.auditApplicability === "yes",
        auditStatus: values.auditStatus === "done",
        auditType: values.auditType,
      },
    ]);
  };

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
            Registered FPO into the system and after approval credentials will be communicated via mail/SMS.
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
                    placeholder="Enter CIN / LLPIN / FCRN"
                    value={values[detailsKey]?.cin || ""}
                    onChange={handleNestedChange}
                    onBlur={handleNestedBlur}
                    error={errors.companyDetails?.cin}
                    touched={touched.companyDetails?.cin}
                    disabled={disabled}
                  />
                  <div className="pt-6">
                    <Button type="button" disabled={disabled} buttonClassName="px-4 py-2 bg-green-600 text-white rounded">
                      Fetch Data from MCA
                    </Button>
                  </div>
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
            name="mobileNumber"
            placeholder="Contact Number"
            value={values.mobileNumber || ""}
            onChange={handleChange}
            onBlur={handleBlur}
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
      content: (
        <div className="mt-4">
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
              disabled={disabled}
            >
              <option value="">Select Year</option>
              <option value="2023-24">2023-24</option>
              <option value="2022-23">2022-23</option>
            </SelectField>
            <TextField
              label="Turnover"
              required
              name="turnOver"
              type="number"
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
              type="number"
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
              disabled={disabled}
            >
              <option value="">Select Range</option>
              <option value="1-5Crores">1-5 Crores</option>
              <option value="6-20 Crores">6-20 Crores</option>
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
              disabled={disabled}
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
              disabled={disabled}
            >
              <option value="na">Not Applicable</option>
              <option value="internal">Internal Audit</option>
              <option value="statutory">Statutory Audit</option>
            </SelectField>
          </div>

          {/* <Button
            type="button"
            buttonClassName="px-4 py-2 bg-green-600 text-white rounded mb-4"
            onClick={handleAddFinancialRow}
            disabled={disabled}
          >
            Add Financial Details
          </Button> */}

          <Button
            type="button"
            onClick={handleAddOrUpdateFinancialRowClick}
            buttonClassName="px-4 py-2 bg-green-600 text-white rounded mb-4"
          >
            {isUpdateMode ? "Update" : "Add"} Financial Details
          </Button>

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
                disabled={disabled}
              >
                <option value="">Select Agency</option>
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
                disabled={disabled}
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
                type="number"
                placeholder="Enter Value"
                value={values.totalFarmers}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.totalFarmers}
                touched={touched.totalFarmers}
                disabled={disabled}
              />
              <TextField
                label="Number of Female Shareholders"
                required
                name="femaleFarmers"
                type="number"
                placeholder="Enter Value"
                value={values.femaleFarmers}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.femaleFarmers}
                touched={touched.femaleFarmers}
                disabled={disabled}
              />
              <TextField
                label="Number of Male Shareholders"
                required
                name="maleFarmers"
                type="number"
                placeholder="Enter Value"
                value={values.maleFarmers}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.maleFarmers}
                touched={touched.maleFarmers}
                disabled={disabled}
              />
              <TextField
                label="Percentage of Female Shareholders"
                name="percentageOfFemaleFarmers"
                type="number"
                placeholder="Enter Value"
                value={values.percentageOfFemaleFarmers}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.percentageOfFemaleFarmers}
                touched={touched.percentageOfFemaleFarmers}
                disabled={true}
              />
              <TextField
                label="Total Land Owned by FPO Farmers(In Hectares)"
                required
                name="landOwnedByFpo"
                type="number"
                placeholder="Enter Value"
                value={values.landOwnedByFpo}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.landOwnedByFpo}
                touched={touched.landOwnedByFpo}
                disabled={disabled}
              />
              <TextField
                label="Secondary FPO email"
                type="email"
                name="secondaryEmail"
                placeholder="Enter Email"
                value={values.secondaryEmail}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.secondaryEmail}
                touched={touched.secondaryEmail}
                disabled={disabled}
              />
              <TextField
                label="Secondary FPO Contact Number"
                type="text"
                name="secondaryMobile"
                placeholder="Enter Contact Number"
                value={values.secondaryMobile}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.secondaryMobile}
                touched={touched.secondaryMobile}
                disabled={disabled}
              />
              <TextField
                label="Username"
                required
                type="text"
                name="username"
                placeholder="Enter Text"
                value={values.username}
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                value={values.fpoPanNo}
                onChange={handleChange}
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
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">Documents</h3>

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


      <ConfirmationModal
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
      />


      {/* Validation Modal */}
      <ValidationModal
        isOpen={showValidationModal}
        title="Validation Required"
        message={validationMessage}
        onClose={() => setShowValidationModal(false)}
      />

    </>
  );
};

export default RegistrationForm;
