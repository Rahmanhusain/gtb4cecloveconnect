import { NextResponse } from "next/server";
import connectDB from "@/lib/DB/Dbconnection";
import { sendOtpEmail } from "@/utils/SendOtpEmail";
import Secret from "@/Modal/Secret";
import User from "@/Modal/User";
import bcrypt from "bcrypt";

const generateOtpAndEncrypt = async () => {
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  const secret = await bcrypt.hash(otp, 10);
  return { otp, secret };
};

const addsecret = async (email, secret, otp) => {
  /* console.log('addsecret'); */
  try {
    const isuserexist = await User.findOne({ email }).exec();
    if (isuserexist) {
      throw new Error("User already exists");
    }
    const existingSecret = await Secret.findOne({ email }).exec();
    if (existingSecret) {
      await Secret.deleteOne({ email }).exec();
    }
    const newSecret = new Secret({ email: email, secret: secret });
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #0056b3;">Welcome to Compresso.io!</h2>
        <p>Dear User,</p>
        <p>Thank you for signing up! Your OTP to create your new account is: 
          <strong style="font-size: 1.2em; color: #d9534f;">${otp}</strong>.
        </p>
        <p>Please enter this OTP in the registration form to complete your account setup.</p>
        <p>Looking forward to having you with us!<br/>
          Team -
          <a href="https://compressoio.vercel.app/" style="color: #0056b3; text-decoration: none;">
            Compresso.io
          </a>
        </p>
      </div>
    `;
    await sendOtpEmail(email, htmlContent, "OTP to Create Account");
    await newSecret.save();

  } catch (error) {
    if (error.message === "User already exists") {
      throw new Error("User already exists");
    } else if (error.code === 11000) {
      throw new Error("Duplicate key error");
    } else {
      throw new Error(error.message || "Unknown error");
    }
  }
};

const addsecretforget = async (email, secret, otp) => {
  /*   console.log("addsecretforget"); */
  try {
    const isuserexist = await User.findOne({ email }).exec();
    if (!isuserexist) {
      throw new Error("User do not exists");
    }
    const existingSecret = await Secret.findOne({ email }).exec();
    if (existingSecret) {
      await Secret.deleteOne({ email }).exec();
    }
    const newSecret = new Secret({ email: email, secret: secret });
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #0056b3;">Your OTP to Reset Your Password</h2>
        <p>Dear User,</p>
        <p>Your OTP to reset your account password is: 
          <strong style="font-size: 1.2em; color: #d9534f;">${otp}</strong>.
        </p>
        <p>Thanks with ❤️,Team- 
          <a href="https://compressoio.vercel.app/" style="color: #0056b3; text-decoration: none;">
            Compresso.io
          </a>.
        </p>
      </div>
    `;

    await sendOtpEmail(email, htmlContent, "OTP to Reset Password");
    await newSecret.save();

  } catch (error) {
    if (error.message === "User do not exists") {
      throw new Error("User do not exists");
    } else {
      throw new Error(error.message || "Unknown error");
    }
  }
};

export async function POST(request) {
  await connectDB();
  const data = await request.json();

  try {
    const { email, isforget } = data;
    /* email && email!==null && email!=='' && await sendOtpEmail(email,otp) */
    const { otp, secret } = await generateOtpAndEncrypt();
    isforget
      ? await addsecretforget(email, secret, otp)
      : await addsecret(email, secret, otp);

    return NextResponse.json({
      message: "Email send successfully ",
      otp: 'loda lega bhai....',
      status: 201,
    });
  } catch (error) {
    console.log(error);
    if (
      error.message === "User already exists" ||
      error.message === "User do not exists"
    ) {
      return NextResponse.json({
        error: "User with this email already exists",
        status: 409,
      });
    } else if (error.message === "Duplicate key error") {
      return NextResponse.json({ error: "Duplicate key error", status: 409 });
    } else {
      return NextResponse.json({ error: "Failed to send OTP", status: 500 });
    }
  }
}
