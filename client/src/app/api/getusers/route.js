import { NextResponse } from "next/server";
import User from "@/Modal/User";
import connectDB from "@/lib/DB/Dbconnection";


export async function POST(request) {
  try {
    await connectDB();
    const { email, password } = await request.json();
    let data;
    const user = await User.findOne({ email });
    if (user && user.password === password) {
      data = await User.find({
        gender: user.gender === "Male" ? "Female" : "Male",
        userid: { $nin: user.matchrequest },
        Profilename: { $ne: null },
       /*  profilephotosrc: { $ne: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s" }, */
        "keywords.key1": { $ne: "" },
        "keywords.key2": { $ne: "" },
        "keywords.key3": { $ne: "" },
        bio: { $ne: "" },
        "Instagram.Username": { $ne: "" },
        "Instagram.Link": { $ne: "" },
      }).select("-phoneNumber -Instagram -Snapchat -Facebook -matched -matchrequest -enrollmentno");

      if (!data) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
    } else {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

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


export async function PUT(request) {
  try {
    await connectDB();
    const { email, password, matched } = await request.json();
    const user = await User.findOne({ email });
    if (user && user.password === password) {
      const users = await User.find({ userid: { $in: matched } });
      if (!users) {
        return NextResponse.json({ error: "Users not found" }, { status: 404 });
      }

      return NextResponse.json({
        data: users.reverse(),
        message: "Users fetched successfully",
        status: 200,
      });
    } else {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}