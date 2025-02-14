import React from 'react'
import Image from 'next/image'
import { Instagram, WhatsAppIcon } from '@/icons/icon'
import Link from 'next/link'
import Loading from '@/components/Loading'

export default function page() {
    return (
        

        <div className="mainImg m-auto h-full  max-w-96 flex flex-col items-start justify-center girlImage  transition-all duration-500 ease-in-out">
            <div className="mx-auto">
                <h1 className="cookie text-4xl mt-4 italic">
                    Lisa's Profile
                </h1>
                <div className="rounded-2xl h-[55vh] w-auto aspect-[39/49] relative">
                    <Image
                        id="girlImg"
                        src={"/imgs/image.png"}
                        alt="girlimage"
                        width={300}
                        height={500}
                        className="rounded-2xl w-full h-full object-cover brightness-75"
                    />

                </div>
                <h2 className="cookie text-4xl mt-4 italic">
                    {"Lisa"}
                </h2>
                <div className="flex flex-row items-center flex-wrap justify-start gap-2 courgette mt-2">

                    <h3 className="bg-[#FF006Aa7] text-xs  py-1.5 px-4 rounded-full tracking-widest">
                        hello
                    </h3>


                    <h3 className="bg-[#FF006Aa7] text-xs  py-1.5 px-4 rounded-full tracking-widest">
                        hello
                    </h3>


                    <h3 className="bg-[#FF006Aa7] text-xs  py-1.5 px-4 rounded-full tracking-widest">
                        hello
                    </h3>

                </div>
            </div>
            <h2 className="cookie text-4xl mt-8 mb-2 italic">Bio</h2>
            <p className="courgette w-full  text-xs text-gray-300 tracking-wider">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus facere exercitationem excepturi repellat est, eaque quidem deserunt recusandae fugit, ipsam nostrum repudiandae enim. Illo non error sapiente sint deserunt veritatis dignissimos suscipit fugit doloremque quidem? Optio, voluptas corrupti eaque corporis ut dolorem quia vitae accusantium vero, odit eos, repellat molestiae?
            </p>
            <h2 className="cookie text-4xl mt-8 mb-2 italic">Social Links</h2>
            <div className='flex flex-row w-full justify-evenly gap-4 my-4'>
                <div className='flex flex-col items-center justify-center'>
                    <Instagram className="w-8 h-8 text-[#E1306C]" />
                    <p>_ramuverma</p>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <Instagram className="w-8 h-8 text-[#E1306C]" />
                    <p>_ramuverma</p>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <Instagram className="w-8 h-8 text-[#E1306C]" />
                    <p>_ramuverma</p>
                </div>
            </div>

            <Link href='/' className='flex flex-row items-center justify-center w-full gap-4 p-4 bg-[#085C05] rounded-full my-5'> <WhatsAppIcon className="w-8 h-8 text-[#fff]" />
             Chat on Whatsapp
             </Link>
            
             <Loading />
        </div>  
        
    )
}
