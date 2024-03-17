import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./src/routes/Post";
import cors from "cors";
import path from "path";

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors({}));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const PORT = process.env.BACKEND_PORT;
const MONOGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONOGO_URI!)
  .then((result) => {
    console.log("connected");
  })
  .catch((error) => console.log(error));

app.use("/api", router);

app.listen(PORT, () => console.log(`server started ${PORT}`));
