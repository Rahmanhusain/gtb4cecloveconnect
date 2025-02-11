'use client';
import React from "react";
import Image from "next/image";
import { Heart, HeartBroken } from "@/icons/icon";

const fadeout=()=> {
  document.querySelector(".girlImage").classList.add('scale-90');
  document.querySelector(".girlImage").classList.add('opacity-0');
  setInterval(() => {
    document.querySelector(".girlImage").classList.add('hidden');
  }, 2000);
};

const fadein=()=> {
  document.querySelector(".girlImage").classList.add('scale-100');
  document.querySelector(".girlImage").classList.add('opacity-1');
  setInterval(() => {
    document.querySelector(".girlImage").classList.add('flex');
  }, 2000);
};



export default function ImagePic() {


  return (
    <div className="px-6">
      <div className="flex flex-row items-center justify-evenly min-h-[100dvh] ">
        <div id="heartbreakIcon" className="heartbreak fixed top-1/2 left-1/4 bg-[#A100FF40] rounded-full cursor-pointer p-4" onClick={fadeout}>
          <HeartBroken className="w-12 h-12 text-[#E1306C]" />
        </div>

        <div className="mainImg h-full max-w-96 flex flex-col items-start justify-center girlImage  transition-all duration-1000 ease-in-out">
          <div className="mx-auto ">
            <Image id="girlImg"
              src='/bla.jpg'
              alt="girlimage"
              width={300}
              height={500}
              className=" rounded-2xl h-[55vh] w-auto aspect-[39/49] object-cover  brightness-75"
            />
            <h2 className="cookie text-4xl mt-4 italic">Lisa</h2>
            <div className="flex flex-row items-center justify-start gap-2 MervaleScript">
              <h3 className="bg-[#FF006Aa7] text-sm  p-1 px-4 rounded-full tracking-widest">
                hello
              </h3>
              <h3 className="bg-[#FF006Aa7] text-sm  p-1 px-4 rounded-full tracking-widest">
                hello
              </h3>
              <h3 className="bg-[#FF006Aa7] text-sm  p-1 px-4 rounded-full tracking-widest">
                hello
              </h3>
            </div>
          </div>

          <h2 className="cookie text-4xl mt-8 mb-2 italic">Bio</h2>
          <p className="courgette w-full  text-xs text-gray-300 tracking-wider">
            Kind-hearted and always up for a good conversation. I love trying
            new things, reading, and spending time with loved ones. Looking for
            someone who values honesty, empathy, and trust. If you're looking
            for a partner in crime who will support and encourage you, let's
            connect.
          </p>
        </div>

        <div id="heartIcon" className="heartbreak fixed top-1/2 right-1/4  bg-[#FF006A40] rounded-full p-4">
          <Heart className="w-12 h-12 text-[#E1306C]" />
        </div>

      </div>
      <div id="hearts-alpaca" className="hearts fixed bottom-0 left-0 opacity-50 sm:opacity-100">
        <div className="heart"></div>
        <div className="heart"></div>
        <div className="heart"></div>
        <div className="heart"></div>
      </div>
    </div>
  );
}
