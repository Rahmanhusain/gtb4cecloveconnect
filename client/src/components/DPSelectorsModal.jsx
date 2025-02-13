'use client'
import { CrossIcon } from "@/icons/icon";
import React,{ useState, Suspense,lazy} from "react";
const Cropper = lazy(() => import("./Crop.jsx"));

function DPSelectorsModal({ setDpmodOpen ,setprofilephoto,setCansave}) {
  const [closeanim, setcloseanim] = useState(false);
  
  return (
    <section className="fixed overflow-y-auto top-20 left-0 right-0 bottom-0 bg-transparent flex justify-center backdrop-blur-md">
      <div
        className={`bg-[#141415] bg-light-night-black rounded-xl flex flex-col w-[31.25rem] h-fit my-7 mx-3 gap-5 py-5 relative ${
          !closeanim ? "animate-popIn" : "animate-popOut"
        } ${closeanim && "scale-0"}`}
      >
        <span
          className="absolute top-2 right-2 cursor-pointer"
          onClick={() => {
            setcloseanim(!closeanim);
            setTimeout(() => {
              setDpmodOpen(false);
            }, 300);
          }}
        >
          <CrossIcon size={25} />
        </span>

        <Suspense
          fallback={
            <div className="flex flex-row gap-2 justify-center items-center py-4">
              <div className="w-4 h-4 rounded-full bg-[#ff006aa7] animate-bounce"></div>
              <div className="w-4 h-4 rounded-full bg-[#ff006aa7] animate-bounce [animation-delay:-.3s]"></div>
              <div className="w-4 h-4 rounded-full bg-[#ff006aa7] animate-bounce [animation-delay:-.5s]"></div>
            </div>
          }
        >
          <Cropper setprofilephoto={setprofilephoto} setDpmodOpen={setDpmodOpen} setCansave={setCansave}/>
        </Suspense>

        {/* <div className="flex justify-center gap-2">
          <CustomLink href="/register">
            <button className="h-9 w-20 rounded-3xl bg-blue-600" onClick={getImage}>Ok</button>
          </CustomLink>
        </div> */}
      </div>
    </section>
  );
}

export default React.memo(DPSelectorsModal);
