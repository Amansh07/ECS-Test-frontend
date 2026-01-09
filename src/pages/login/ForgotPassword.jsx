import React, { useState } from "react";
import { useRef,useEffect } from "react";
// import indianEmblem from "../../assets/indianEmblem.svg";
import { TextField } from "../../components/FormFields";
// import mail from "../../assets/mail.svg";
import pass from "../../assets/pass.svg";
import shield from "../../assets/shield.svg";
import incorrect from "../../assets/incorrect.svg";
import reload from "../../assets/reload.svg";
import verify from "../../assets/verify.svg";
import info from "../../assets/info.svg"
import * as Yup from "yup";
// import Captcha from "../../components/Captcha";

export default function ForgotPassword() {
//   const [captchaAnswer, setCaptchaAnswer] = useState(null);
  const [userValue, setUserValue] = useState("");
  const[userInput,setUserInput] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const passwordValidationSchema = Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
  const [isRightPattern,setIsRightPattern] = useState(false);

  const verifyOTP = () => {
    if (!userValue) return;
    setIsRunning(false);
    setTimerAgain();
    if (Number(userValue) === 123456) {
      setIsOTPVerified(true);
      setOtpError(false);
      alert("OTP Verified");
    } else {
      setOtpError(true);
      setIsOTPVerified(false);
      alert("Wrong OTP");
      setRefreshKey((k) => k + 1);
      setUserValue("");
    }
  };

  const handlePasswordValidation = async (e) =>{
    const value = e.target.value;
    setPassword(value);
    console.log("value: "+value)
    // Validate the single value directly
    try {
      await passwordValidationSchema.validate(value);
      setIsRightPattern(true); // Clear error if valid
    } catch (err) {
      setIsRightPattern(false);// Set the custom error message from Yup
    }
  }

  const initialSeconds = 60;
  const [seconds, setSeconds] = useState(initialSeconds);
  const [firstTimeOTP, setFirstTimeOTP] = useState (true);
//   const [timerCompleted, setTimerCompleted] = useState (false);
  
//   const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

//   useEffect(() => {
//     // Exit early if timer reaches 0
//     if (seconds <= 0)
//         {
//             return;
//         } 
         
//     // Set up the interval
//     if(isRunning)
//     { const timerId = setInterval(() => {
//       setSeconds((prev) => prev - 1);
//     }, 1000);

//     // Clean up the interval on unmount or before the next effect run
//     return () => clearInterval(timerId);}
//   }, [seconds]); // Re-run effect when seconds change

  // Use useRef to store the interval ID without causing re-renders when it changes
  const intervalRef = useRef(null);

const setTimerAgain= () =>{
    setSeconds(initialSeconds);

}

  useEffect(() => {
   
    if (isRunning && seconds > 0) {

        //  if (seconds <= 0)
        // {
        //     // setIsRunning(!isRunning);
        //     return;
        // } 
      // Use the functional update form for setSeconds to get the correct previous value
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => 
        {
            if(prevSeconds <= 1){
        setIsRunning(false);
        clearInterval(intervalRef.current);
        setTimerAgain();
        return 0;

    }
    return prevSeconds - 1;
        }
        
            );
      }, 1000);
    }

    

    // Cleanup function to clear the interval when the component unmounts or the effect re-runs
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning,seconds]); // Re-run effect only when isRunning state changes

  const startPauseHandler = () => {
    if(seconds>0)
    setIsRunning(true);


    setFirstTimeOTP(false);

  };

  const startPauseHandlerNotFirstTime = () => {
    if(seconds>0)
    setIsRunning(true);

    //setFirstTimeOTP(false);

  };

  const matchPassword = () =>{
    if(password===cpassword)
    {
        setPasswordMatch(true);
        alert("Matched!")
    }
    else{
        alert("Password and Confirm Password does not match!");
    }
  }

