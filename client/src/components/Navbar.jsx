import React from "react";
import StoreProvider from "@/app/StoreProvider";
import NavLogOutBtn from "./NavLogOutBtn";
import Link from "next/link";
import { Heart } from "@/icons/icon";

export default function Navbar() {
  return (
    <nav className=" flex flex-row h-[4.7rem] items-center justify-between px-4 sm:px-16 py-2 sticky top-0 left-0 w-full bg-black border-b border-[#4744458d] z-10">
      <Link href="/" className="text-3xl courgette tracking-wider flex flex-col relative ">
        
      Gtb4Love{" "} <Heart className=" h-2 w-2 absolute -top-[0.1rem] right-1/2 text-red-500 heartbeat" />
        <h3 className="text-base text-[#bd145b] tracking-normal font-bold cookie leading-4">
          
          Find Your Date
        </h3>{" "}
      </Link>

      <StoreProvider>
        <NavLogOutBtn />
      </StoreProvider>
    </nav>
  );
}
