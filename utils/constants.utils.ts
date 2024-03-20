import insta from "@/public/insta.svg";
import facebook from "@/public/facebook.svg";
import twitter from "@/public/twitter.svg";
import linkedin from "@/public/linkedin.svg";
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
    social: "linkedin",
    logo: linkedin,
  },
  {
    social: "gmail",
    logo: gmail,
  },
];

export { HEADERTABS, SOCIALLINKS };
