"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Heart, HeartBroken } from "@/icons/icon";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { SetUser } from "@/lib/store/features/AuthSlice";
import { SetUserData } from "@/lib/store/features/UserSlice";
import { setHasNotif } from "@/lib/store/features/NotifDotSlice";
import { set } from "mongoose";
import Loading from "./Loading";
import Bganim from "./Bganim";

export default function ImagePic() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.Authenticator);
  const userdata = useAppSelector((state) => state.UserData);
  const [index, setindex] = React.useState(0);
  const [matches, setMatches] = useState([]);
  const [show, setshow] = useState(false);

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
        dispatch(SetUserData(result.data));
        setshow(true);
      } else {
        router.push("/login");
      }
    };
    if (user.email === null) {
      verifyToken();
    } else {
    }
  }, []);

  useEffect(() => {
    const retireveuser = async () => {
      if (!userdata || !userdata.email) return; // Prevent API call with null data

      const res = await fetch("/api/getusers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userdata.email,
          password: userdata.password,
        }),
      });

      const result = await res.json();
      setMatches(result.data);
      setshow(true);
    };

    retireveuser();
  }, [userdata]); // Run when userdata updates

  const requestMatch = async (userid1, userid2) => {
    const res = await fetch("/api/match", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userdata.email,
        password: userdata.password,
        userid1,
        userid2,
      }),
    });
    const result = await res.json();
    if (result.matched) {
      dispatch(setHasNotif(true));
    }
  };

  const fadeout = () => {
    const girlImage = document.querySelector(".girlImage");

    girlImage.classList.add("scale-90");
    girlImage.classList.add("opacity-0");

    setTimeout(() => {
      if (index === matches.length - 1) {
        setindex(0);
      } else {
        setindex(index + 1);
      }
      girlImage.classList.remove("scale-90");
      girlImage.classList.remove("opacity-0");
    }, 500);
  };

  if (!show) {
    return <Loading />;
  }

  return (
    <div className="px-6">
      <Bganim opacity="opacity-50" />
      <div
        id="hearts-alpaca"
        className="hearts fixed bottom-0 left-0 opacity-50 sm:opacity-100"
      >
        <div className="heart"></div>
        <div className="heart"></div>
        <div className="heart"></div>
        <div className="heart"></div>
      </div>
      {matches.length !== 0 && (
        <div className="flex flex-row py-10 justify-evenly min-h-[100dvh] ">
          <div
            id="heartbreakIcon"
            className="heartbreak hidden sm:flex fixed top-1/2 md:left-[20%] left-[10%] bg-[#A100FF40] rounded-full cursor-pointer p-4"
            onClick={fadeout}
          >
            <HeartBroken className="w-12 h-12 text-[#E1306C]" />
          </div>

          <div className="mainImg h-full  max-w-96 flex flex-col items-start justify-center girlImage  transition-all duration-500 ease-in-out">
            <div className="mx-auto">
              <div className="rounded-2xl h-[55vh] w-auto aspect-[39/49] relative">
                <Image
                  id="girlImg"
                  src={matches[index]?.profilephotosrc || "/imgs/image.png"}
                  alt="girlimage"
                  width={300}
                  height={500}
                  className="rounded-2xl w-full h-full object-cover brightness-75"
                />
                <div
                  id="heartbreakIcon"
                  className="heartbreak flex sm:hidden  absolute bottom-0 left-0 z-10  bg-[#A100FF40] rounded-full cursor-pointer p-4"
                  onClick={fadeout}
                >
                  <HeartBroken className="w-8 h-8 text-[#E1306C]" />
                </div>

                <div
                  id="heartIcon"
                  className="heartbreak flex sm:hidden  absolute bottom-0 right-0 z-10 bg-[#FF006A40] rounded-full p-4"
                  onClick={fadeout}
                >
                  <Heart className="w-8 h-8 text-[#E1306C]" />
                </div>
              </div>
              <h2 className="cookie text-4xl mt-4 italic">
                {matches[index]?.Profilename || "Lisa"}
              </h2>
              <div className="flex flex-row items-center flex-wrap justify-start gap-2 courgette mt-2">
                {matches[index]?.keywords.key1 && (
                  <h3 className="bg-[#FF006Aa7] text-xs  py-1.5 px-4 rounded-full tracking-widest">
                    {matches[index]?.keywords.key1}
                  </h3>
                )}
                {matches[index]?.keywords.key2 && (
                  <h3 className="bg-[#FF006Aa7] text-xs  py-1.5 px-4 rounded-full tracking-widest">
                    {matches[index]?.keywords.key2}
                  </h3>
                )}
                {matches[index]?.keywords.key3 && (
                  <h3 className="bg-[#FF006Aa7] text-xs  py-1.5 px-4 rounded-full tracking-widest">
                    {matches[index]?.keywords.key3}
                  </h3>
                )}
              </div>
            </div>
            <h2 className="cookie text-4xl mt-8 mb-2 italic">Bio</h2>
            <p className="courgette w-full  text-xs text-gray-300 tracking-wider">
              {matches[index]?.bio}
            </p>
          </div>

          <div
            id="heartIcon"
            className="heartbreak hidden sm:flex  fixed top-1/2 md:right-[20%] right-[10%] bg-[#FF006A40] rounded-full cursor-pointer p-4"
            onClick={() => {
              requestMatch(userdata.userid, matches[index].userid);
              fadeout();
            }}
          >
            <Heart className="w-12 h-12 text-[#E1306C]" />
          </div>
        </div>
      )}
      {matches.length === 0 && (
        <div className="flex flex-col items-center justify-center w-full min-h-[calc(100dvh-4.7rem)] z-40 bg-black">
          <Heart className=" h-12 w-12 text-red-500 heartbeat" />
          <p className="text-center mt-2 flex items-center  gap-2">
            <span className="dot dot1">
              <Heart className="w-2 h-2 text-red-500" />
            </span>
            <span className="dot dot2">
              <Heart className="w-2 h-2 text-red-500" />
            </span>
            <span className="dot dot3">
              <Heart className="w-2 h-2 text-red-500" />
            </span>
          </p>
        </div>
      )}
      {/* <div
        id="hearts-alpaca"
        className="hearts fixed bottom-0 left-0 opacity-50 sm:opacity-100"
      >
        <div className="heart"></div>
        <div className="heart"></div>
        <div className="heart"></div>
        <div className="heart"></div>
      </div> */}
    </div>
  );
}
