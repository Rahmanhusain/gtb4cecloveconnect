"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { SetUser } from "@/lib/store/features/AuthSlice";
import { useRouter } from "next/navigation";
import { SetUserData } from "@/lib/store/features/UserSlice";
import Image from "next/image";
import { LoaderIcon2 } from "@/icons/icon";

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
        console.log(result.data, "verifytoekn run");
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
    <div className="w-auto">
      {user.email === null ? (
        <Link
          href="/login"
          className={`px-7 py-3 w-full md:w-auto ${isjwtverifying?'bg-gray-300':'text-white bg-primary hover:bg-hover hover:shadow-xl'} rounded-lg flex items-center gap-2 justify-center`}
        >
         {isjwtverifying?<LoaderIcon2 className="w-5 h-5 text-black animate-spin" />:"Login"}
        </Link>
      ) : (
        <Link
          href="/profile"
          className="flex items-center w-10 h-full gap-2 justify-center"
        >
          <Image className="rounded-full h-full ring-2 ring-primary ring-offset-2" loading="lazy" src={user.profilephotosrc} width={35} height={35} alt="logo" />
          <div className="md:hidden font-serif text-lg">Profile</div>
        </Link>
      )}
    </div>
  );
}

export default NavLogOutBtn;
