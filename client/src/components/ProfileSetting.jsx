"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  EditIcon,
  EyeClose,
  EyeOpen,
  MiniloadIcon,
  PowerIcon,
} from "@/icons/icon";
import Image from "next/image";
import DPSelectorsModal from "./DPSelectorsModal";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { SetUser } from "@/lib/store/features/AuthSlice";
import { SetUserData } from "@/lib/store/features/UserSlice";
import { ResetUserData } from "@/lib/store/features/UserSlice";
import WarningModal from "./WarningModal";

export default function ProfileSetting() {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showPasswordSign, setShowPasswordSign] = useState(false);
  const [dpmodopen, setDpmodOpen] = useState(false);
  const [canSave, setCansave] = useState(false);
  const [isWarnOpen, setisWarnOpen] = useState(false);
  const messageref = useRef(null);
  const [isSaving, setisSaving] = useState(false);
  const [profilephotosrc, setprofilephotosrc] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s"
  );
  const user = useAppSelector((state) => state.Authenticator);
  const userdata = useAppSelector((state) => state.UserData);

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
        /* console.log(result.data, "verifytoekn run"); */
        dispatch(
          SetUser({
            email: result.data.email,
            name: result.data.Profilename,
            profilephotosrc: result.data.profilephotosrc,
          })
        );
        dispatch(SetUserData(result.data));
        setprofilephotosrc(result.data.profilephotosrc);
        setShow(true);
      } else {
        router.push("/login"); // Redirect to /login if token is invalid
      }
    };
    if (user.email === null) {
      verifyToken();
    } else {
      setprofilephotosrc(user.profilephotosrc);
      setShow(true);
    }
  }, []);

  useEffect(() => {
    /* console.log("i run"); */
    if (userdata) {
      const initialProfile = () => {
        return {
          Profilename: userdata.Profilename,
          Email: userdata.email,
          Password: userdata.Password,
          PhoneNumber: userdata.phoneNumber,
        };
      };
      setProfile(initialProfile());
      setEditingProfile(initialProfile());
    }
  }, [userdata]);

  const updateProfile = async () => {
    const res = await fetch("/api/updateprofile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        imagesrc: profilephotosrc,
        data: editingProfile,
      }),
    });

    const result = await res.json();
    if (result.status === 201) {
      setisSaving(false);
      setCansave(false);
      dispatch(
        SetUser({
          email: result.data.email,
          name: result.data.Profilename,
          profilephotosrc: result.data.profilephotosrc,
        })
      );
      dispatch(SetUserData(result.data));
    } else {
      messageref.current = "Something went wrong Please try again!";
      setisSaving(false);
      setisWarnOpen(true);
    }
  };

  const togglePasswordVisibilitySign = () => {
    setShowPasswordSign(!showPasswordSign);
  };

  const [profile, setProfile] = useState({
    Profilename: "",
    Email: "",
    Password: "",
    PhoneNumber: "",
  });
  const [editingProfile, setEditingProfile] = useState({
    Profilename: "",
    Email: "",
    Password: "",
    PhoneNumber: "",
  });
  const [isEditing, setIsEditing] = useState({
    Profilename: false,
    Email: false,
    Password: false,
    PhoneNumber: false,
  });

  const handleEdit = (field) => {
    setIsEditing({ ...isEditing, [field]: true });
  };

  const handleSave = (field) => {
    setProfile({ ...profile, [field]: editingProfile[field] });
    setIsEditing({ ...isEditing, [field]: false });
    setCansave(true);
  };

  const handleCancel = (field) => {
    setEditingProfile({ ...editingProfile, [field]: profile[field] });
    setIsEditing({ ...isEditing, [field]: false });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingProfile({ ...editingProfile, [name]: value });
  };

  if (!show) {
    return (
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-white flex flex-row gap-2 justify-center items-center py-4">
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
      </div>
    ); // Optionally return null to prevent flickering during verification
  }

  return (
    <>
      <div className="w-[47rem] mx-3 my-5 p-5 border border-gray-300 rounded-lg bg-white">
        <h1 className="text-2xl mb-8 font-bold font-serif ">Your Profile</h1>
        <div className="flex items-center gap-6 mb-8">
          <div
            className="relative flex flex-col items-center gap-3 cursor-pointer"
            onClick={() => {
              setDpmodOpen(true);
            }}
          >
            <Image
              src={profilephotosrc}
              width={70}
              height={70}
              className="rounded-full ring-4 ring-primary ring-offset-4"
              alt="profile"
            />
            <p className="text-text flex gap-1 items-center text-xs">
              <EditIcon
                className="text-text bottom-0 right-0"
                width="10"
                height="10"
              />
              Edit Photo
            </p>
          </div>
          <div>
            <h3 className="text-xl break-words">{profile.Profilename}</h3>
            <p className="text-gray-500 break-words">{profile.Email}</p>
          </div>
        </div>

        {Object.keys(profile).map((field) => (
          <div key={field} className="mb-2">
            <label className="block mb-1 font-bold capitalize">{field}</label>
            {isEditing[field] ? (
              <div className="flex mb-4 flex-col gap-2 md:flex-row">
                <div className="w-full relative">
                  <input
                    type={
                      field === "Password" && !showPasswordSign
                        ? "password"
                        : "text"
                    }
                    name={field}
                    value={editingProfile[field] || ""}
                    onChange={(e) => {
                      if (field === "PhoneNumber") {
                        if (
                          !/^\d*$/.test(e.target.value) ||
                          e.target.value.length > 10
                        ) {
                          return;
                        }
                      }
                      handleChange(e);
                    }}
                    className="flex-1 p-2 w-full border border-gray-300 rounded mr-2"
                  />
                  {field === "Password" &&
                    (!showPasswordSign ? (
                      <EyeClose
                        className={`absolute right-2 top-2 cursor-pointer `}
                        onClick={togglePasswordVisibilitySign}
                      />
                    ) : (
                      <EyeOpen
                        className={`absolute right-2 top-2 cursor-pointer `}
                        onClick={togglePasswordVisibilitySign}
                      />
                    ))}
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleSave(field)}
                    className="bg-purple-200 border border-purple-600 rounded px-4 py-2"
                  >
                    Okay
                  </button>
                  <button
                    onClick={() => handleCancel(field)}
                    className="border border-purple-600 rounded px-4 py-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center mb-4">
                <span>
                  {field === "Password" ? "********" : profile[field]}
                </span>
                <button
                  onClick={() => handleEdit(field)}
                  className="border border-purple-600 rounded px-4 py-2"
                >
                  Edit
                </button>
              </div>
            )}
            <hr className="my-2 border-gray-300" />
          </div>
        ))}
        <div className="flex justify-between mt-7">
          <button
            className="flex items-center px-5 gap-1 py-2   text-white bg-primary hover:bg-hover hover:shadow-xl rounded-lg"
            onClick={async () => {
              await fetch("/api/logout", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              });
              dispatch(
                SetUser({
                  email: null,
                  name: null,
                  usertype: null,
                  profilephotosrc: null,
                })
              );
              dispatch(ResetUserData());
              router.push("/");
            }}
          >
            <PowerIcon />
            Logout
          </button>

          <div className="flex gap-2">
            <button
              disabled={!canSave}
              className={`flex items-center px-5 gap-1 py-2 ${
                canSave ? "text-gray-100" : "text-text"
              } border ${
                canSave ? "bg-primary hover:bg-hover" : "bg-gray-300"
              }  border-gray-300  rounded-lg`}
              onClick={async () => {
                setisSaving(true);
                await updateProfile();
              }}
            >
              {isSaving ? (
                <MiniloadIcon className="w-4 h-4 text-primary animate-spin" />
              ) : (
                "Save"
              )}
            </button>
            {canSave && (
              <button
                className={`flex items-center px-5 gap-1 py-2 border border-red-600 rounded-lg`}
                onClick={() => {
                  setProfile(() => {
                    return {
                      Profilename: userdata.Profilename,
                      email: userdata.email,
                      Password: userdata.Password,
                      phoneNumber: userdata.phoneNumber,
                    };
                  });
                  setCansave(false);
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
      {dpmodopen && (
        <DPSelectorsModal
          setDpmodOpen={setDpmodOpen}
          setprofilephoto={setprofilephotosrc}
          setCansave={setCansave}
        />
      )}
      {isWarnOpen && (
        <WarningModal
          messege={messageref.current}
          setisWarnOpen={setisWarnOpen}
        />
      )}
    </>
  );
}
