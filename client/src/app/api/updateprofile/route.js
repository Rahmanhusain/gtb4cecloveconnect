import { NextResponse } from "next/server";
import User from "@/Modal/User";
import connectDB from "@/lib/DB/Dbconnection";
import bcrypt from "bcrypt";

const setdata = async (imagesrc, updateData) => {
  let hashedPassword;
  if (updateData.Password && updateData.Password.trim() !== "") {
    hashedPassword = await bcrypt.hash(updateData.Password, 10);
  }
  const updatedFields = {
    Profilename: updateData.Profilename,
    email: updateData.Email,
    gender: updateData.Gender,
    password: updateData.Password,
    phoneNumber: updateData.PhoneNumber,
    keywords: {
      key1: updateData.keywords?.key1 || "",
      key2: updateData.keywords?.key2 || "",
      key3: updateData.keywords?.key3 || "",
    },
    bio: updateData.bio,
    Instagram: {
      Username: updateData.Instagram?.Username || "",
      Link: updateData.Instagram?.Link || "",
    },
    Snapchat: {
      Username: updateData.Snapchat?.Username || "",
      Link: updateData.Snapchat?.Link || "",
    },
    Facebook: {
      Username: updateData.Facebook?.Username || "",
      Link: updateData.Facebook?.Link || "",
    },
    profilephotosrc: imagesrc,
  };
  if (hashedPassword) {
    updatedFields.password = hashedPassword;
  }
  return updatedFields;
};

export async function POST(request) {
  try {
    await connectDB();
    const { email, imagesrc, data, password } = await request.json();
    let updatedUser;
    console.log(data)
    const user = await User.findOne({ email });
    if (user && user.password === password) {
      const updatedData = await setdata(imagesrc, data);
      updatedUser = await User.findOneAndUpdate({ email }, updatedData, {
        new: true,
      });
      if (!updatedUser) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
    } else {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    /* console.log(updatedUser) */

    return NextResponse.json({
      data: updatedUser,
      message: "Profile updated successfully",
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
