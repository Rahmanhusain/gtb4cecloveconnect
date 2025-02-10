import { NextResponse } from 'next/server';
import connectDB from '@/lib/DB/Dbconnection';
import User from '@/Modal/User';


const addUser = async (username,email,password,profilephotosrc)=>{
 /*  console.log(username,email,password,profilephotosrc.substring(0, 10)) */
  try {
    /* const Userexist=User.findOne({username}).exec(); */
    const newUser = new User({username:username,email:email,password:password,profilephotosrc:profilephotosrc});
    await newUser.save();
  } catch (error) {
    if (error.code === 11000) {
      throw new Error('Duplicate key error');
    } else {
      throw new Error(error.message || 'Unknown error');
    }
  }
 
}



export async function POST(request) {
  await connectDB();
    const data = await request.json();
    
  
    try {
      const {username,email,password,profilephotosrc} = data;
      await addUser(username,email,password,profilephotosrc)
     
      return NextResponse.json({ message: 'Email send successfully ',status:201});
    } catch (error) {
      console.log(error)
      if (error.message === 'Duplicate key error') {
        return NextResponse.json({ error: 'User already exists', status: 409 });
      } else {
        return NextResponse.json({ error: 'Failed to create user', status: 500 });
      }
    }
    
  }