"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CrossIcon } from "@/icons/icon";

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
 */      setnotification(result.data);
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

  return (
    <div
      id="notification"
      className="fixed top-0 left-0 w-full z-10 h-full bg-[#000e] p-4 pt-16"
    >
      <CrossIcon
        className="w-6 h-6 text-gray-300 fixed top-4 right-4 cursor-pointer z-20"
        onClick={handlecross}
      />

      <h1 className="text-gray-300 text-3xl cookie absolute top-4">
        Notifications
      </h1>

      {notification?.map((item, index) => (
        <div
          key={index}
          className="flex w-full bg-[#222] p-4 rounded-2xl my-2 gap-3 items-center"
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
              You have a new match with {item.Profilename}, Check out their full
              profile
            </h1>
            <h2 className="text-xs w-full text-gray-400 text-left">
              Click here to view
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
}
