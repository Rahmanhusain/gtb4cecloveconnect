// utils.js

import nodemailer from 'nodemailer';

export const sendOtpEmail=async(email, content,subject)=>{
  // Create a transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // or another email service
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password
    },
  });

  // Define the email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Compresso.io- ${subject}`,
    text: content, // Fallback text version
    html: content, // HTML content for better styling
  };

  // Send email
  try {
    let info = await transporter.sendMail(mailOptions);
    if (!info.accepted.length) {
      throw new Error('Email not accepted');
    }
    return info;
  } catch (error) {
    throw new Error(`Failed to send OTP email: ${error.message}`);
  }
}
