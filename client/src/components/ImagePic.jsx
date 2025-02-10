import React from "react";
import Image from "next/image";
import girl from "../../public/bla.jpg";
import { Heart, HeartBroken } from "@/icons/icon";

export default function ImagePic() {
  return (
    <div className="px-6">
      <div className="flex flex-row items-center justify-evenly min-h-[100dvh]">
        <div className="heartbreak fixed top-1/2 left-1/4 bg-[#A100FF40] rounded-full p-4">
          <HeartBroken className="w-12 h-12 text-[#E1306C]" />
        </div>

        <div className="mainImg h-full max-w-96 flex flex-col items-start justify-center ">
          <div className="mx-auto">
            <Image
              src={girl}
              alt="girlimage"
              className="rounded-2xl h-[55vh] w-auto aspect-[39/49] object-cover  brightness-75"
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

        <div className="heartbreak fixed top-1/2 right-1/4  bg-[#FF006A40] rounded-full p-4">
          <Heart className="w-12 h-12 text-[#E1306C]" />
        </div>
      </div>
    </div>
  );
}
