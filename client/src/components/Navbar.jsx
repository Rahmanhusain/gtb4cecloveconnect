import React from "react";
import StoreProvider from "@/app/StoreProvider";
import NavLogOutBtn from "./NavLogOutBtn";

export default function Navbar() {
  return (
    <nav className=" flex flex-row h-[4.7rem] items-center justify-between px-4 sm:px-16 py-2 sticky top-0 left-0 w-full bg-black border-b border-[#474445a6] z-10">
      <h1 className="text-3xl sm:text-4xl cookie ">Find Your Date</h1>

      <StoreProvider>
        <NavLogOutBtn />
      </StoreProvider>
    </nav>
  );
}
