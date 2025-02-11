import { BellIcon } from '@/icons/icon'
import React from 'react'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className=' flex flex-row items-center justify-between px-4 sm:px-16 py-4 sticky top-0 left-0 w-full bg-black border-b border-[#474445a6] z-10'>
      <h1 className='text-3xl sm:text-4xl cookie '>
        Find Your Date
      </h1>
      <div className='flex flex-row items-center justify-evenly gap-3 w-fit hidden'>
        <div className="notify">
          <BellIcon className='w-7 h-7 text-white' />
        </div>
        <div className="profile">
          {/* <img src="#" alt="#" /> */}
          <BellIcon className='w-7 h-7 text-white' />
        </div>

      </div>
      <div className='flex flex-row items-center justify-evenly gap-3 w-fit '>
        <Link href="/register" className='p-2 px-8 rounded bg-[#bd145b]'>SignUp</Link>
      </div>

    </nav>
  )
}
