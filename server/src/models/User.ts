import mongoose from "mongoose";
const { Schema } = mongoose;
export const User = new Schema({
  name: String,
  profile: String,
  mobileNumber: Number,
  socialLinks: [
    {
      insta: String,
      meta: String,
      tiktok: String,
      linkedin: String,
    },
  ],
});
