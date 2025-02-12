'use client'
import React from 'react'
import Image from 'next/image'
import { CrossIcon } from '@/icons/icon'

export default function Notification() {
    

    const [notify, setnotify] = React.useState(true);

    const handlecross = () => {
        setnotify(false);
    }
    if (!notify) return null;

    return (
        <div id='notification' className='fixed  top-0 left-0 w-full z-10 h-full bg-[#000e] p-4 pt-16'>
            <CrossIcon className='w-6 h-6 text-gray-300 fixed top-4 right-4 cursor-pointer z-20' onClick={handlecross} />

            <h1 className='text-gray-300 text-3xl cookie absolute top-4'>Notifications</h1>
            <div className='flex w-full bg-[#222] p-4 rounded-2xl my-2 gap-3'>
                <div className=' rounded-full w-14 aspect-square h-14'>
                    <Image src='/imgs/bla.jpg' alt='girlimage' width={300} height={500} className='rounded-full w-full h-full object-cover brightness-75' />
                </div>
                <div className='text-gray-300 flex flex-col justify-between w-full'>
                    <h1 className='text-sm w-full'>You have a new match with Lisa, Check out their full profile</h1>
                    <h2 className='text-xs w-full text-gray-400 text-right'>Click here to view</h2>
                </div>

            </div>
        </div>
    )
}
