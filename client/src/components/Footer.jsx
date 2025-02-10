import Image from "next/image";
import React from "react";
import logo from "../assets/logo.png";
import Link from "next/link";
import git from "../assets/github.png";
import insta from "../assets/insta.png";
import xImg from "../assets/x.png";
import linkedIn from "../assets/linkdin.png";

function Footer() {
  return (
    <footer>
      <div className="flex flex-col md:flex-row items-start justify-between p-5 md:p-10 bg-gray-50">
        {/* Footer logo and description */}
        <div className="w-full md:w-1/3 mb-4 md:mb-0 ">
          <div className="text-center flex justify-center">
            <Image
              className="h-40 w-auto md:mx-0"
              src={logo}
              alt="virtucare-logo"
              loading="lazy"
            />
          </div>
          <div className="px-14 text-justify md:text-left">
            Our platform, Compresso.io, offers efficient image compression and
            conversion. Users can adjust quality percentages and scaling to
            optimize file size and clarity, making it easy to create
            high-quality, space-saving images.
          </div>
        </div>

        {/* Quick Links and Contact Info */}
        <div className="w-full md:w-1/2 flex flex-col md:flex-row md:justify-between ">
          <div className="w-full md:w-1/2 mb-4 md:mb-0 text-center md:text-left">
            <h3 className="text-xl font-semibold my-3">Quik Links</h3>
            <ul className="flex flex-col items-center md:justify-start md:block">
              <li className="hover:underline ">
                <Link href={"/about"} className="m-2 flex gap-2">
                  About
                </Link>
              </li>
              <li className="hover:underline">
                <Link href={"/contact"} className="m-2 flex gap-2">
                  contact
                </Link>
              </li>
              <li className="hover:underline">
                <Link href={"/contact"} className="m-2 flex gap-2">
                  help
                </Link>
              </li>
              <h3 className="text-xl font-semibold my-3 mt-4">Follow Us On</h3>
              {[
                {
                  href: "https://www.instagram.com/_rahmanhusain?igsh=MXVmNGN1cm42OHRpeQ==",
                  src: insta,
                  alt: "Instagram",
                },
                {
                  href: "https://www.linkedin.com/in/rahman-husain-45bb60237",
                  src: linkedIn,
                  alt: "LinkedIn",
                },
                {
                  href: "https://github.com/Rahmanhusain",
                  src: git,
                  alt: "Github",
                },
                {
                  href: "https://x.com/_rahmanhusain?t=crXDd9rbcatePjYDVk2Ltg&s=08",
                  src: xImg,
                  alt: "X",
                },
              ].map((link, ind) => (
                <li
                  key={ind}
                  className="underline md:hover:underline md:no-underline"
                >
                  <Link href={link.href} target="_blank" className="m-2 flex gap-2">
                    <Image
                      src={link.src}
                      className="h-6 w-auto"
                      alt={link.alt}
                    />
                    {link.alt}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full md:w-1/2 mb-4 md:mb-0 text-center md:text-left">
            <h3 className="text-xl font-semibold my-3">Get In Touch</h3>
            <ul>
              <li>rahmanhusain899@gmail.com</li>
              <li>+91 9205582846</li>
              <li className="text-hover">
                <Link
                  href={"https://rahmanportfolio.netlify.app/"}
                  target="_blank"
                >
                  rahmanportfolio.netlify.app
                </Link>
              </li>
            </ul>

            <h3 className="text-xl font-semibold my-3">Developed By</h3>
            <div className="flex flex-col items-center md:items-start gap-1 w-full ">
              {/*  <p className="text-xs">Designed and Developed with ❤️ by</p> */}
              <div className="flex space-x-3">
                <Link
                  href="https://github.com/Rahmanhusain"
                  className="flex flex-col items-center gap-1"
                  target="_blank"
                >
                  <Image
                    src={
                      "https://avatars.githubusercontent.com/u/157372566?v=4"
                    }
                    width={32}
                    height={32}
                    alt="profile"
                    className="rounded-full"
                  />
                  <p className="text-[0.6rem]">Rahmanhusain</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center md:justify-between justify-center">
        <div className="w-full md:w-4/12 px-4 mx-auto text-center">
          <div className="text-sm text-blueGray-500 font-semibold py-1">
            Copyright © <span id="get-current-year">2024</span> Compresso.io
            -All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
