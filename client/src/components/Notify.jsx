import { Heart } from '@/icons/icon'
import React from 'react'

export default function Notify() {
  return (
    <div className='msgtip w-16 absolute -bottom-[3rem] z-50  py-2 bg-[#ff006a] rounded-full flex flex-row gap-2 items-center justify-center'>
        <Heart className='w-6 h-6 text-white'/>
        {/* <p>1</p> */}
    </div>
  )
}
