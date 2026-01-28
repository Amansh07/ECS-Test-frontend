import React, { useEffect, useState, useRef } from "react";
import indianEmblem from "../../assets/indianEmblem.svg";
import { TextField } from "../../components/FormFields";
import mail from "../../assets/mail.svg";
import pass from "../../assets/pass.svg";
import reload from "../../assets/reload.svg";
import verify from "../../assets/verify.svg";
import Captcha from "../../components/Captcha";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import StatusModal from "../../components/StatusModal"; // <-- import StatusModal
import { login, generateCaptcha, verifyCaptchaApi } from "../../api/authApi";
import { loginValidationSchema } from "./validation";
import AuthService from "../../auth/AuthService";

export default function Login() {
  const [captchaAnswer, setCaptchaAnswer] = useState(null);
  const [userValue, setUserValue] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [captchaError, setCaptchaError] = useState(false);
  const [apiError, setApiError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [captchaId, setCaptchaId] = useState(null);
  const [firstNumber, setFirstNumber] = useState(null);
  const [secondNumber, setSecondNumber] = useState(null);

  const navigate = useNavigate();
  const mountedRef = useRef(true);

  // ---------------- Status Modal ----------------
  const [statusModal, setStatusModal] = useState({
    isOpen: false,
    status: false, // true = success, false = error
    message: "",
  });

  // ---------------- Redirect if logged in ----------------
  useEffect(() => {
    const token = AuthService.getAccessToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const isExpired = payload.exp * 1000 < Date.now();
        if (!isExpired) navigate("/member-management", { replace: true });
        else AuthService.logout();
      } catch {
        AuthService.logout();
      }
    }
  }, [navigate]);

  // ---------------- Base64 Decode Helper ----------------
  const decodeCaptchaNumber = (encoded) => {
    try {
      const decodedStr = atob(encoded);
      const digitsOnly = decodedStr.replace(/\D/g, "");
      return parseInt(digitsOnly, 10);
    } catch {
      return null;
    }
  };

  // ---------------- GET CAPTCHA ----------------
  const fetchCaptcha = async () => {
    try {
      const response = await generateCaptcha();
      const data = response.data;

      const decodedA = decodeCaptchaNumber(data.firstNumber);
      const decodedB = decodeCaptchaNumber(data.secondNumber);

      setCaptchaId(data.captchaId);
      setFirstNumber(decodedA);
      setSecondNumber(decodedB);
      setCaptchaAnswer(decodedA + decodedB);
      setIsCaptchaVerified(false);
      setCaptchaError(false);
      setUserValue("");
    } catch (error) {
      setStatusModal({
      isOpen: true,
      status: false, // false = error
      message: error?.message || "Failed to generate captcha.",
    });
    }
  };

  // ---------------- INITIAL CAPTCHA ON MOUNT ----------------
  useEffect(() => {
    if (!mountedRef.current) return;
    mountedRef.current = false;
    fetchCaptcha();
  }, []);

  // ---------------- CAPTCHA RELOAD ----------------
  useEffect(() => {
    if (refreshKey === 0) return;
    fetchCaptcha();
  }, [refreshKey]);

  // ---------------- VERIFY CAPTCHA ----------------
  const verifyCaptcha = async () => {
    if (!userValue || !captchaId) return;

    try {
      const response = await verifyCaptchaApi(captchaId, Number(userValue));
      if (response.success) {
        setIsCaptchaVerified(true);
        setCaptchaError(false);
      } else throw new Error("Wrong Captcha");
    } catch (error) {
      setCaptchaError(true);
      setIsCaptchaVerified(false);
      setStatusModal({
        isOpen: true,
        status: false,
        message: error?.message || "Unable to verify Captcha.",
      });
      setRefreshKey((k) => k + 1);
      setUserValue("");
    }
  };

  // ---------------- FORMIK ----------------
  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      if (!isCaptchaVerified) {
        setStatusModal({
          isOpen: true,
          status: false,
          message: "Please verify captcha before login.",
        });
        return;
      }

      try {
        const res = await login(values.username, values.password);
        AuthService.setTokens(res);

        // Show success StatusModal
        setStatusModal({
          isOpen: true,
          status: true,
          message: "Login successful! Redirecting...",
        });

        // Redirect after 3 seconds
        setTimeout(() => {
          setStatusModal({ isOpen: false, status: true, message: "" });
          navigate("/member-management", { replace: true });
        }, 3000);
      } catch (error) {
        setStatusModal({
          isOpen: true,
          status: false,
          message: error?.message || "Login failed. Please try again.",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      {/* Status Modal */}
      <StatusModal
        isOpen={statusModal.isOpen}
        onClose={() =>
          setStatusModal((prev) => ({ ...prev, isOpen: false }))
        }
        status={statusModal.status}
        message={statusModal.message}
      />

      {/* LOGIN FORM */}
      <div
        className="
        border-l-[9px] border-t-[9px] border-b-[9px] border-r-0
        rounded-tl-[40px] rounded-bl-[40px]
        p-4 flex flex-col
        bg-white
      "
      >
        {/* HEADER */}
        <div className="flex flex-col items-center justify-center gap-[10px] mt-[-10px] mb-[7px]">
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
            error={formik.errors.username}
            touched={formik.touched.username}
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
            error={formik.errors.password}
            touched={formik.touched.password}
            imageSrc={pass}
          />
        </div>

        {/* FORGOT */}
        <div className="h-[20px] flex justify-end items-center mt-[-10px] p-1">
          <p className="text-sm text-success cursor-pointer">
            <a href="/forgot-password"> Forgot Password </a>
          </p>
        </div>

        {/* CAPTCHA */}
        <div className="h-[55px] flex gap-[10px] py-[10px] mb-[5px]">
          <div className="h-[43px] rounded-lg overflow-hidden">
            <Captcha
              refreshTrigger={refreshKey}
              onVerify={() => { }}
              a={firstNumber}
              b={secondNumber}
            />
          </div>

          <button
            onClick={() => setRefreshKey((k) => k + 1)}
            className="
              w-[34px] h-[43px]
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
        <div className="flex gap-[10px] py-[10px]">
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
            {isCaptchaVerified && (
              <div className="w-[12px] h-[12px]">
                <img
                  src={verify}
                  alt="verify logo"
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <p className="font-medium text-sm">
              {isCaptchaVerified ? "Verified" : "Verify"}
            </p>
          </button>
        </div>

        {/* ACTION BUTTONS */}
        <div className="h-[50px] flex justify-end gap-[10px]">
          <button
            className="
            w-[102px]
            border border-primary
            rounded-lg
            font-medium text-[16px]
            text-primary
          "
          >
            Signup
          </button>

          <button
            type="button"
            onClick={formik.handleSubmit}
            disabled={!isCaptchaVerified || formik.isSubmitting}
            className="
              w-[92px]
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
