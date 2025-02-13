import { NextResponse } from "next/server";

import Secret from "@/Modal/Secret";
import User from "@/Modal/User";
import connectDB from "@/lib/DB/Dbconnection";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


async function SignJWT(email, password) {
  const token = jwt.sign(
    { email: email, password: password },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
  console.log("jwt run");
  // Set the token in an HTTP-only cookie with `NextResponse`
  const response = NextResponse.json({
    message: "OTP verified successfully",
    status: 201,
  });
  response.cookies.set("tokenauth", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  return response;
}

export async function POST(req) {
  await connectDB();
  const { email, name, otp, password,enrollmentno} = await req.json();

  if (!email || !otp) {
    return NextResponse.json({
      error: "Email and OTP are required",
      status: 400,
    });
  }

  try {
    // Retrieve the OTP record
    const otpRecord = await Secret.findOne({ email }).exec();
    if (!otpRecord) {
      return NextResponse.json({
        error: "No OTP found for this email might be expired",
        status: 400,
      });
    }

    // Verify the OTP
    const isValid = await bcrypt.compare(otp, otpRecord.secret);

    if (isValid) {
      // Encrypt the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user record
      const newUser = new User({
        Profilename: name,
        email,
        password: hashedPassword,
        phoneNumber: null,
        enrollmentno:enrollmentno,
      });

      // Save the new user record to the database
      await newUser.save();
      const response = await SignJWT(email, hashedPassword);
      return response;

    } else {
      return NextResponse.json({ error: "Invalid OTP", status: 400 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error verifying OTP" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await connectDB();
    const { email, otp, password } = await request.json();

    if (!email || !otp) {
      return NextResponse.json({
        error: "Email and OTP are required",
        status: 400,
      });
    }

    // Retrieve the OTP record
    const otpRecord = await Secret.findOne({ email }).exec();
    if (!otpRecord) {
      return NextResponse.json({
        error: "No OTP found for this email might be expired",
        status: 400,
      });
    }

    // Verify the OTP
    const isValid = await bcrypt.compare(otp, otpRecord.secret);

    if (isValid) {
      // Encrypt the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Update the user password
      const updatedUser = await User.findOneAndUpdate(
        { email },
        { password: hashedPassword },
        { new: true }
      );

      if (!updatedUser) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      return NextResponse.json({
        data: updatedUser,
        message: "Password updated successfully",
        status: 201,
      });
    } else {
      return NextResponse.json({ error: "Invalid OTP", status: 400 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error updating password" }, { status: 500 });
  }
}