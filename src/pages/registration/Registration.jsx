import { useState, useEffect } from "react";
import SelectUser from "./SelectUser";
import RegistrationForm from "./RegistrationForm";
import StepWizard from "../../components/StepWizard";

import StatusModal from "../../components/StatusModal";
import ConfirmationModal from "../../components/ConfirmationModal";

const initialValues = {
  registeredUnder: "companies",
  companyDetails: { cin: "", doi: "", companyName: "", rocName: "", companyStatus: "" },
  cooperativeDetails: { regdNo: "", coopsocietyName: "", doreg: "", roaName: "", area: "" },
  primaryEmail: "", primaryContact: "", secondaryEmail: "", secondaryContact: "",
  financialForm: { financialYear: "", turnOver: "", profitLoss: "", financialRange: "", auditApplicability: "", auditStatus: "", auditType: "" },
  district: "", implementingAgency: "", block: "", communicationAddress: "", totalShareholders: "", totalLand: "",
  username: "", password: "", confirmPassword: "", fpopan: "",
  bannerImage: null, shareholderSheet: null,
};

const pdfConfig = {
  title: "Upload Share allotment Sheet of the Shareholders",
  maxSizeMB: "PDF size - Max 5mb)",
  allowedTypes: ["application/pdf"],
};

const imgConfig = {
  title: "FPO Banner Image",
  maxSizeMB: "JPEG only (max. 5 MB)",
  allowedTypes: ["image/jpeg"],
};

export default function Registration() {
  const [values, setValues] = useState(initialValues);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState(true);
  const [modalMessage, setModalMessage] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [nextButtonClicked, setNextButtonClicked] = useState(null);
  const [backButtonClicked, setBackButtonClicked] = useState(null);
  const [saveButtonClicked, setSaveButtonClicked] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");
    setValues((prev) => {
      const updated = { ...prev };
      let temp = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        temp[keys[i]] = { ...temp[keys[i]] };
        temp = temp[keys[i]];
      }
      temp[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const handleRegisteredUnderChange = (e) => {
    const value = e.target.value;
    setValues((prev) => ({
      ...prev,
      registeredUnder: value,
      companyDetails: value === "companies" ? prev.companyDetails : { cin: "", doi: "", companyName: "", rocName: "", companyStatus: "" },
      cooperativeDetails: value === "cooperatives" ? prev.cooperativeDetails : { regdNo: "", coopsocietyName: "", doreg: "", roaName: "", area: "" },
    }));
  };

  const handleFileSelect = (type, file) => {
    setValues((prev) => ({
      ...prev,
      ...(type === "image" ? { bannerImage: file } : { shareholderSheet: file }),
    }));
  };

  const handleSubmit = () => {
    setSaveButtonClicked(Date.now());
    // setIsConfirmModalOpen(true);
  }
  const handleConfirmSubmit = () => {
    console.log("Final Submit Payload", values);
    setIsConfirmModalOpen(false);
    setTimeout(() => {
      setModalStatus(true);
      setModalMessage("The form has been registered successfully!!");
      setIsModalOpen(true);
    }, 300);
  };

  useEffect(() => {
    console.log("next button clicked in registration")
  }, [nextButtonClicked])

  // ------------------------ STEPS ------------------------
  const steps = [
    { label: "Select User", component: <SelectUser /> },
    {
      label: "Registration Details",
      component: (
        <RegistrationForm
          values={values}
          handleChange={handleChange}
          handleNestedChange={handleNestedChange}
          handleRegisteredUnderChange={handleRegisteredUnderChange}
          showForm={true}
          showDocuments={false} // Hide documents in step 2
          disabled={false}       // Editable
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          nextButtonClicked={nextButtonClicked}
          setNextButtonClicked={setNextButtonClicked}
          backButtonClicked={backButtonClicked}
          setBackButtonClicked={setBackButtonClicked}
          saveButtonClicked={saveButtonClicked}
          setSaveButtonClicked={setSaveButtonClicked}
        />
      ),
    },
    {
      label: "Add Documents",
      component: (
        <RegistrationForm
          values={values}
          handleChange={handleChange}
          handleNestedChange={handleNestedChange}
          handleRegisteredUnderChange={handleRegisteredUnderChange}
          imgConfig={imgConfig}
          pdfConfig={pdfConfig}
          handleFileSelect={handleFileSelect}
          showForm={false}
          showDocuments={true}  // Show documents in step 3
          disabled={false}       // Editable
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          nextButtonClicked={nextButtonClicked}
          setNextButtonClicked={setNextButtonClicked}
          backButtonClicked={backButtonClicked}
          setBackButtonClicked={setBackButtonClicked}
          saveButtonClicked={saveButtonClicked}
          setSaveButtonClicked={setSaveButtonClicked}
        />
      ),
    },
    {
      label: "Review",
      component: (
        <RegistrationForm
          values={values}
          handleChange={handleChange}
          handleNestedChange={handleNestedChange}
          handleRegisteredUnderChange={handleRegisteredUnderChange}
          imgConfig={imgConfig}
          pdfConfig={pdfConfig}
          handleFileSelect={handleFileSelect}
          showForm={true}
          showDocuments={true}
          disabled={true}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          nextButtonClicked={nextButtonClicked}
          setNextButtonClicked={setNextButtonClicked}
          backButtonClicked={backButtonClicked}
          setBackButtonClicked={setBackButtonClicked}
          saveButtonClicked={saveButtonClicked}
          setSaveButtonClicked={setSaveButtonClicked}
        />
      ),
    },
  ];

  return (
    <div className="relative">
      <StepWizard
        title={values.registeredUnder === "cooperatives" ? "Cooperatives/Societies Act" : "FPC Companies Act"}
        steps={steps}
        onComplete={handleSubmit}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        setNextButtonClicked={setNextButtonClicked}
        setBackButtonClicked={setBackButtonClicked}
        setSaveButtonClicked={setSaveButtonClicked}
      />

      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmSubmit}
        title="Submit Registration Form"
        description="Are you sure you want to submit the registration form? Forms once submitted cannot be edited."
      />

      <StatusModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        status={modalStatus}
        message={modalMessage}
      />
    </div>
  );
}
