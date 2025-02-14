import React from 'react'
import Image from 'next/image'

export default function page() {
  return (
    <div className="mainImg h-full  max-w-96 flex flex-col items-start justify-center girlImage  transition-all duration-500 ease-in-out">
    <div className="mx-auto">
      <div className="rounded-2xl h-[55vh] w-auto aspect-[39/49] relative">
        <Image
          id="girlImg"
          src={matches[index]?.profilephotosrc || "/imgs/image.png"}
          alt="girlimage"
          width={300}
          height={500}
          className="rounded-2xl w-full h-full object-cover brightness-75"
        />
       

        
      </div>
      <h2 className="cookie text-4xl mt-4 italic">
        {matches[index]?.Profilename || "Lisa"}
      </h2>
      <div className="flex flex-row items-center flex-wrap justify-start gap-2 courgette mt-2">
        {matches[index]?.keywords.key1 && (
          <h3 className="bg-[#FF006Aa7] text-xs  py-1.5 px-4 rounded-full tracking-widest">
            {matches[index]?.keywords.key1}
          </h3>
        )}
        {matches[index]?.keywords.key2 && (
          <h3 className="bg-[#FF006Aa7] text-xs  py-1.5 px-4 rounded-full tracking-widest">
            {matches[index]?.keywords.key2}
          </h3>
        )}
        {matches[index]?.keywords.key3 && (
          <h3 className="bg-[#FF006Aa7] text-xs  py-1.5 px-4 rounded-full tracking-widest">
            {matches[index]?.keywords.key3}
          </h3>
        )}
      </div>
    </div>
    <h2 className="cookie text-4xl mt-8 mb-2 italic">Bio</h2>
    <p className="courgette w-full  text-xs text-gray-300 tracking-wider">
      {matches[index]?.bio}
    </p>
  </div>
  )
}
