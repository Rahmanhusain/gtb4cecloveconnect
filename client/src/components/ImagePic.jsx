import React from 'react'
import Image from 'next/image'
import girl from '../../public/bla.jpg'

export default function ImagePic() {
  return (
    <div className=''>
      <div className='flex flex-row items-center justify-evenly h-[100vh]'>

        <div className="heartbreak">
          left
        </div>
        <div className="mainImg h-full">
          <Image src={girl} alt='girlimage' className='rounded-2xl w-auto h-[50vh] brightness-75' />
          <h2 className='MervaleScript text-5xl mt-4'>Lisa</h2>
          <div className='flex flex-row items-center justify-start gap-4 '>
            <h3 className='bg-[#FF006Aa7] text-sm  p-1 px-4 rounded-full'>hello</h3>
            <h3>hello</h3>
            <h3>hello</h3>
          </div>
        </div>
        <div className="heartbreak">
          right
        </div>
      </div>
    </div>
  )
}
