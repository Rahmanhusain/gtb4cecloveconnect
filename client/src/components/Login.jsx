"use client";
import CustomLink from "./CustomLink";
import { BackIcon, MiniloadIcon } from "@/icons/icon";
import { EyeClose, EyeOpen } from "@/icons/icon";
import { useRef, useState } from "react";
import WarningModal from "./WarningModal";
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function Login() {
  const [isCfmPassVisible, setIsCfmPassVisible] = useState(false);
  const [isWarnOpen, setisWarnOpen] = useState(false);
  const [isloginsuccess, setisloginsuccess] = useState(false);
  const messageref = useRef(null);
 /*  const dispatch=useAppDispatch(); */
  const router=useRouter();

  const sendloginReq = async (email, password,userType ) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password ,userType:userType}),
      });
      const result = await response.json();
      /* console.log(result); */
      return result;
    } catch (error) {
      console.error("Fetch error:", error);
      return result;
    } finally {
    }
  };

  const Submit = async (e) => {
    e.preventDefault();
    setisloginsuccess(true);
    const formData = new FormData(e.target);
    const result = await sendloginReq(
      formData.get("email"),
      formData.get("password"),
    );
    if (result.status === 401) {
      messageref.current = "Wrong Password Try Again !";
      setisWarnOpen(true);
      setisloginsuccess(false);
    } else if (result.status === 404) {
      messageref.current = "User Not found!";
      setisWarnOpen(true);
      setisloginsuccess(false);
    } else if (result.status === 500) {
      messageref.current = "Something went Wrong Try Again";
      setisWarnOpen(true);
      setisloginsuccess(false);
    } else {
      console.log("login successful");
    /*   dispatch(SetUser({ email: result.data.email, name: result.data.name })); */
      /* setisloginsuccess(false)  */     
      alert("Login Successfull welcome back!"); 
      router.push("/");
    }
    
  };
  return (
    <section className="bg-transparent">
      <CustomLink
        href={"/"}
        className="absolute left-3 top-3 text-text flex items-center text-sm hover:cursor-pointer"
      >
        <BackIcon size={30} />
      </CustomLink>

      <div className="flex flex-col items-center justify-center mt-10 sm:mt-0 px-6 py-8 mx-auto sm:min-h-screen lg:py-0 animate-dropped">
        <CustomLink
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-text"
        >
{/*           <Image className="w-16 h-auto" src={logo} alt="logo" />
 */}        </CustomLink>
        <div className="w-full bg-background rounded-lg shadow-xl  md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-text *: md:text-2xl">
              Login To Your Account
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
                  autoComplete="email"
                  className=" border border-gray-200 text-text rounded-lg outline-none focus:border-primary block w-full p-2.5"
                  placeholder="name@company.com"
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
                  type={!isCfmPassVisible ? "password" : "text"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="border-gray-200 border text-text rounded-lg outline-none focus:border-primary block w-full p-2.5"
                  required
                />
                <span
                  className="absolute bottom-2.5 right-2 cursor-pointer"
                  onClick={() => setIsCfmPassVisible(!isCfmPassVisible)}
                >
                  {isCfmPassVisible ? <EyeOpen /> : <EyeClose />}
                </span>
              </div>
              <div className="flex items-center justify-between">
                
                <CustomLink
                  href="/forgotpassword"
                  className="text-sm font-medium text-hover hover:underline"
                >
                  Forgot password?
                </CustomLink>
              </div>
              <button
                type="submit"
                disabled={isloginsuccess ? true : false}
                className={`w-full  ${
                  isloginsuccess ? "text-black border" : " text-white bg-primary  hover:bg-hover"
                }  font-medium rounded-lg text-sm px-5 py-2.5 flex justify-center items-center gap-2 cursor-pointer`}
              >
                {isloginsuccess && (
                  <MiniloadIcon className="w-4 h-4 text-text animate-spin-fast" />
                )}
                {isloginsuccess ? "Please Wait" : "Login"}
              </button>
              <div className="text-sm font-light text-gray-600">
                Don&apos;t have an account yet?{" "}
                <CustomLink
                  href="/register"
                  className="font-medium text-primary hover:underline"
                >
                  Register
                </CustomLink>
              </div>
            </form>
          </div>
        </div>
      </div>
      {isWarnOpen && (
        <WarningModal
          messege={messageref.current}
          setisWarnOpen={setisWarnOpen}
        />
      )}
    </section>
  );
}
