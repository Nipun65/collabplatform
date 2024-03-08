import mongoose from "mongoose";
const { Schema } = mongoose;
const Post = new Schema({
  name: { type: String, required: false },
  role: { type: String, required: false },
  image: { type: String, required: false },
  mobileNumber: { type: Number, required: false },
  email: { type: String, required: false },
  work: { type: Array<string>, required: false },
  socialLinks: [
    {
      insta: { type: String, required: false },
      facebook: { type: String, required: false },
      tiktok: { type: String, required: false },
      twitter: { type: String, required: false },
      gmail: { type: String, required: false },
    },
  ],
});

export const PostModel = mongoose.model("Post", Post);
