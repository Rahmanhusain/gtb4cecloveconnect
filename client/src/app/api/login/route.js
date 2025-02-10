import connectDB from "@/lib/DB/Dbconnection";
import User from "@/Modal/User";
import { NextResponse } from "next/server";
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

  // Set the token in an HTTP-only cookie with `NextResponse`
  const response = NextResponse.json({data:{email:email},message: "Login successful",status:201 });
  response.cookies.set("tokenauth", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30, // 1 month
    path: "/",
  });

  return response;
}

export async function POST(request) {
  const data = await request.json();

  try {
    await connectDB();
    const { email, password } = data;
    const newUser = await User.findOne({ email }).exec();
    if (newUser) {
      const isMatch = await bcrypt.compare(password, newUser.password);
      return isMatch
        ? await SignJWT(email, newUser.password)
        : NextResponse.json({ message: "Password mismatch", status: 401 });
    } else {
      return NextResponse.json({ message: "User not found", status: 404 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Unknown error, possibly a MongoDB error",
      error,
      status: 500,
    });
  }
}

/* export async function PUT(request) {
  const data = await request.json();

  try {
    await connectDB();
    const { email, newEmail } = data;
    const user = await User.findOne({ email }).exec();
    if (user) {
      user.email = newEmail;
      await user.save();
      return NextResponse.json({
        message: "Email updated successfully",
        status: 201,
      });
    } else {
      return NextResponse.json({ message: "User not found", status: 404 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Unknown error, possibly a MongoDB error",
      error,
      status: 500,
    });
  }
} */
