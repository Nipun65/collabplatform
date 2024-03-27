import express from "express";
// import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./src/routes/Post";
// import { validateToken } from "./src/auth";
import path from "path";
import cors from "cors";

const app = express();
const corsOptions = {
  origin: (origin, callback) => {
    console.log(origin);
    if (origin === "https://collabplatform.vercel.app") {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "50mb" }));

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const PORT = process.env.BACKEND_PORT;
const MONOGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONOGO_URI!)
  .then((result) => {
    console.log("connected");
  })
  .catch((error) => console.log(error));

// app.use("/api/auth", (req, res, next) => {
//   console.log(req.body);
//   const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;
//   const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;
//   const email = req.body.email;

//   if (!email) {
//     return res.status(400).json({ error: "Email is required" });
//   }

//   const accessToken = jwt.sign({ email }, ACCESS_SECRET, {
//     expiresIn: 3600,
//   });
//   const refreshToken = jwt.sign(req.body.email, REFRESH_SECRET);
//   res.json({ accessToken, refreshToken });
// });

app.use("/api", router);

app.listen(PORT, () => console.log(`server started ${PORT}`));
