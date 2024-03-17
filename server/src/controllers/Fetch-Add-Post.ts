import { PostModel } from "../models/Post";
import cloudinary from "../../cloudinary.config";

const uploadImage = async (data) => {
  const uploadResponse = await cloudinary.uploader.upload(data.data, {
    upload_preset: "collab_img",
  });
  return {
    url: uploadResponse?.secure_url,
    name: data?.name,
    public_id: uploadResponse?.public_id,
  };
};

const addPost = async (req, res, next) => {
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
    res.json({ result });
  });
};
const getPost = async (req, res, next) => {
  const data = await PostModel.find();
  res.json(data);
};

const getYourPost = async (req, res, next) => {
  const email = req?.query?.email;
  const data = await PostModel.find({ loggedInEmail: email });
  res.json(data);
};

const deletePost = async (req, res, next) => {
  const id = req?.body?._id;
  await PostModel.findOneAndDelete({ _id: id });
  res.status(200).send("Succeffuly Deleted");
};

const updatePost = async (req, res, next) => {
  const body = req?.body;
  const id = req?.body?._id;
  let imgId: string;
  const image = body?.photo?.data;
  if (image.length > 0) {
    imgId = body?.image?.public_id;
  }

  let newImg: any = {};
  if (imgId) {
    try {
      await cloudinary.uploader.destroy(imgId);
      try {
        newImg = await cloudinary.uploader.upload(image, {
          upload_preset: "collab_img",
        });
        body.image = {
          url: newImg?.secure_url,
          name: body?.photo?.name,
          public_id: newImg?.public_id,
        };
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  }

  try {
    await PostModel.findOneAndUpdate({ _id: id }, body);
    res.status(200).send("Succeffuly Updated");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error occurred while updating post");
  }
};
export { addPost, getPost, getYourPost, deletePost, updatePost };
