import { BellIcon } from '@/icons/icon'
import React from 'react'

export default function Navbar() {
  return (
    <div className=' flex flex-row items-center justify-between px-16 py-4 fixed top-0 left-0 w-full'>
      <h1 className='text-5xl cookie '>
        Find Your Date
      </h1>
      <div className='flex flex-row items-center justify-evenly w-1/6'>
        <div className="notify">
          <BellIcon className='w-8 h-8 text-white'/>
        </div>
        <div className="profile">
          {/* <img src="#" alt="#" /> */}
          <BellIcon className='w-8 h-8 text-white'/>
          

        </div>

      </div>
    </div>
  )
}
