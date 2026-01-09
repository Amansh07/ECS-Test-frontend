import React, { useState } from "react";
import indianEmblem from "../../assets/indianEmblem.svg";
import { TextField } from "../../components/FormFields";
import mail from "../../assets/mail.svg";
import pass from "../../assets/pass.svg";
import incorrect from "../../assets/incorrect.svg";
import reload from "../../assets/reload.svg";
import verify from "../../assets/verify.svg";
import Captcha from "../../components/Captcha";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [captchaAnswer, setCaptchaAnswer] = useState(null);
  const [userValue, setUserValue] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [captchaError, setCaptchaError] = useState(false);
  const naviagte = useNavigate();

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

  return (
    <div className="
      max-w-[395px] max-h-[524px]
      border-l-[9px] border-t-[9px] border-b-[9px] border-r-0
      rounded-tl-[40px] rounded-bl-[40px]
      p-6 flex flex-col
      bg-white
    ">
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
          name="cin"
          placeholder="Username/Email Address"
          value={""}
          imageSrc={mail}
        />
        <TextField
          required
          placeholder="Password"
          value={""}
          imageSrc={pass}
        />
      </div>

      {/* ERROR + FORGOT */}
      <div className="h-[20px] flex justify-between items-center mt-[-10px] mb-[10px] p-1">
        <p className="flex items-center gap-1 text-sm text-error">
          <img src={incorrect} alt="incorrect logo" />
          Incorrect Password
        </p>

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
          disabled={!isCaptchaVerified}
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
  );
}
