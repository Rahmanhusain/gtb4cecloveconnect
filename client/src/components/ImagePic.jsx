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
        <div className="mainImg h-full w-1/4 flex flex-col items-start justify-center">
          <Image src={girl} alt='girlimage' className='rounded-2xl w-auto h-[50vh] brightness-75' />
          <h2 className='cookie text-5xl mt-4 italic'>Lisa</h2>
          <div className='flex flex-row items-center justify-start gap-2 courgette'>
            <h3 className='bg-[#FF006Aa7] text-sm  p-1 px-4 rounded-full'>hello</h3>
            <h3 className='bg-[#FF006Aa7] text-sm  p-1 px-4 rounded-full'>hello</h3>
            <h3 className='bg-[#FF006Aa7] text-sm  p-1 px-4 rounded-full'>hello</h3>
          </div>

          <h2 className='cookie text-5xl mt-8 italic'>Bio</h2>
          <p className='courgette italic w-full text-sm'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa modi dolor quisquam tenetur voluptatibus vero labore consequatur quasi quibusdam ipsa? Perferendis animi amet temporibus veniam sequi consectetur tempora quisquam culpa cumque repellat? Molestias iste omnis perspiciatis fugiat quidem porro dolor delectus eveniet eligendi cupiditate assumenda dignissimos autem, aspernatur nulla illum.
          </p>
        </div>
        <div className="heartbreak">
          right
        </div>
      </div>
    </div>
  )
}
