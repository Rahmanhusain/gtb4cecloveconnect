import { CrossIcon } from '@/icons/icon'
import React from 'react'
import Image from 'next/image'

export default function Tnc() {

    return (
        <div className='fixed w-full  py-20 top-0 left-0 bg-[#0008] backdrop-blur-sm '>
            <CrossIcon
                className="w-6 h-6 text-white fixed top-24 right-4 cursor-pointer z-20"
            />

                <h1 className="sm:text-6xl text-5xl px-10 cookie my-6 text-center">Terms and Conditions</h1>
                <Image src="/mim.png" width={200} height={300} alt="jyada bakchodi ki hume adat nhi hai meme" className='m-auto absolute top-24 rotate-[30deg] right-24 -z-10  rounded ' />
                <p className='w-3/5 text-justify m-auto courgette'>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus repudiandae voluptatum officia modi, eum harum officiis in dolorem consequatur adipisci, maxime distinctio reprehenderit iure itaque praesentium maiores accusamus molestiae. Molestiae doloribus nisi odit ab eligendi dolorem, facere autem dolores ut hic quidem eius eaque quisquam ex nam et magnam inventore! Molestiae, nisi corrupti perferendis enim aliquam temporibus eveniet ducimus quo ad odit error nihil excepturi? Labore, optio voluptatibus. Tempora delectus quo repellat ut enim, tempore molestiae fuga voluptate sed hic inventore officiis cum eum blanditiis dolore omnis, temporibus obcaecati velit quidem. Nemo, officia quia. Praesentium excepturi repudiandae explicabo sequi laudantium.
                </p>
                <h1 className="sm:text-6xl text-5xl px-10 cookie my-6 text-center">Privacy Policies</h1>
                <p className='w-3/5 text-justify m-auto courgette'>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus repudiandae voluptatum officia modi, eum harum officiis in dolorem consequatur adipisci, maxime distinctio reprehenderit iure itaque praesentium maiores accusamus molestiae. Molestiae doloribus nisi odit ab eligendi dolorem, facere autem dolores ut hic quidem eius eaque quisquam ex nam et magnam inventore! Molestiae, nisi corrupti perferendis enim aliquam temporibus eveniet ducimus quo ad odit error nihil excepturi? Labore, optio voluptatibus. Tempora delectus quo repellat ut enim, tempore molestiae fuga voluptate sed hic inventore officiis cum eum blanditiis dolore omnis, temporibus obcaecati velit quidem. Nemo, officia quia. Praesentium excepturi repudiandae explicabo sequi laudantium.
                </p>
        </div>
    )
}
