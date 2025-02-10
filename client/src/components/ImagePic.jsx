import React from 'react'
import Image from 'next/image'
import girl from '../../public/image.png'

export default function ImagePic() {
  return (
    <div className='flex flex-row items-center h-full justify-evenly'>
      <div className="heartbreak">
        left
      </div>
      <div className="mainImg aspect-4/3">
        <Image src={girl} alt='girlimage' width={400} height={500}/>
      </div>
      <div className="heartbreak">
        right
      </div>
    </div>
  )
}
