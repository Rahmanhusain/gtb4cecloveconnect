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
  const router = useRouter();

  const sendloginReq = async (email, password, userType) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          userType: userType,
        }),
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
      formData.get("password")
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
    <section className="bg-transparent cookie">
      <CustomLink
        href={"/"}
        className="absolute left-3 top-3 text-text flex items-center text-sm hover:cursor-pointer"
      >
        <BackIcon size={30} />
      </CustomLink>

      <div className="flex flex-col items-center justify-center px-3 sm:px-6 mx-auto min-h-[calc(100dvh-4.6rem)]   animate-dropped">
        <CustomLink
          href="/"
          className="flex items-center text-2xl font-semibold text-text"
        >
          {/*           <Image className="w-16 h-auto" src={logo} alt="logo" />
           */}{" "}
        </CustomLink>
        <div className="w-full bg-background rounded-lg shadow-xl  md:mt-0 sm:max-w-md xl:p-0 ">
          <div className=" space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-2xl text-[#db4784] font-bold leading-tight tracking-tight md:text-2xl">
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
                  className="bg-transparent courgette text-sm border-2 border-[#717071bf] placeholder-gray-400 outline-none rounded-full block w-full p-2.5"
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
                  className="bg-transparent courgette text-sm border-2 border-[#717071bf] placeholder-gray-400 outline-none text-text rounded-full focus:border-primary block w-full p-2.5"
                  required
                />
                <span
                  className="absolute bottom-2.5 right-2 cursor-pointer"
                  onClick={() => setIsCfmPassVisible(!isCfmPassVisible)}
                >
                  {isCfmPassVisible ?  <EyeOpen className='text-[#928b92]' /> : <EyeClose className='text-[#928b92]' />}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <CustomLink
                  href="/forgotpassword"
                  className="text-base font-medium text-[#f6588d] hover:underline"
                >
                  Forgot password?
                </CustomLink>
              </div>
              <button
                type="submit"
                disabled={isloginsuccess ? true : false}
                className={`w-full text-text ${
                  !isloginsuccess
                    ? "bg-[#ff006aa7] focus:outline-none focus:ring-primary text-white"
                    : "bg-[#f71b772f]"
                } font-medium rounded-full text-lg px-5 py-[0.5rem] flex items-center justify-center gap-2`}
              >
                {isloginsuccess && (
                  <MiniloadIcon className="w-5 h-5 text-text animate-spin" />
                )}
                {isloginsuccess ? "Please Wait" : "Login"}
              </button>
              <div className="text-lg font-light text-gray-50">
                Don&apos;t have an account yet?{" "}
                <CustomLink
                  href="/register"
                  className="font-medium text-primary hover:underline text-[#db4784]"
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
