import { HeartStrokedIconBack } from "@/icons/icon";
function Bganim({opacity='opacity-80'}) {
  return (
     <div className={`fixed inset-0 -z-10 ${opacity} `}>
            <HeartStrokedIconBack className="heart-icon heart-1 " />
            <HeartStrokedIconBack className="heart-icon heart-2 " />
            <HeartStrokedIconBack className="heart-icon heart-3" />
            <HeartStrokedIconBack className="heart-icon heart-4" />
            <HeartStrokedIconBack className="heart-icon heart-5" />
            <HeartStrokedIconBack className="heart-icon heart-6" />
            <HeartStrokedIconBack className="heart-icon heart-7" />
            <HeartStrokedIconBack className="heart-icon heart-8" />
          </div>
  )
}

export default Bganim