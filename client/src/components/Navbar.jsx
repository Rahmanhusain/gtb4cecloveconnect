import React from "react";
import StoreProvider from "@/app/StoreProvider";
import NavLogOutBtn from "./NavLogOutBtn";
import Link from "next/link";
import { Heart } from "@/icons/icon";

export default function Navbar() {
  return (
    <nav className=" flex flex-row h-[4.7rem] items-center justify-between px-4 sm:px-16 py-2 sticky top-0 left-0 w-full bg-black border-b border-[#4744458d] z-10">
      <Link href="/" className="text-3xl cookie flex flex-col relative ">
        Find Your Date{" "}
        <h3 className="text-base text-[#bd145b] font-bold leading-4">
          GTB4Love
        </h3>{" "}
        <Heart className=" h-2 w-2 absolute -top-[0.1rem] left-[0.7rem] text-red-500 heartbeat" />
      </Link>

      <StoreProvider>
        <NavLogOutBtn />
      </StoreProvider>
    </nav>
  );
}
