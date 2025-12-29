import { useState } from "react";
// import "./RegisterScreen.css";
import SelectUser from "./SelectUser";
import RegistrationForm from "./RegistrationForm";
import AddDocuments from "../../components/AddDocuments";
import Review from "./Review";
import { Button } from "../../components/Buttons";
import StepWizard from "../../components/StepWizard";

import StatusModal from "../../components/StatusModal";
import ConfirmationModal from "../../components/ConfirmationModal";

const initialValues = {
  // Registration Details (Accordions)
  registeredUnder: "companies",
  cin: "",
  doi: "",
  companyName: "",
  rocName: "",
  companyStatus: "",
  addressType: "",
  address1: "",
  address2: "",
  pincode: "",
  primaryEmail: "",
  primaryContact: "",
  secondaryEmail: "",
  secondaryContact: "",
  totalShareholders: "",
  financialYear: "",
  turnOver: "",
  totalLand: "",
  // Registration form fields (below accordions)
  implementingAgency: "",
  block: "",
  communicationAddress: "",
  username: "",
  password: "",
  confirmPassword: "",
  fpopan: "",
  bannerImage: null,
  shareholderSheet: null,
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

  const handleChange = (e) => {
    const { name, type } = e.target;
    const value = type === "radio" ? e.target.value : e.target.value;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  function handleFileSelect(type, file) {
    if (type === "image") {
      setValues((prev) => ({ ...prev, bannerImage: file }));
    } else if (type === "pdf") {
      setValues((prev) => ({ ...prev, shareholderSheet: file }));
    }
  }

  function handleSubmit() {
    setIsConfirmModalOpen(true);
  }

  function handleConfirmSubmit() {
    // TODO: submit to API
    console.log("Form submit", values);
    setIsConfirmModalOpen(false);

    // Simulate API success
    setTimeout(() => {
      setModalStatus(true);
      setModalMessage("The form has been registered successfully!!");
      setIsModalOpen(true);
    }, 300);
  }

  const steps = [
    {
      label: "Select User",
      component: <SelectUser />
    },
    {
      label: "Registration Details",
      component: <RegistrationForm values={values} handleChange={handleChange} />
    },
    {
      label: "Add Documents",
      component: (
        <AddDocuments
          imgConfig={imgConfig}
          pdfConfig={pdfConfig}
          onFileSelect={handleFileSelect}
        />
      )
    },
    {
      label: "Review",
      component: <Review values={values} imgConfig={imgConfig} pdfConfig={pdfConfig} onFileSelect={handleFileSelect} />
    },
  ];

  return (
    <div className="relative">
      <StepWizard
        title="FPC Companies Act"
        steps={steps}
        onComplete={handleSubmit}
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
