"use client";
import { CrossIcon, HamburgerIcon } from "@/icons/icon";
import Image from "next/image";
import Link from "next/link";
import logo from "../assets/logo.png";
import { useRef, useState, useEffect } from "react";
import NavLogOutBtn from "./NavLogOutBtn";
import StoreProvider from "@/app/StoreProvider";

function Header() {
  const navref = useRef(null);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (navref.current && !navref.current.contains(event.target)) {
        setHide(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navref]);

  return (
    <div className="w-full border border-b-gray-200 text-black h-20 items-center md:justify-between justify-center px-6 md:py-4 md:px-10 bg-transparent fixed top-0 backdrop-blur-xl z-10 flex ">
      <div className="logo w-full flex items-center">
        <Image src={logo} alt="" height={40} className="h-full w-auto" />
        <h2 className="w-full ml-2 text-2xl text-black font-serif">
          Compresso.io
        </h2>
        <span
          className="md:hidden relative -right-3"
          onClick={() => {
            setHide(!hide);
          }}
        >
          <HamburgerIcon />
        </span>
      </div>
      {/* mobile nav */}
      <nav
        ref={navref}
        className={`w-screen flex flex-col md:flex-row items-center justify-evenly py-5 text-black h-auto md:h-full shadow-md bg-white rounded-b-2xl md:rounded-none md:bg-transparent backdrop-blur-3xl z-10 md:static absolute top-0 left-0 gap-4 md:hidden ${
          hide ? "translate-y-0" : "-translate-y-full"
        } transition-transform duration-300`}
      >
        <span
          className="absolute top-2 right-2 cursor-pointer md:hidden"
          onClick={() => {
            setHide(!hide);
          }}
        >
          <CrossIcon size={24} className="text-hover" />
        </span>
        <Link
          href="/"
          className="font-serif text-lg"
          onClick={() => {
            setHide(!hide);
          }}
        >
          Home
        </Link>
        <Link
          href="/about"
          className="font-serif text-lg"
          onClick={() => {
            setHide(!hide);
          }}
        >
          About
        </Link>

        <Link
          href="/contact"
          className="font-serif text-lg"
          onClick={() => {
            setHide(!hide);
          }}
        >
          Contact
        </Link>
        <Link
          href="/help"
          className="font-serif text-lg mb-2"
          onClick={() => {
            setHide(!hide);
          }}
        >
          Help
        </Link>
        <StoreProvider>
          <NavLogOutBtn />
        </StoreProvider>
      </nav>
   {/*    //desktop nav */}
      <nav className=" hidden md:w-fit gap-5 md:flex items-center justify-evenly text-black h-auto md:h-full">
        <Link href="/" className="font-serif text-lg">
          Home
        </Link>
        <Link href="/about" className="font-serif text-lg">
          About
        </Link>

        <Link href="/contact" className="font-serif text-lg">
          Contact
        </Link>
        <Link href="/help" className="font-serif text-lg">
          Help
        </Link>
        <StoreProvider>
          <NavLogOutBtn />
        </StoreProvider>
      </nav>
    </div>
  );
}

export default Header;
