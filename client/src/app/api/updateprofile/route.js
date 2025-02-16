import { NextResponse } from "next/server";
import User from "@/Modal/User";
import connectDB from "@/lib/DB/Dbconnection";
import bcrypt from "bcrypt";
import { createClient } from "@supabase/supabase-js";

// ✅ Initialize Supabase
const supabase = createClient("https://iffadcitwirnptuabcbr.supabase.co", process.env.SUPABASE_SERVICE_KEY);

export async function POST(request) {
  try {
    await connectDB();
    const formData = await request.formData(); // Parse FormData
    const file = formData.get("file"); // Get the image file (could be null)
    const jsonData = JSON.parse(formData.get("json")); // Get the JSON data

    const { email, data, password, userid } = jsonData; // Extract JSON fields

    let updatedUser;
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.password !== password) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    let imageUrl = user.profilephotosrc; // Keep existing image URL if no new file

    if (file) {
      const fileType = file.type.split("/")[1]; // Extract file extension from MIME type
      console.log("Uploading file:", file.name); // Debugging

      // ✅ Step 1: Delete the old image from Supabase (if exists)
   /*    if (user.profilephotosrc) {
        const oldFilePath = user.profilephotosrc.split("/storage/v1/object/public/findyourdateuserimages/")[1];
        if (oldFilePath) {
          const { error: deleteError } = await supabase.storage.from("findyourdateuserimages").remove([oldFilePath]);
          if (deleteError) {
            console.error("Error deleting old image:", deleteError);
          } else {
            console.log("Old image deleted successfully");
          }
        }
      } */

      // ✅ Step 2: Upload new image with `userid` as the filename (NO EXTENSION)
      const arrayBuffer = await file.arrayBuffer(); // Convert file to buffer
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("findyourdateuserimages")
        .upload(`${userid}`, arrayBuffer, {
          contentType: file.type, // Maintain original file type
          upsert: true, // Overwrite if the file exists
        });

      if (uploadError) {
        console.error("Supabase Upload Error:", uploadError);
        return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
      }

      // ✅ Step 3: Generate public URL of the uploaded image (with cache-busting)
      imageUrl = `https://iffadcitwirnptuabcbr.supabase.co/storage/v1/object/public/findyourdateuserimages/${userid}?t=${Date.now()}`;
      console.log("New image URL:", imageUrl);
    }

    // ✅ Step 4: Prepare updated user data
    const updatedData = await setdata(imageUrl, data);

    // ✅ Step 5: Update the user in MongoDB
    updatedUser = await User.findOneAndUpdate({ email }, updatedData, { new: true });

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

// ✅ Function to Prepare Updated User Data
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
    profilephotosrc: imagesrc, // ✅ Store new or existing image URL
  };

  if (hashedPassword) {
    updatedFields.password = hashedPassword;
  }

  return updatedFields;
};
