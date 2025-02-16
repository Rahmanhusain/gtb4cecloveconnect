import { Heart } from "@/icons/icon";
import Image from "next/image";
import Link from "next/link";


function Footer() {
  return (
    <footer className="text-center px-3 bg-[#050505] border-t border-[#3434349f] py-6">
      {/* Logo Section */}
      <Link href="/" className="text-3xl courgette tracking-wider flex flex-col relative ">
        
      Gtb4Love{" "} <Heart className=" h-2 w-2 absolute -top-[0.1rem] right-1/2 text-red-500 heartbeat" />
        <h3 className="text-base text-[#bd145b] tracking-normal font-bold cookie leading-4">
          
          Find Your Date
        </h3>{" "}
      </Link>

      {/*developer section */}
      <div className="flex flex-col items-center mt-3 gap-1 w-full text-gray-500 text-base cookie">
        <p className="">Designed and Developed with ❤️ by</p>
        <div className="flex space-x-3">
          <Link
            href="https://rahmanfolio.vercel.app/"
            className="flex flex-col items-center gap-1"
            target="_blank"
          >
            <Image
              src={"https://avatars.githubusercontent.com/u/157372566?v=4"}
              width={32}
              height={32}
              alt="profile"
              className="rounded-full"
            />
            <p className="text-sm">Rahman husain</p>
          </Link>

          <Link
            href="https://www.linkedin.com/in/aditya-roy-323aa124b/"
            className="flex flex-col items-center gap-1"
            target="_blank"
          >
            <Image
              src={"https://avatars.githubusercontent.com/u/134770934?v=4"}
              width={32}
              height={32}
              alt="profile"
              className="rounded-full"
            />
            <p className="text-sm">Aditya-tech1</p>
          </Link>
        </div>
      </div>

      {/* Copyright and Policies Section */}
      <span className="block text-sm mt-2 text-center text-gray-500">
        Copyright © 2025 GTB4Love. All Rights Reserved. Please review our{" "}
        <Link
          href="https://flowbite.com"
          className="text-purple-600 hover:underline"
        >
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link
          href="https://tailwindcss.com"
          className="text-purple-600 hover:underline"
        >
          Terms and Conditions
        </Link>
        .
      </span>

      {/* Any Query? Contact Us Section */}
      <div className="mt-2 text-xs text-gray-500">
        <p>
          Any Query,suggetion or report?{" "}
          <Link href="/contact" className="text-purple-600 hover:underline">
            Contact Us
          </Link>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
