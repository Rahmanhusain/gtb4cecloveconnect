"use client";
import Link from "next/link";
import React, { useState, useEffect, use } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { SetUser } from "@/lib/store/features/AuthSlice";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SetUserData } from "@/lib/store/features/UserSlice";
import { setHasNotif } from "@/lib/store/features/NotifDotSlice";
import Image from "next/image";
import { HeartStrokedIcon} from "@/icons/icon";
import Notification from "./Notification";
import Notify from "./Notify";
import Loading from "./Loading";

function NavLogOutBtn() {
  const router=useRouter();
  const dispatch = useAppDispatch();
  const pathname = usePathname(); // Get the current pathname
  const searchParams = useSearchParams(); // Get the current search params
  const user = useAppSelector((state) => state.Authenticator);
  const userdata = useAppSelector((state) => state.UserData);
  const newnotif = useAppSelector((state) => state.NotifData);
  const [isjwtverifying, setisjwtverifying] = useState(true);
  const [openNotification, setopenNotification] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const res = await fetch("/api/verifytoken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();

     
      if (result.status === 201) {
        dispatch(
          SetUser({
        email: result.data.email,
        name: result.data.Profilename,
        profilephotosrc: result.data.profilephotosrc,
          })
        );
        if (result.data.matched.length > result.data.notififlastindex) {
          dispatch(setHasNotif(true));
        }
        dispatch(SetUserData(result.data));

        // Check if any of the required fields are empty or null
        if (
          !result.data.gender ||
          !result.data.keywords.key1 ||
          !result.data.keywords.key2 ||
          !result.data.keywords.key3 ||
          !result.data.Instagram.Username ||
          !result.data.bio
        ) {
          router.push("/profile");
        } else {
          router.push("/match");
        }
      }
      setisjwtverifying(false);
    };

    if (!user.email) {
      verifyToken();
    } else {
      console.log("user.email is not null");
    }
  }, [pathname, searchParams, user.email, dispatch, userdata]); // Re-run when pathname or searchParams change
  if(isjwtverifying){
    return (
     <Loading/>
    )
  }

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
        <div className="flex flex-row items-center justify-evenly text-lg gap-6 w-fit cookie h-full">
          <button
            onClick={() => {
              setopenNotification(true);
              dispatch(setHasNotif(false));
            }}
            className="flex items-center w-fit h-full gap-2 py-2 justify-center relative"
          >
            <HeartStrokedIcon className="w-10 h-10 text-white" />
            {newnotif.hasNotif && (
              <>
                <span className="absolute w-3 h-3 bg-red-700 rounded-full ring-2 ring-black top-4 right-0"></span>
                <Notify />
              </>
            )}
          </button>
          <Link
            href="/profile"
            className="flex items-center w-fit h-full gap-2 py-[0.88rem] justify-center"
          >
            <Image
              className="rounded-full object-contain h-full w-full aspect-square ring-[0.1875rem] ring-offset-[0.1875rem] ring-offset-black ring-[#bd145b]"
              loading="lazy"
              src={user.profilephotosrc}
              width={35}
              height={35}
              alt="logo"
            />
          </Link>
        </div>
      )}

      {openNotification && (
        <Notification
          email={userdata.email}
          password={userdata.password}
          userid={userdata.userid}
          matched={userdata.matched}
          setopenNotification={setopenNotification}
        />
      )}
    </div>
  );
}

export default NavLogOutBtn;
