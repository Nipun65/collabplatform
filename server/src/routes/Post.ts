import express from "express";
import {
  addPost,
  getPost,
  getYourPost,
  deletePost,
  updatePost,
} from "../controllers/Fetch-Add-Post";

const router = express.Router();

router.post("/post", addPost);
router.get("/get-explore", getPost);
router.get("/get-your-post", getYourPost);
router.delete("/delete-post", deletePost);
router.put("/update-post", updatePost);

export default router;
