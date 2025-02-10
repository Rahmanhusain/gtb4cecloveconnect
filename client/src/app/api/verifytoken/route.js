import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/Modal/User";
import connectDB from "@/lib/DB/Dbconnection"; // Import the Message schema


export async function POST(request) {
  try {
    const token = request.cookies.get("tokenauth")?.value;
    await connectDB();
    if (!token || token === undefined) {
      console.log("no token");
      return NextResponse.json({ messege: "Token not found", status: 406 });
    }
    const { email, password } = jwt.verify(token, process.env.JWT_SECRET);
    /* console.log(email, password, 'token'); */
    
    const newUser = await User.findOne({ email }).exec();
    /* console.log(newUser.password, password, 'token'); */
    if (newUser) {
      const isMatch=password===newUser.password?true:false
      /* console.log(isMatch, 'ismatch'); */
      return isMatch
        ? NextResponse.json({ data: newUser, messege: "JWT verified", status: 201 })
        : NextResponse.json({ messege: "Password mismatch", status: 401 });
    } else {
      return NextResponse.json({ messege: "user not found", status: 404 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      messege: "unknown error may its the mongodb error",
      error,
      status: 500,
    });
  }
}
