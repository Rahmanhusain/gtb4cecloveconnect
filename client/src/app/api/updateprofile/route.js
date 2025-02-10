import { NextResponse } from "next/server";
import User from "@/Modal/User";
import connectDB from "@/lib/DB/Dbconnection";
import bcrypt from 'bcrypt';

const setdata = async (imagesrc, updateData) => {
    let hashedPassword;
    if (updateData.Password && updateData.Password.trim() !== "") {
        hashedPassword = await bcrypt.hash(updateData.Password, 10);
    }
    const updatedFields = {
        Profilename: updateData.Profilename,
        email: updateData.Email,
        phoneNumber: updateData.PhoneNumber,
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
        const { email,imagesrc, data } = await request.json();
        const updatedData = await setdata(imagesrc, data);
        const updatedUser = await User.findOneAndUpdate({ email }, updatedData, { new: true });
        if (!updatedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        /* console.log(updatedUser) */

        return NextResponse.json({ data:updatedUser,message: "Profile updated successfully" ,status:201});
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

