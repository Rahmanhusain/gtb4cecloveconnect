"use client";
import { BackIcon, EyeClose, EyeOpen, MiniloadIcon } from "@/icons/icon";
import CustomLink from "./CustomLink";
import { useRef, useState } from "react";
import OTPhandle from "./OTPhandle";
import { useAppDispatch } from "@/lib/hooks/hooks";
import { SetUser } from "@/lib/store/features/AuthSlice";
import WarningModal from "./WarningModal";
import Image from "next/image";

export default function Register() {
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [isPassVisible, setIsPassVisible] = useState(false); // Track password visibility
  const [isCfmPassVisible, setIsCfmPassVisible] = useState(false); // Track confirm password visibility
  const [colormatch, setcolormatch] = useState(true);
  const [isSending, setisSending] = useState(false);
  const [isWarnOpen, setisWarnOpen] = useState(false);

  const dispatch = useAppDispatch();
  const passRef = useRef(null);
  const cfmPassRef = useRef(null);

  const propemailRef = useRef({ email: null, password: null, usertype: null ,name:null});
  const messageref = useRef(null);

  async function SendOTP(email) {
    try {
      const response = await fetch("/api/register/sentotp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email,isforget:false }),
      });
      if (!response.ok) {
        console.error("Server error:", response.status);
        return response.status;
      }
      const result = await response.json();
      /* console.log(result); */
      return result.status;
    } catch (error) {
      console.error("Fetch error:", error);
      return result.status;
    } finally {
      setisSending(false);
    }
  }

  const Submit = async (e) => {
    e.preventDefault();
    if (passRef.current.value === cfmPassRef.current.value && !isSending) {
      setisSending(true);
      const formData = new FormData(e.target);
      /* const data = Object.fromEntries(formData); */

      const status = await SendOTP(formData.get("email"));
     /*  console.log(status); */
      if (status === 201) {
        setIsOtpOpen(true);
        propemailRef.current.email = formData.get("email");
        propemailRef.current.name = formData.get("name");
        propemailRef.current.password = formData.get("confirmpassword");
      } else if (status == 409) {
        messageref.current = "User already exist Login instead!";
        setisWarnOpen(true);
      }else if (status == 504) {
        messageref.current = "Server time Out please try Again !";
        setisWarnOpen(true);
      } else {
        messageref.current = "Something Went Wrong try again!";
        setisWarnOpen(true);
      }
      
    }
  };

  return (
    <section className="bg-transparent py-8">
      <CustomLink
        href={"/"}
        className="absolute left-3 top-3 text-text flex items-center text-sm hover:cursor-pointer"
      >
        <BackIcon size={30} /> Back to Home
      </CustomLink>
      <div className="flex flex-col items-center justify-center mt-10 sm:mt-0 px-6 py-8 mx-auto sm:min-h-screen lg:py-0 animate-dropped">
        <CustomLink
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-text"
        >
{/*           <Image className="w-16 h-auto" loading="lazy" src={logo} alt="logo" />
 */}        </CustomLink>
        <div className="w-full bg-background rounded-lg shadow-xl md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1
              className="text-xl font-bold leading-tight tracking-tight text-text md:text-2xl"
              onClick={() => {
                dispatch(SetUser("sabeena kjhatun"));
              }}
            >
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={Submit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-text"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="border border-gray-200 placeholder-gray-400 outline-none text-text text-sm rounded-lg focus:border-primary block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-text"
                >
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="border border-gray-200 placeholder-gray-400 outline-none text-text text-sm rounded-lg focus:border-blue-500 block w-full p-2.5"
                  placeholder="John Doe"
                  pattern="^[A-Za-z\s]+$"
                  title="Name should not contain numbers."
                  required
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-text"
                >
                  Password
                </label>
                <input
                  ref={passRef}
                  type={!isPassVisible ? "password" : "text"}
                  autoComplete="off"
                  name="password"
                  id="password"
                  title="password should be atleast 8 digits and one special character."
                  pattern="(?=.*[\W_]).{2,}"
                  placeholder="••••••••"
                  className=" border border-gray-200 placeholder-gray-400 outline-none text-text text-sm rounded-lg focus:border-primary block w-full p-2.5"
                  required
                />
                <span
                  className="absolute bottom-2.5 right-2 cursor-pointer"
                  onClick={() => setIsPassVisible(!isPassVisible)}
                >
                  {isPassVisible ? <EyeOpen /> : <EyeClose />}
                </span>
              </div>
              
              <div className="relative">
                <label
                  htmlFor="confirmpassword"
                  className="block mb-2 text-sm font-medium text-text"
                >
                  Confirm password
                </label>
                <input
                  ref={cfmPassRef}
                  type={!isCfmPassVisible ? "password" : "text"}
                  autoComplete="off"
                  name="confirmpassword"
                  id="confirmpassword"
                  pattern="(?=.*[\W_]).{2,}"
                  title="password should be atleast 8 digits and one special character."
                  placeholder="••••••••"
                  onChange={(e) => {
                    passRef.current.value === e.target.value
                      ? setcolormatch(true)
                      : setcolormatch(false);
                  }}
                  onFocus={(e) => {
                    passRef.current.value === e.target.value
                      ? setcolormatch(true)
                      : setcolormatch(false);
                  }}
                  className={`border ${
                    colormatch ? "border-gray-200" : "border-red-500"
                  } focus:border-blue-500  ${
                    colormatch
                      ? "focus:border-green-500"
                      : "focus:border-red-500"
                  } placeholder-gray-400 outline-none text-text text-sm rounded-lg block w-full p-2.5`}
                  required
                />
                <span
                  className="absolute bottom-2.5 right-2 cursor-pointer"
                  onClick={() => setIsCfmPassVisible(!isCfmPassVisible)}
                >
                  {isCfmPassVisible ? <EyeOpen /> : <EyeClose />}
                </span>
              </div>

              <button
                type="submit"
                className={`w-full text-text ${
                  !isSending
                    ? "bg-primary hover:bg-hover focus:ring-4 focus:outline-none focus:ring-primary text-white"
                    : "border"
                } font-medium rounded-lg text-sm px-5 py-[0.65rem] flex items-center justify-center gap-2`}
              >
                {isSending && (
                  <MiniloadIcon className="w-4 h-4 text-text animate-spin-fast" />
                )}
                {!isSending ? "Create An Account" : `Please Wait`}
              </button>
              <div className="text-sm font-light text-gray-400">
                Already have an account?{" "}
                <CustomLink
                  href="/login"
                  className="font-medium text-primary hover:underline"
                >
                  Login here
                </CustomLink>
              </div>
            </form>
          </div>
        </div>
      </div>
      {isOtpOpen && (
        <OTPhandle
          setIsOtpOpen={setIsOtpOpen}
          propemailRef={propemailRef.current}
          isforget={false}
        />
      )}
      {isWarnOpen && (
        <WarningModal
          messege={messageref.current}
          setisWarnOpen={setisWarnOpen}
        />
      )}
    </section>
  );
}
