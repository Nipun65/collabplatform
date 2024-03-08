import { PostModel } from "../models/Post";

const addPost = (req, res, next) => {
  console.log(req?.body);
  const postData = req?.body;
  const post = new PostModel({
    profile: postData?.image,
    mobileNumber: postData?.mobileNumber,
    email: postData?.email,
    work: postData?.work,
    socialLinks: postData?.socialLinks,
    role: postData?.role,
    name: postData?.name,
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
  console.log(req?.query);
  const email = req?.query?.email;
  const data = await PostModel.find({ email });
  res.json(data);
};
export { addPost, getPost, getYourPost };
