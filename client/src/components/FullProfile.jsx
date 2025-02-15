"use client";
import React,{useState,useEffect} from "react";
import Image from "next/image";
import { BackIcon, Instagram, WhatsAppIcon } from "@/icons/icon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { SetUser } from "@/lib/store/features/AuthSlice";
import { SetUserData } from "@/lib/store/features/UserSlice";
import Loading from "@/components/Loading";
import Bganim from "./Bganim";

function FullProfile({ userid }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.Authenticator);
  const userdata = useAppSelector((state) => state.UserData);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      const res = await fetch("/api/verifytoken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();

      if (result.status === 201) {
        dispatch(
          SetUser({
            email: result.data.email,
            name: result.data.Profilename,
            profilephotosrc: result.data.profilephotosrc,
          })
        );
        if (
          !result.data.gender ||
          !result.data.keywords.key1 ||
          !result.data.keywords.key2 ||
          !result.data.keywords.key3 ||
          !result.data.Instagram.Username ||
          !result.data.bio
/*           !userdata.profilephotosrc.startsWith("data:image/")
 */        ) {
          router.push("/profile");
        } 
        dispatch(SetUserData(result.data));
      } else {
        router.push("/login");
      }
    };
    if (user.email === null) {
      verifyToken();
    } else {
    }
  }, []);

  useEffect(() => {
    const retireveuser = async () => {
      if (!userdata || !userdata.email) return; // Prevent API call with null data

      const res = await fetch("/api/getfullprofile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userdata.email,
          password: userdata.password,
          selfuserid: userdata.userid,
          userid: userid,
        }),
      });
      if (res.status === 403) {
        router.push("/match");
      }
      const result = await res.json();
      setProfile(result.data);
    };

    retireveuser();
  }, [userdata]); // Run when userdata updates

if (!profile) {
    return <Loading />;
}

return (
  <div className="mainImg m-auto h-full  max-w-96 flex flex-col items-start justify-center girlImage  transition-all duration-500 ease-in-out">
    
    <Bganim />
    <div className="mx-auto">
    <Link href="/match" className="px-2 py-1 bg-[#FF006Aa7] flex  gap-1 text-sm cookie w-fit mt-4 rounded-full"><BackIcon size={16} /> Go to Match</Link>

      <h1 className="cookie text-4xl mt-4 mb-2 italic">Profile</h1>
      <div className="rounded-2xl h-[55vh] w-auto aspect-[39/49] relative">
        <Image
          id="girlImg"
          src={profile.profilephotosrc}
          alt="girlimage"
          width={300}
          height={500}
          className="rounded-2xl w-full h-full object-cover brightness-75"
        />
      </div>
      <h2 className="cookie text-4xl mt-4 italic">{profile.Profilename}</h2>
      <div className="flex flex-row items-center flex-wrap justify-start gap-2 courgette mt-2">
        <h3 className="bg-[#FF006Aa7] text-xs  py-1.5 px-4 rounded-full tracking-widest">
           {profile.keywords.key1}
        </h3>

        <h3 className="bg-[#FF006Aa7] text-xs  py-1.5 px-4 rounded-full tracking-widest">
          {profile.keywords.key2}
        </h3>

        <h3 className="bg-[#FF006Aa7] text-xs  py-1.5 px-4 rounded-full tracking-widest">
          {profile.keywords.key3}
        </h3>
      </div>
    </div>
    <h2 className="cookie text-4xl mt-8 mb-2 italic">Bio</h2>
    <p className="courgette w-full  text-xs text-gray-300 tracking-wider">
      {profile.bio}
    </p>
    <h2 className="cookie text-4xl mt-8 mb-2 italic">Social Links</h2>
    <div className="flex flex-row w-full justify-evenly flex-wrap gap-4 my-4">
      {profile.Instagram.Username && (
        <div className="flex flex-col items-center justify-center">
          <Instagram className="w-8 h-8 text-[#E1306C]" />
          <p className="courgette">{profile.Instagram.Username}</p>
        </div>
      )}
      {profile.Snapchat.Username && (
        <div className="flex flex-col items-center justify-center">
          <Instagram className="w-8 h-8 text-[#E1306C]" />
          <p className="courgette">{profile.Snapchat.Username}</p>
        </div>
      )}
      {profile.Facebook.Username && (
        <div className="flex flex-col items-center justify-center">
          <Instagram className="w-8 h-8 text-[#E1306C]" />
          <p className="courgette">{profile.Facebook.Username}</p>
        </div>
      )}
    </div>

    <Link
      href="/"
      className="flex flex-row items-center justify-center w-full gap-4 p-4 bg-[#085C05] rounded-full my-5"
    >
      {" "}
      <WhatsAppIcon className="w-8 h-8 text-[#fff]" />
      Chat on Whatsapp
    </Link>

    {/*   <Loading /> */}
  </div>
);
}

export default FullProfile;
