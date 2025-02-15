"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CrossIcon } from "@/icons/icon";
import Link from "next/link";
import { Heart } from "@/icons/icon";

export default function Notification({
  email,
  password,
  userid,
  matched,
  setopenNotification,
}) {
  const [notification, setnotification] = useState([]);
  const handlecross = () => {
    setopenNotification(false);
  };

  useEffect(() => {
    const retireveuser = async () => {
      const res = await fetch("/api/getusers", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          matched: matched,
        }),
      });

      const result = await res.json();
      /*       setHasNotif(false);
       */ setnotification(result.data);
    };
    retireveuser();
  }, []);

  useEffect(() => {
    const updateNotification = async () => {
      const res = await fetch("/api/match", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          userid: userid,
        }),
      });
      const result = await res.json();
      /*   console.log(result, "updateNotification run"); */
    };
    updateNotification();
  }, []);

  useEffect(() => {
      document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      id="notification"
      className="fixed top-0 left-0 w-full z-10 h-full bg-[#000e]  py-16"
    >
      <CrossIcon
        className="w-6 h-6 text-gray-300 fixed top-4 right-4 cursor-pointer z-20"
        onClick={handlecross}
      />

      <h1 className="text-gray-300 text-3xl cookie absolute top-4 px-3">
        Notifications
      </h1>
      <div className="overflow-y-scroll custom-scrollbar h-[calc(100vh-4rem)] px-3">
        {notification?.map((item, index) => (
          <Link
            href={`/userprofile/${item.userid}`}
            key={index}
            className="flex w-full bg-[#222] p-4 rounded-2xl my-2 gap-3 items-center"
            onClick={handlecross}
          >
            <div className="rounded-full w-14 aspect-square h-14">
              <Image
                src={item.profilephotosrc}
                alt="profile image"
                width={300}
                height={500}
                className="rounded-full w-full h-full object-cover brightness-75"
              />
            </div>
            <div className="text-gray-300 flex flex-col w-full">
              <h1 className="text-sm w-full">
                You have a new match with {item.Profilename}, Check out their
                full profile
              </h1>
              <h2 className="text-xs w-full text-gray-400 text-left">
                Click here to view
              </h2>
            </div>
          </Link>
        ))}
        {notification.length === 0 && (
          <div className="flex flex-col items-center justify-center w-full h-full z-40 bg-black">
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
      </div>
    </div>
  );
}
