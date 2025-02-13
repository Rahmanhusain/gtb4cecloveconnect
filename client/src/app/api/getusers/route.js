import { NextResponse } from "next/server";
import User from "@/Modal/User";
import connectDB from "@/lib/DB/Dbconnection";


export async function POST(request) {
  try {
    await connectDB();
    const { email,password } = await request.json();
    let data;
    const user = await User.findOne({ email });
    if (user && user.password === password) {
        data = await User.find({});
      if (!data) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
    } else {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    /* console.log(updatedUser) */

    return NextResponse.json({
      data: data,
      message: "request getuser successfully",
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function GET() {
    return NextResponse.json({ message: "Hello, world!" }, { status: 200 });
}