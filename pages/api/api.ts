import axios from "axios";

const API_URL = process.env.BACKEND_URL;

const fetchPost = () => {
  try {
    const posts = axios.get(`${API_URL}/get-explore`);
    return posts;
  } catch (error) {
    console.error(error);
  }
};

const addPost = (post: any) => {
  const TEMP = {
    email: "ffsad@gmail.com",
    mobileNumber: 35253253252,
    image: "fsafsafasfsaf",
    work: ["fsafsf", "fsffsdf"],
    socialLinks: [
      {
        insta: "sfafasfas",
        meta: "fasfsaf",
        tiktok: "dsgs",
        linkedin: "safsafsa",
      },
    ],
  };
  try {
    axios
      .post(`${API_URL}/add-post`, post)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
  }
};

export default { fetchPost, addPost };
