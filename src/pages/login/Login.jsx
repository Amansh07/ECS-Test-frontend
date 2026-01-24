import React, { useState } from "react";
import indianEmblem from "../../assets/indianEmblem.svg";
import { TextField } from "../../components/FormFields";
import mail from "../../assets/mail.svg";
import pass from "../../assets/pass.svg";
import reload from "../../assets/reload.svg";
import verify from "../../assets/verify.svg";
import Captcha from "../../components/Captcha";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import ValidationModal from "../../components/ValidationModal";
import { login } from "../../api/authApi";

// Validation Schema
const loginValidationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export default function Login() {
  const [captchaAnswer, setCaptchaAnswer] = useState(null);
  const [userValue, setUserValue] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [captchaError, setCaptchaError] = useState(false);
  const [apiError, setApiError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const verifyCaptcha = () => {
    if (!userValue) return;

    if (Number(userValue) === captchaAnswer) {
      setIsCaptchaVerified(true);
      setCaptchaError(false);
      alert("Captcha Verified");
    } else {
      setCaptchaError(true);
      setIsCaptchaVerified(false);
      alert("Wrong Captcha");
      setRefreshKey((k) => k + 1);
      setUserValue("");
    }
  };

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      if (!isCaptchaVerified) {
        setApiError("Please verify captcha before login.");
        setShowModal(true);
        return;
      }

      try {
        await login(values.username, values.password);

        // Successful login → redirect
        navigate("/member-management");
      } catch (error) {
        // API error is returned from createApiClient
        setApiError(error?.message || "Login failed. Please try again.");
        setShowModal(true);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      {/* Modal for showing API / Validation errors */}
      <ValidationModal
        isOpen={showModal}
        title="Login Error"
        message={apiError}
        onClose={() => setShowModal(false)}
      />

      <div
        className="
        max-w-[395px] max-h-[524px]
        border-l-[9px] border-t-[9px] border-b-[9px] border-r-0
        rounded-tl-[40px] rounded-bl-[40px]
        p-6 flex flex-col
        bg-white
      "
      >
        {/* HEADER */}
        <div className="h-[140px] flex flex-col items-center justify-center gap-[20px] mt-[-20px]">
          <img src={indianEmblem} alt="indian Emblem logo" />
          <p className="text-center font-medium text-[22px] text-primary">
            Welcome to FPO Shakti
          </p>
        </div>

        {/* INPUTS */}
        <div>
          <TextField
            required
            name="username"
            placeholder="Username/Email Address"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            imageSrc={mail}
          />
          <TextField
            required
            type="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            imageSrc={pass}
          />
        </div>

        {/* ERROR + FORGOT */}
        <div className="h-[20px] flex justify-between items-center mt-[-10px] mb-[10px] p-1">
          {formik.touched.username && formik.errors.username && (
            <p className="flex items-center gap-1 text-sm text-error">
              {formik.errors.username}
            </p>
          )}

          {formik.touched.password && formik.errors.password && (
            <p className="flex items-center gap-1 text-sm text-error">
              {formik.errors.password}
            </p>
          )}

          <p className="text-sm text-success cursor-pointer">
            <a href="/forgot-password"> Forgot Password </a>
          </p>
        </div>

        {/* CAPTCHA IMAGE */}
        <div className="h-[67px] flex gap-[10px] py-[10px]">
          <div className="w-[303px] h-[43px] rounded-lg overflow-hidden">
            <Captcha
              refreshTrigger={refreshKey}
              onVerify={(answer) => setCaptchaAnswer(answer)}
            />
          </div>

          <button
            onClick={() => {
              setRefreshKey((k) => k + 1);
              setUserValue("");
              setIsCaptchaVerified(false);
              setCaptchaError(false);
            }}
            className="
              w-[34px] h-[40px]
              rounded-lg
              border border-primary
              flex items-center justify-center
            "
          >
            <div className="w-[12px] h-[12px]">
              <img
                src={reload}
                alt="reload logo"
                className="w-full h-full object-contain"
              />
            </div>
          </button>
        </div>

        {/* CAPTCHA INPUT + VERIFY */}
        <div className="h-[67px] flex gap-[10px] py-[10px]">
          <div className="w-[232px] h-[43px] rounded-lg">
            <TextField
              required
              placeholder="Enter Value"
              value={userValue}
              onChange={(e) => setUserValue(e.target.value)}
              disabled={isCaptchaVerified}
            />
          </div>

          <button
            onClick={verifyCaptcha}
            disabled={isCaptchaVerified}
            className="
              w-[105px] h-[40px]
              rounded-lg
              border border-primary
              flex items-center justify-center gap-[8px]
              px-2
              text-primary
              disabled:opacity-50
            "
          >
            <div className="w-[12px] h-[12px]">
              <img
                src={verify}
                alt="verify logo"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="font-medium text-sm">Verify</p>
          </button>
        </div>

        {/* ACTION BUTTONS */}
        <div className="h-[50px] flex justify-end gap-[10px]">
          <button className="
            h-[48px] w-[102px]
            border border-primary
            rounded-lg
            font-medium text-[16px]
            text-primary
          ">
            Signup
          </button>

          <button
            type="button"
            onClick={formik.handleSubmit}
            disabled={!isCaptchaVerified || formik.isSubmitting}
            className="
              h-[48px] w-[92px]
              bg-primary
              text-white
              text-[16px]
              font-medium
              rounded-lg
              disabled:opacity-50
            "
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
}
