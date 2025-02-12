"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { SetUser } from "@/lib/store/features/AuthSlice";
import { useRouter } from "next/navigation";
import { SetUserData } from "@/lib/store/features/UserSlice";
import Image from "next/image";
import { HeartStrokedIcon, LoaderIcon2 } from "@/icons/icon";

function NavLogOutBtn() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  // State to track token verification result
  const user = useAppSelector((state) => state.Authenticator);
  const [isjwtverifying, setisjwtverifying] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const res = await fetch("/api/verifytoken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();

      setisjwtverifying(false);
      if (result.status === 201) {
        console.log(result.data, "verifytoken run");
        dispatch(
          SetUser({
            email: result.data.email,
            name: result.data.Profilename,
            profilephotosrc: result.data.profilephotosrc,
          })
        );
        dispatch(SetUserData(result.data));
        /* setShow(true); */
      }
    };
    if (user.email === null) {
      /*  console.log("store already contain data"); */
      verifyToken();
    }
  }, [router]);

  return (
    <div className="w-auto h-full">
      {user.email === null ? (
        <div className="flex flex-row items-center justify-evenly text-lg gap-3 w-fit cookie h-full ">
          <Link
            href="/register"
            className=" py-1 px-2 rounded-lg border-2 border-[#bd145b] w-20 text-center"
          >
            SignUp
          </Link>
          <Link
            href="/login"
            className="py-1 px-2 rounded-lg border-2 border-[#bd145b] w-20 text-center"
          >
            Login
          </Link>
        </div>
      ) : (
        <div className="flex flex-row items-center justify-evenly text-lg gap-4 w-fit cookie h-full">
          <Link
            href="/mymatches"
            className="flex items-center w-fit h-full gap-2 py-2 justify-center relative"
          >
              <HeartStrokedIcon className="w-10 h-10 text-white" />
              <span className="absolute w-3 h-3 bg-red-700 rounded-full ring-2 ring-black top-4 right-0"></span>
          </Link>
          <Link
            href="/profile"
            className="flex items-center w-fit h-full gap-2 py-2.5 justify-center"
          >
            <Image
              className="rounded-full h-full w-full aspect-square border"
              loading="lazy"
              src={user.profilephotosrc}
              width={35}
              height={35}
              alt="logo"
            />
          </Link>
        </div>
      )}
    </div>
  );
}

export default NavLogOutBtn;
