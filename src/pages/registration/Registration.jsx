/******* src/pages/registration/Registration.jsx  *************/
import { useState } from "react";
// import "./RegisterScreen.css";
import SelectUser from "./SelectUser";
import RegistrationForm from "./RegistrationForm";
import AddDocuments from "../../components/AddDocuments";
import Review from "./Review";

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
  const [activeStep, setActiveStep] = useState(1);
  const [values, setValues] = useState(initialValues);
  const [currentStep, setCurrentStep] = useState(1);
  const [stepsCompleted, setStepsCompleted] = useState([true, true, false, false]);

  // const steps = ["Select User", "Registration Details", "Add Documents", "Review"];

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

  function handleNext() {
    if (activeStep < 4) {
      setActiveStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  }

  function handleBack() {
    if (activeStep > 1) {
      setActiveStep((prev) => prev - 1);
    }
  }

  function handleSubmit() {
    // TODO: submit to API
    console.log("Form submit", values);
  }

  const steps = [
    { step: 1, label: "Select User" },
    { step: 2, label: "Registration Details" },
    { step: 3, label: "Add Documents" },
    { step: 4, label: "Review" },
  ];

  const getStepTitle = () => {
    switch (activeStep) {
      case 1:
        return "";
      case 2:
        return "";
      case 3:
        return "Add Documents";
      case 4:
        return "Review Registration Details";
      default:
        return "";
    }
  };

  return (
    <div className="max-w-full mx-auto h-full flex flex-col">
      <h1 className="text-xl text-center font-semibold mb-4 text-gray-800 shrink-0">
        FPC Companies Act
      </h1>
      {/* Stepper */}
      <div className="flex items-center justify-center gap-8 mb-6 text-sm shrink-0">
        {steps.map((item, idx) => (
          <div key={item.step} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold ${item.step <= activeStep ? "bg-green-600" : "bg-gray-300"
                }`}
            >
              {item.step < activeStep ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                item.step
              )}
            </div>
            <span
              className={
                item.step <= activeStep ? "text-green-700 font-medium" : "text-gray-500"
              }
            >
              {item.label}
            </span>
            {idx < 3 && (
              <div className="w-10 h-px bg-gray-300 mx-1" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>

      <section className="bg-white rounded shadow-sm border flex-1 flex flex-col min-h-0">
        <div className="px-6 py-3 shrink-0">
          <h2 className="font-semibold text-gray-800">{getStepTitle()}</h2>
        </div>

        <div className="px-6 py-5 flex-1 flex flex-col overflow-y-auto">
          <div className="flex-1">
            {activeStep === 1 && <SelectUser />}
            {activeStep === 2 && (
              <RegistrationForm values={values} handleChange={handleChange} />
            )}
            {activeStep === 3 && (
              <AddDocuments
                imgConfig={imgConfig}
                pdfConfig={pdfConfig}
                onFileSelect={handleFileSelect}
              />
            )}
            {activeStep === 4 && <Review values={values} />}
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t mt-6 shrink-0">
            {activeStep > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-5 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50"
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2 rounded text-sm font-semibold bg-green-600 text-white hover:bg-green-700"
            >
              {activeStep === 4 ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
