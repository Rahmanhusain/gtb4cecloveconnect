import { NextResponse } from "next/server";
import User from "@/Modal/User";
import connectDB from "@/lib/DB/Dbconnection";

export async function POST(request) {
    try {
        await connectDB();
        const { email, password, userid, selfuserid } = await request.json();
        let data;
        const user = await User.findOne({ email });
        if (user && user.password === password) {
            data = await User.findOne({ userid });
            if (!data) {
                return NextResponse.json({ error: "User not found" }, { status: 404 });
            }
            if (!data.matched.includes(selfuserid)) {
                return NextResponse.json({ error: "Self user ID not found in matched array" }, { status: 403 });
            }
        } else {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }

        return NextResponse.json({
            data: data,
            message: "Request getuser successfully",
            status: 201,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
