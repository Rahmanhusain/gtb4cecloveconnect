import React from 'react'

export default function Navbar() {
  return (
    <div className=' flex flex-row items-center justify-between px-16 py-4'>
      <h1 className='text-5xl cookie  drop-shadow-[4px_4px_4px_#ff0000]'>
        Find Your Date
      </h1>
      <div className='flex flex-row items-center justify-evenly w-1/6'>
        <div className="profile">
          {/* <img src="#" alt="#" /> */}
          profile

        </div>
        <div className="notify">
          bell
        </div>

      </div>
    </div>
  )
}
