import { CrossIcon, MiniloadIcon, TickIcon } from "@/icons/icon";
import React, { useState, useEffect, useRef } from "react";
import WarningModal from "./WarningModal";
import { useRouter } from "next/navigation";
/* import { useAppDispatch } from "@/lib/hooks/hooks";
import { SetUser } from "@/lib/store/features/AuthSlice"; */


const OTPhandle = ({ setIsOtpOpen, propemailRef,isforget }) => {
  const Router = useRouter();
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [resendTime, setResendTime] = useState(140);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const firstInputRef = useRef(null);
  const [closeanim, setcloseanim] = useState(false);
  const [isWarnOpen, setisWarnOpen] = useState(false);
  const [isvarifying, setisvarifying] = useState(false);
  const [isResend, setisResend] = useState(false);
  const [isverified, setisverified] = useState(false);
  const messageref = useRef(null);
  /* const dispatch=useAppDispatch() */

  useEffect(() => {
    let timer;
    if (resendTime > 0) {
      timer = setInterval(() => {
        setResendTime((prev) => prev - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
    }
    return () => clearInterval(timer);
  }, [resendTime]);

  async function ReSendOTP(email) {
    try {
      const response = await fetch("/api/register/sentotp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });
      const result = await response.json();
      /* console.log(result); */
      return result.status == 201 ? true : false;
    } catch (error) {
      console.error("Fetch error:", error);
      return false;
    } finally {
      setIsResendDisabled(false);
      setisResend(false);
    }
  }

  const VerifyOtp = async (otp) => {
    try {
     /*  console.log('i run POST') */
      const res = await fetch("/api/register/verifyotp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: propemailRef.email,name:propemailRef.name, otp: otp ,password:propemailRef.password,enrollmentno:propemailRef.enrollmentno}),
      });
      const result = await res.json();
     /*  console.log(result); */
      return result.status;
    } catch (error) {
      console.log(error);
    }
  };

  const VerifyOtpforget = async (otp) => {
    try {
     /*  console.log('i run PUT') */
      const res = await fetch("/api/register/verifyotp", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: propemailRef.email, otp: otp ,password:propemailRef.password}),
      });
      const result = await res.json();
      /* console.log(result); */
      return result.status;
    } catch (error) {
      console.log(error);
    }
  };

  const warn = (messege) => {
    setisWarnOpen(true);
    messageref.current = messege;
  };

  const handleChange = async (element, index) => {
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
    if (
      newOtp.every((val) => val !== "" && val !== undefined && val !== null)
    ) {
      /* console.log(newOtp.join("")); */
      setisvarifying(true);
      const status = (isforget?await VerifyOtpforget(newOtp.join("")) : await VerifyOtp(newOtp.join("")));
      status === 201
        ?(alert(isforget?'Password Reset Successfully,redirecting to Login':'Registration Successful, redirecting to home page'),isforget?Router.push("/login"):Router.push("/"))
        : (setisvarifying(false),warn("Wrong OTP or might be expire Try Again !"));
      /* setisvarifying(false); */
      setOtp(new Array(4).fill(""));
    }
  };

  const handleKeyDown = (element, index, event) => {
    if (event.key === "Backspace" && !element.value) {
      if (element.previousSibling) {
        element.previousSibling.focus();
      }
    } else if (!/[0-9]/.test(event.key) && event.key !== "Backspace") {
      event.preventDefault();
    }
  };

  const handleResend = async () => {
    setIsResendDisabled(true);
    setisResend(true);
    const ResendOk = await ReSendOTP(propemailRef.email);
    ResendOk
      ? setResendTime(140)
      : warn("Failed to Resend OTP try again ignore if send!");
    // logic to resend OTP
  };

  return (
    <div className="fixed top-0 left-0 right-0 min-h-full bg-transparent flex items-center justify-center backdrop-blur-xl">
      <div
        className={`bg-[#322e2fad] p-6 rounded-lg shadow-xl max-w-sm w-full flex flex-col items-center m-4 relative ${
          !closeanim ? "animate-popIn" : "animate-popOut"
        } ${closeanim && "scale-0"}`}
      >
        <span
          className="absolute top-2 right-2 cursor-pointer"
          onClick={() => {
            setcloseanim(!closeanim);
            setTimeout(() => {
              setIsOtpOpen(false);
            }, 300);
          }}
        >
          <CrossIcon size={25} />
        </span>

        {isverified ? (
          <TickIcon />
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4 text-[#db4784]">Enter OTP</h2>
            <div className="flex space-x-2">
              {!isvarifying ? (
                otp.map((data, index) => (
                  <input
                    className="w-12 h-12 text-center text-text bg-background rounded-md focus:outline-none focus:ring-2 ring-[#db47856e] focus:border-transparent"
                    type="text"
                    maxLength="1"
                    key={index}
                    id={index}
                    value={otp[index] || ""}
                    autoComplete="off"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoFocus={index === 0}
                    onChange={(e) => handleChange(e.target, index)}
                    onFocus={(e) => e.target.select()}
                    onKeyDown={(e) => handleKeyDown(e.target, index, e)}
                    ref={index === 0 ? firstInputRef : null}
                  />
                ))
              ) : (
                <MiniloadIcon className="w-7 h-7 text-[#db4784] animate-spin-fast" />
              )}
            </div>
            <button
              className={`mt-4 text-[#db4784] ${
                !isResendDisabled ? "hover:cursor-pointer" : ""
              } flex items-center gap-2 text-sm courgette`}
              onClick={handleResend}
              disabled={isResendDisabled}
            >
              {/* Resend OTP {isResendDisabled && `in ${resendTime}s`} */}
              {isResend ? (
                <>
                  <MiniloadIcon className="h-5 w-5 text-[#db4784] animate-spin" />
                  Resending Please wait
                </>
              ) : (
                <>
                  Resend OTP
                  {isResendDisabled &&
                    ` in ${Math.floor(resendTime / 60)}:${String(
                      resendTime % 60
                    ).padStart(2, "0")}s`}
                </>
              )}
            </button>
          </>
        )
        }

      </div>
      {isWarnOpen && (
        <WarningModal
          messege={messageref.current}
          setisWarnOpen={setisWarnOpen}
        />
      )}
    </div>
  );
};

export default React.memo(OTPhandle);
