"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  EditIcon,
  EyeClose,
  EyeOpen,
  Instagram,
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
        router.push("/login");
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
    if (userdata) {
      const initialProfile = () => {
        return {
          Profilename: userdata.Profilename,
          Email: userdata.email,
          Password: userdata.Password,
          PhoneNumber: userdata.phoneNumber,
          Gender: userdata.gender,
          keywords: {
            key1: userdata.keywords.key1,
            key2: userdata.keywords.key2,
            key3: userdata.keywords.key3,
          },
          bio: userdata.bio,
          Instagram: {
            Username: userdata.Instagram.Username,
            Link: userdata.Instagram.Link,
          },
          Snapchat: {
            Username: userdata.Snapchat.Username,
            Link: userdata.Snapchat.Link,
          },
          Facebook: {
            Username: userdata.Facebook.Username,
            Link: userdata.Facebook.Link,
          },
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
        password: userdata.password
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
    Gender: "",
    Password: "",
    PhoneNumber: "",
    keywords: {
      key1: "",
      key2: "",
      key3: "",
    },
    bio: "",
    Instagram: {
      Username: "",
      Link: "",
    },
    Snapchat: {
      Username: "",
      Link: "",
    },
    Facebook: {
      Username: "",
      Link: "",
    },
  });

  const [editingProfile, setEditingProfile] = useState({
    Profilename: "",
    Email: "",
    Gender: "",
    Password: "",
    PhoneNumber: "",
    keywords: {
      key1: "",
      key2: "",
      key3: "",
    },
    bio: "",
    Instagram: {
      Username: "",
      Link: "",
    },
    Snapchat: {
      Username: "",
      Link: "",
    },
    Facebook: {
      Username: "",
      Link: "",
    },
  });

  const [isEditing, setIsEditing] = useState({
    Profilename: false,
    Email: false,
    Gender: false,
    Password: false,
    PhoneNumber: false,
    keywords: false,
    bio: false,
    Instagram: false,
    Snapchat: false,
    Facebook: false,
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

  const handleChange = (e, platform = null) => {
    const { name, value } = e.target;

    if (platform) {
      setEditingProfile({
        ...editingProfile,
        [platform]: {
          ...editingProfile[platform],
          [name]: value,
        },
      });
    } else {
      setEditingProfile({ ...editingProfile, [name]: value });
    }
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
      <div className="w-[47rem] mx-3 my-5 p-5 border border-[#373738a3] rounded-lg">
        <h1 className="text-2xl mb-8 font-bold font-serif ">Your Profile</h1>
        <div className="flex flex-col items-center gap-6 mb-8">
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
              className="rounded-2xl h-[55vh] w-auto aspect-[39/49] object-cover brightness-75"
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
          <div className="w-full">
            <h3 className="text-xl break-words courgette text-center w-full">
              {profile.Profilename}
            </h3>
            <p className="text-gray-500 break-words courgette text-center w-full">
              {profile.Email}
            </p>
          </div>
        </div>

        {/* inputs start for editing */}
        <div className="mb-2">
          <label className="block mb-1 text-xl capitalize">Name</label>
          {isEditing["Profilename"] ? (
            <div className="flex mb-4 flex-col gap-2 md:flex-row">
              <input
                type="text"
                name="Profilename"
                value={editingProfile["Profilename"] || ""}
                onChange={handleChange}
                className="flex-1 p-2 w-full courgette bg-transparent text-sm border-2 border-[#717071bf] placeholder-gray-400 outline-none rounded-xl mr-2"
              />
              <div className="flex space-x-2">
                <button
                  onClick={() => handleSave("Profilename")}
                  className="bg-[#bd145b] rounded-lg px-4 py-2"
                >
                  Okay
                </button>
                <button
                  onClick={() => handleCancel("Profilename")}
                  className="border border-[#bd145b] rounded-lg px-4 py-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400 pl-2">{profile.Profilename}</span>
              <button
                onClick={() => handleEdit("Profilename")}
                className="border border-[#bd145b] rounded px-4 py-2"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        <div className="mb-2">
          <label className="block mb-1 text-xl capitalize">Gender</label>
          {isEditing["Gender"] ? (
            <div className="flex mb-4 flex-col gap-2 md:flex-row">
              <select
                name="Gender"
                value={editingProfile["Gender"] || ""}
                onChange={handleChange}
                className="flex-1 p-2 w-full bg-transparent text-sm border-2 border-[#717071bf] placeholder-gray-400 outline-none rounded-xl mr-2"
              >
                <option className="bg-black outline-none" value="">
                  Select Gender
                </option>
                <option className="bg-black outline-none" value="Male">
                  Male
                </option>
                <option className="bg-black outline-none" value="Female">
                  Female
                </option>
              </select>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleSave("Gender")}
                  className="bg-[#bd145b] rounded-lg px-4 py-2"
                >
                  Okay
                </button>
                <button
                  onClick={() => handleCancel("Gender")}
                  className="border border-[#bd145b] rounded-lg px-4 py-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400 pl-2">
                {profile.Gender || "Not specified"}
              </span>
              <button
                onClick={() => handleEdit("Gender")}
                className="border border-[#bd145b] rounded px-4 py-2"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        <div className="mb-2">
          <label className="block mb-1 text-xl capitalize">Email</label>
          {isEditing["Email"] ? (
            <div className="flex mb-4 flex-col gap-2 md:flex-row">
              <input
                type="text"
                name="Email"
                value={editingProfile["Email"] || ""}
                onChange={handleChange}
                className="flex-1 p-2 w-full courgette bg-transparent text-sm border-2 border-[#717071bf] placeholder-gray-400 outline-none rounded-xl mr-2"
              />
              <div className="flex space-x-2">
                <button
                  onClick={() => handleSave("Email")}
                  className="bg-[#bd145b] rounded-lg px-4 py-2"
                >
                  Okay
                </button>
                <button
                  onClick={() => handleCancel("Email")}
                  className="border border-[#bd145b] rounded-lg px-4 py-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400 pl-2">{profile.Email}</span>
              <button
                onClick={() => handleEdit("Email")}
                className="border border-[#bd145b] rounded px-4 py-2"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        <div className="mb-2">
          <label className="block mb-1 text-xl capitalize">Phone Number</label>
          {isEditing["PhoneNumber"] ? (
            <div className="flex mb-4 flex-col gap-2 md:flex-row">
              <input
                type="text"
                name="PhoneNumber"
                value={editingProfile["PhoneNumber"] || ""}
                onChange={(e) => {
                  if (
                    !/^[\d]*$/.test(e.target.value) ||
                    e.target.value.length > 10
                  )
                    return;
                  handleChange(e);
                }}
                className="flex-1 p-2 w-full courgette bg-transparent text-sm border-2 border-[#717071bf] placeholder-gray-400 outline-none rounded-xl mr-2"
              />
              <div className="flex space-x-2">
                <button
                  onClick={() => handleSave("PhoneNumber")}
                  className="bg-[#bd145b] rounded-lg px-4 py-2"
                >
                  Okay
                </button>
                <button
                  onClick={() => handleCancel("PhoneNumber")}
                  className="border border-[#bd145b] rounded-lg px-4 py-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400 pl-2">
                {profile.PhoneNumber || "Null"}
              </span>
              <button
                onClick={() => handleEdit("PhoneNumber")}
                className="border border-[#bd145b] rounded px-4 py-2"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        <div className="mb-2">
          <label className="block mb-1 text-xl capitalize">Password</label>
          {isEditing["Password"] ? (
            <div className="flex mb-4 flex-col gap-2 md:flex-row relative">
              <div className="relative w-full">
                <input
                  type={!showPasswordSign ? "password" : "text"}
                  name="Password"
                  value={editingProfile["Password"] || ""}
                  onChange={handleChange}
                  className="flex-1 p-2 w-full courgette bg-transparent text-sm border-2 border-[#717071bf] placeholder-gray-400 outline-none rounded-xl mr-2"
                />
                <span
                  className="absolute right-2 top-2 cursor-pointer text-[#928b92]"
                  onClick={togglePasswordVisibilitySign}
                >
                  {showPasswordSign ? <EyeOpen /> : <EyeClose />}
                </span>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleSave("Password")}
                  className="bg-[#bd145b] rounded-lg px-4 py-2"
                >
                  Okay
                </button>
                <button
                  onClick={() => handleCancel("Password")}
                  className="border border-[#bd145b] rounded-lg px-4 py-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center mb-4 relative">
              <span className="text-gray-400 pl-2">********</span>
              <button
                onClick={() => handleEdit("Password")}
                className="border border-[#bd145b] rounded px-4 py-2"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        {/* keywords start*/}
          <h1 className="text-2xl font-bold text-[#bd145b] mt-8 mb-4">
            Keywords
          </h1>

          <div className="mb-2">
            {isEditing["keywords"] ? (
              <div className="flex mb-4 flex-col gap-2 md:flex-row">
                <input
            type="text"
            name="key1"
            placeholder="Enter keyword 1"
            value={editingProfile.keywords.key1 || ""}
            onChange={(e) => handleChange(e, "keywords")}
            className="flex-1 p-2 courgette bg-transparent text-sm border-2 border-gray-500 placeholder-gray-400 outline-none rounded-xl"
                />
                <input
            type="text"
            name="key2"
            placeholder="Enter keyword 2"
            value={editingProfile.keywords.key2 || ""}
            onChange={(e) => handleChange(e, "keywords")}
            className="flex-1 p-2 courgette bg-transparent text-sm border-2 border-gray-500 placeholder-gray-400 outline-none rounded-xl"
                />
                <input
            type="text"
            name="key3"
            placeholder="Enter keyword 3"
            value={editingProfile.keywords.key3 || ""}
            onChange={(e) => handleChange(e, "keywords")}
            className="flex-1 p-2 courgette bg-transparent text-sm border-2 border-gray-500 placeholder-gray-400 outline-none rounded-xl"
                />
                <div className="flex space-x-2">
            <button
              onClick={() => handleSave("keywords")}
              className="bg-[#bd145b] rounded-lg px-4 py-2"
            >
              Save
            </button>
            <button
              onClick={() => handleCancel("keywords")}
              className="border border-[#bd145b] rounded-lg px-4 py-2"
            >
              Cancel
            </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center mb-4">
                <div className="flex flex-col courgette">
            <span className="text-gray-400 text-sm leading-3">
              {[profile.keywords.key1, profile.keywords.key2, profile.keywords.key3].filter(Boolean).join(", ") || "Keywords Not set"}
            </span>
                </div>
                <button
            onClick={() => handleEdit("keywords")}
            className="border border-[#bd145b] rounded px-4 py-2"
                >
            Edit
                </button>
              </div>
            )}
          </div>

          {/* bio start*/}

        <h1 className="text-2xl font-bold text-[#bd145b] mt-8 mb-4">Bio</h1>

        <div className="mb-2">
          {isEditing["bio"] ? (
            <div className="flex mb-4 flex-col gap-2 md:flex-row">
              <textarea
                type="text"
                name="bio"
                placeholder="Enter your bio in 250 characters"
                value={editingProfile["bio"] || ""}
                onChange={(e) => {
                  if (e.target.value.length > 250) return;
                  handleChange(e);
                }}
                className="flex-1 p-2 courgette bg-transparent h-52 text-sm border-2 border-gray-500 placeholder-gray-400 outline-none rounded-xl"
              />

              <div className="flex space-x-2">
                <button
                  onClick={() => handleSave("bio")}
                  className="bg-[#bd145b] rounded-lg px-4 py-2 h-fit"
                >
                  Save
                </button>
                <button
                  onClick={() => handleCancel("bio")}
                  className="border border-[#bd145b] rounded-lg px-4 py-2 h-fit"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center mb-4">
              <div className="flex flex-col courgette">
                <span className="text-gray-400 text-sm leading-3">
                  {profile.bio || "Bio not set"}
                </span>
              </div>
              <button
                onClick={() => handleEdit("bio")}
                className="border border-[#bd145b] rounded px-4 py-2"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        {/* bio end*/}

        {/* keywords end*/}

        <h1 className="text-2xl font-bold text-[#bd145b] mt-8 mb-4">
          Social Links
        </h1>
        {/* Instagram Edit */}
        <div className="mb-2">
          <label className="block mb-1 text-xl capitalize">Instagram</label>
          {isEditing["Instagram"] ? (
            <div className="flex mb-4 flex-col gap-2 md:flex-row">
              <input
                type="text"
                name="Username"
                placeholder="Username"
                value={editingProfile.Instagram.Username || ""}
                onChange={(e) => handleChange(e, "Instagram")}
                className="flex-1 p-2 courgette bg-transparent text-sm border-2 border-gray-500 placeholder-gray-400 outline-none rounded-xl"
              />
              <input
                type="text"
                name="Link"
                placeholder="Profile Link"
                value={editingProfile.Instagram.Link || ""}
                onChange={(e) => handleChange(e, "Instagram")}
                className="flex-1 p-2 courgette bg-transparent text-sm border-2 border-gray-500 placeholder-gray-400 outline-none rounded-xl"
              />
              <div className="flex space-x-2">
                <button
                  onClick={() => handleSave("Instagram")}
                  className="bg-[#bd145b] rounded-lg px-4 py-2"
                >
                  Save
                </button>
                <button
                  onClick={() => handleCancel("Instagram")}
                  className="border border-[#bd145b] rounded-lg px-4 py-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center mb-4">
              <div className="flex flex-col courgette">
                <span className="text-gray-400 text-sm leading-3">
                  {profile.Instagram.Username || "Not set"}
                </span>
                <span className="text-gray-500 text-xs">
                  {profile.Instagram.Link || "Not set"}
                </span>
              </div>
              <button
                onClick={() => handleEdit("Instagram")}
                className="border border-[#bd145b] rounded px-4 py-2"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        {/* Snapchat Edit */}
        <div className="mb-2">
          <label className="block mb-1 text-xl capitalize">Snapchat</label>
          {isEditing["Snapchat"] ? (
            <div className="flex mb-4 flex-col gap-2 md:flex-row">
              <input
                type="text"
                name="Username"
                placeholder="Username"
                value={editingProfile.Snapchat.Username || ""}
                onChange={(e) => handleChange(e, "Snapchat")}
                className="flex-1 p-2 courgette bg-transparent text-sm border-2 border-gray-500 placeholder-gray-400 outline-none rounded-xl"
              />
              <input
                type="text"
                name="Link"
                placeholder="Profile Link"
                value={editingProfile.Snapchat.Link || ""}
                onChange={(e) => handleChange(e, "Snapchat")}
                className="flex-1 p-2 courgette bg-transparent text-sm border-2 border-gray-500 placeholder-gray-400 outline-none rounded-xl"
              />
              <div className="flex space-x-2">
                <button
                  onClick={() => handleSave("Snapchat")}
                  className="bg-[#bd145b] rounded-lg px-4 py-2"
                >
                  Save
                </button>
                <button
                  onClick={() => handleCancel("Snapchat")}
                  className="border border-[#bd145b] rounded-lg px-4 py-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center mb-4">
              <div className="flex flex-col courgette">
                <span className="text-gray-400 text-sm leading-3">
                  {profile.Snapchat.Username || "Not set"}
                </span>
                <span className="text-gray-500 text-xs">
                  {profile.Snapchat.Link || "Not set"}
                </span>
              </div>
              <button
                onClick={() => handleEdit("Snapchat")}
                className="border border-[#bd145b] rounded px-4 py-2"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        {/* Facebook Edit */}
        <div className="mb-2">
          <label className="block mb-1 text-xl capitalize">Facebook</label>
          {isEditing["Facebook"] ? (
            <div className="flex mb-4 flex-col gap-2 md:flex-row">
              <input
                type="text"
                name="Username"
                placeholder="Username"
                value={editingProfile.Facebook.Username || ""}
                onChange={(e) => handleChange(e, "Facebook")}
                className="flex-1 p-2 courgette bg-transparent text-sm border-2 border-gray-500 placeholder-gray-400 outline-none rounded-xl"
              />
              <input
                type="text"
                name="Link"
                placeholder="Profile Link"
                value={editingProfile.Facebook.Link || ""}
                onChange={(e) => handleChange(e, "Facebook")}
                className="flex-1 p-2 courgette bg-transparent text-sm border-2 border-gray-500 placeholder-gray-400 outline-none rounded-xl"
              />
              <div className="flex space-x-2">
                <button
                  onClick={() => handleSave("Facebook")}
                  className="bg-[#bd145b] rounded-lg px-4 py-2"
                >
                  Save
                </button>
                <button
                  onClick={() => handleCancel("Facebook")}
                  className="border border-[#bd145b] rounded-lg px-4 py-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center mb-4">
              <div className="flex flex-col courgette">
                <span className="text-gray-400 text-sm leading-3">
                  {profile.Facebook.Username || "Not set"}
                </span>
                <span className="text-gray-500 text-xs">
                  {profile.Facebook.Link || "Not set"}
                </span>
              </div>
              <button
                onClick={() => handleEdit("Facebook")}
                className="border border-[#bd145b] rounded px-4 py-2"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        {/* inputs end for editing */}

        <div className="flex justify-between mt-7">
          <button
            className="flex items-center px-5 gap-1 py-2   text-white border border-[#ff006aa7] rounded-lg"
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
                canSave
                  ? "bg-[#ff006aa7] hover:bg-[#ff006ac3] cursor-pointer"
                  : "bg-[#f71b772f] cursor-not-allowed"
              } rounded-lg`}
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
                      Email: userdata.email,
                      Password: userdata.Password,
                      PhoneNumber: userdata.phoneNumber,
                      Gender: userdata.gender,
                      keywords: {
                        key1: userdata.keywords.key1,
                        key2: userdata.keywords.key2,
                        key3: userdata.keywords.key3,
                      },
                      bio: userdata.bio,
                      Instagram: {
                        Username: userdata.Instagram.Username,
                        Link: userdata.Instagram.Link,
                      },
                      Snapchat: {
                        Username: userdata.Snapchat.Username,
                        Link: userdata.Snapchat.Link,
                      },
                      Facebook: {
                        Username: userdata.Facebook.Username,
                        Link: userdata.Facebook.Link,
                      },
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
