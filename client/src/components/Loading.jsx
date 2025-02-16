import { Heart } from '@/icons/icon'
import React from 'react'

export default function Loading() {
  return (
    <div className='flex flex-col items-center justify-center z-40 bg-black fixed inset-0'>
      <Heart className=" h-12 w-12 text-red-500 heartbeat" />
      <p className='text-center mt-2 flex items-center  gap-2'>
      <span className="dot dot1"><Heart className='w-2 h-2 text-red-500'/></span><span className="dot dot2"><Heart className='w-2 h-2 text-red-500'/></span><span className="dot dot3"><Heart className='w-2 h-2 text-red-500'/></span>
     
      </p>
      <p className='cookie text-lg mt-4'>Please Wait.....</p>
    </div>
  )
}