//   const resetHandler = () => {
//     setIsRunning(false);
//     setSeconds(0);
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//     }
//   };


  return (
    <div className="
      max-w-[395px] max-h-[524px] min-w-[395px]
      border-l-[9px] border-t-[9px] border-b-[9px] border-r-0
      rounded-tl-[40px] rounded-bl-[40px]
      p-6 flex flex-col
      bg-grey-100
    ">
      {/* HEADER */}
      {/* <div className="h-[140px] flex flex-col items-center justify-center gap-[20px] mt-[-20px]">
        <img src={indianEmblem} alt="indian Emblem logo" />
        <p className="text-center font-medium text-[22px] text-primary">
          Welcome to FPO Shakti
        </p>
      </div> */}

      {/* INPUTS */}
      {!isOTPVerified && (<div>
        <TextField
          required
          name="uname"
          placeholder="Username/Email Address/Mobile"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          imageSrc={shield}
          disabled={isRunning}
        />
        {/* <TextField
          required
          placeholder="Password"
          value={""}
          imageSrc={pass}
        /> */}
      </div>)}

            {/* Timer Display */}
        { isRunning &&  ( <div className="h-[20px] flex justify-end items-center mt-[-10px] mb-[10px] p-1">
        <p className="flex items-center gap-1 text-sm text-error justify-end">
          <img src={info} alt="incorrect logo" />
          {seconds} sec
        </p>
            </div>)}

      {/* ERROR + FORGOT */}
      {/* <div className="h-[20px] flex justify-between items-center mt-[-10px] mb-[10px] p-1">
        <p className="flex items-center gap-1 text-sm text-error">
          <img src={incorrect} alt="incorrect logo" />
          Incorrect Password
        </p>

        <p className="text-sm text-success cursor-pointer">
          Forgot Password
        </p>
      </div> */}

      {/* CAPTCHA IMAGE */}
      {/* <div className="h-[67px] flex gap-[10px] py-[10px]">
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
            setIsOTPVerified(false);
            setOtpError(false);
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
      </div> */}

      {/* SEND OTP */}
     {!isOTPVerified && (<div className="mb-4 w-full">
        {(!isRunning && firstTimeOTP)&& (<button className="
          h-[48px] w-full
          border border-grey
          rounded-lg
          font-medium text-[16px]
          text-grey
        
          "
          onClick={startPauseHandler}
          disabled={userInput==="" || userInput===null || userInput===undefined}
        >
          Send OTP
        </button>)}

        {(!firstTimeOTP)&& (<button className="
          h-[48px] w-full
          border border-grey
          rounded-lg
          font-medium text-[16px]
          text-grey
        
          "
          onClick={startPauseHandlerNotFirstTime}
          disabled= {isRunning}
        >
          Resend OTP
        </button>)}
        </div>)}

      {/* OTP + VERIFY */}
      {(!isOTPVerified && isRunning) && (<div className="h-[67px] flex gap-[10px] py-[10px]">
        <div className="w-[232px] h-[43px] rounded-lg">
          <TextField
            required
            placeholder="Enter Value"
            value={userValue}
            onChange={(e) => setUserValue(e.target.value)}
            // disabled={isOTPVerified}
          />
        </div>

        <button
          onClick={verifyOTP}
          disabled={userValue==="" || userValue===null || userValue===undefined}
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
      </div>)}
      {isOTPVerified && (
        <div>
        <TextField
          required
          name="password"
          placeholder="Enter Password"
          value={password}
          imageSrc={pass}
          onChange={handlePasswordValidation}
        />
        <div className="h-[20px] flex justify-end items-center mt-[10px] mb-[20px] p-1">
        {isRightPattern && (<p className="flex items-center gap-1 text-sm text-error justify-end text-grey-500 items-flex-start">
          <img src={info} alt="info" />
          Min 8 characters. Use mix of letters,numbers and symbols to keep your password secure.
        </p>)}
        {!isRightPattern && (<p className="flex items-center gap-1 text-sm text-error justify-end text-red-600 items-flex-start">
          <img src={incorrect} alt="incorrect logo" />
          Min 8 characters. Use mix of letters,numbers and symbols to keep your password secure.
        </p>)}
            </div>
        <TextField
          required
          name="cpassword"
          placeholder="Confirm Password"
          value={cpassword}
          imageSrc={pass}
          onChange={(e) => setCPassword(e.target.value)}
        /> 
      </div>

       

      )}

      {/* ACTION BUTTONS */}
      {isOTPVerified && (<div className="h-[50px] flex justify-end gap-[10px]">
        <button className="
           h-[48px] w-full
          border border-grey
          rounded-lg
          font-medium text-[16px]
          text-grey
        
        " onClick={matchPassword}>
          Reset Password
        </button>
        </div>)}
      {/* <div className="h-[50px] flex justify-end gap-[10px]">
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
          disabled={!isOTPVerified}
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
      </div> */}
    </div>
  );
}
