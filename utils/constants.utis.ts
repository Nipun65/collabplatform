import insta from "@/public/insta.svg";
import facebook from "@/public/facebook.svg";
import twitter from "@/public/twitter.svg";
import tiktok from "@/public/tiktok.svg";
import gmail from "@/public/gmail.svg";

const HEADERTABS = [
  {
    name: "Explore",
    path: "/explore",
  },
  {
    name: "Your Posts",
    path: "/your-posts",
  },
];

const SOCIALLINKS = [
  {
    social: "insta",
    logo: insta,
  },
  {
    social: "facebook",
    logo: facebook,
  },
  {
    social: "twitter",
    logo: twitter,
  },
  {
    social: "tiktok",
    logo: tiktok,
  },
  {
    social: "gmail",
    logo: gmail,
  },
];

export { HEADERTABS, SOCIALLINKS };
