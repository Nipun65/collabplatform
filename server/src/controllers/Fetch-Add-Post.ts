import { PostModel } from "../models/Post";

const addPost = (req, res, next) => {
  const postData = req?.body;
  console.log(postData);
  const post = new PostModel({
    name: postData?.name,
    description: postData?.description,
    headline: postData?.headline,
    profile: postData?.image,
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
  await PostModel.findOneAndUpdate({ _id: id }, body);
  res.status(200).send("Succeffuly Updated");
};
export { addPost, getPost, getYourPost, deletePost, updatePost };
