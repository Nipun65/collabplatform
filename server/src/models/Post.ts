import mongoose from "mongoose";
const { Schema } = mongoose;
const Post = new Schema({
  name: { type: String, required: true },
  loggedInEmail: { type: String, required: true },
  image: { type: String, required: false },
  mobileNumber: { type: Number, required: false },
  email: { type: String, required: true },
  headline: { type: String, required: true },
  description: { type: String, required: false },
  work: { type: Array<string>, required: true },
  socialLinks: [
    {
      insta: { type: String, required: false },
      facebook: { type: String, required: false },
      linkedin: { type: String, required: false },
      twitter: { type: String, required: false },
      gmail: { type: String, required: false },
    },
  ],
});

export const PostModel = mongoose.model("Post", Post);
