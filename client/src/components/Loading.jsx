import { Heart } from '@/icons/icon'
import React from 'react'

export default function Loading() {
  return (
    <div className='flex items-center justify-center w-screen h-screen z-40 bg-black fixed top-0 left-0'>
      <Heart className=" h-12 w-12 text-red-500 heartbeat" />
    </div>
  )
}
