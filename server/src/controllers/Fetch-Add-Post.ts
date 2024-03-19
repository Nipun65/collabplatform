import { PostModel } from "../models/Post";
import cloudinary from "../../cloudinary.config";
import { Request, Response, NextFunction } from "express";

const uploadImage = async (data: any) => {
  const uploadResponse = await cloudinary.uploader.upload(data.data, {
    folder: "collab",
  });
  return {
    url: uploadResponse?.secure_url,
    name: data?.name,
    public_id: uploadResponse?.public_id,
  };
};

const addPost = async (req: Request, res: Response, next: NextFunction) => {
  const postData = req?.body;
  const image = await uploadImage(postData?.photo);
  const post = new PostModel({
    name: postData?.name,
    description: postData?.description,
    headline: postData?.headline,
    image: image,
    email: postData?.email,
    socialLinks: postData?.socialLinks,
    loggedInEmail: postData?.loggedInEmail,
    mobileNumber: postData?.mobileNumber,
  });
  post.save().then((result) => {
    res.json(result);
  });
};

const getPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await PostModel.find();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.send("can not fetch data");
  }
};

const getYourPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req?.query?.email;
    const data = await PostModel.find({ loggedInEmail: email });
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  const id = req?.body?._id;
  const data = await PostModel.findOne({ _id: id });
  const imgId = data?.image?.public_id;

  try {
    if (imgId) {
      await cloudinary.uploader.destroy(imgId);
    }
    const result = await PostModel.findOneAndDelete({ _id: id });
    if (result) res.status(200).json({ message: "Succeffuly Deleted" });
  } catch (err) {
    console.log(err);
  }
};

const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  const body = req?.body;
  const id = req?.body?._id;
  let imgId: string = "";
  const image = body?.photo?.data;

  if (image.length > 0) {
    imgId = body?.image?.public_id;
  }

  let newImg: any = {};

  try {
    if (imgId.length > 0) {
      await cloudinary.uploader.destroy(imgId);

      newImg = await cloudinary.uploader.upload(image, {
        folder: "collab",
      });
      body.image = {
        url: newImg?.secure_url,
        name: body?.photo?.name,
        public_id: newImg?.public_id,
      };
    }
    const data = await PostModel.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error occurred while updating post");
  }
};
export { addPost, getPost, getYourPost, deletePost, updatePost };
