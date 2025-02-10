import { space_mono } from "@/lib/fonts";
import { CrossIcon } from "@/icons/icon";
import React,{useState} from "react";


function WarningModal({ messege,setisWarnOpen }) {
  const [closeanim, setcloseanim] = useState(false);
  return (
    <section className="fixed top-0 left-0 right-0 bottom-0 bg-transparent flex items-center justify-center backdrop-blur-xl z-30">
      <div
        className={`shadow-xl rounded-xl flex flex-col w-[31.25rem] mx-3 gap-0 py-5 relative ${
          !closeanim ? "animate-popIn" : "animate-popOut"
        } ${closeanim && "scale-0"}`}
      >
        <span
          className="absolute top-2 right-2 cursor-pointer"
          onClick={() => {
            setcloseanim(!closeanim);
            setTimeout(() => {
              setisWarnOpen(false);
            }, 300);
          }}
        >
          <CrossIcon size={25} className="text-hover"/>
        </span>
        <div className="flex flex-col justify-center items-center py-2 gap-3 px-4">
          <svg
            className="w-8 h-8 text-gray-500"
            aria-hidden="true"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>

          <h3 className={`${space_mono.className} font-bold text-text text-center`}>{messege}</h3>
        </div>
        <div className="flex justify-center">
          {/* <button className="h-9 w-20 rounded-3xl bg-transparent outline-2 outline-white">close</button> */}
          
            <button className="h-8 w-14 text-center text-white  rounded-3xl bg-primary" onClick={() => {
            setcloseanim(!closeanim);
            setTimeout(() => {
              setisWarnOpen(false);
            }, 300);
          }}>
              Ok
            </button>
        
        </div>
      </div>
    </section>
  );
}

export default React.memo(WarningModal);
