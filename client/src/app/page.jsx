import ImagePic from "@/components/ImagePic";
import Navbar from "@/components/Navbar";
import { BellIcon, Heart, HeartBroken } from "@/icons/icon";

export default function Home() {
  return (
    <>
      <Navbar />
      <ImagePic />
      <BellIcon className="w-8 h-8 text-green-500"/>

    </>
  );
}
