import express from "express";
import { addPost, getPost, getYourPost } from "../controllers/Fetch-Add-Post";

const router = express.Router();

router.post("/post", addPost);
router.get("/get-explore", getPost);
router.get("/get-your-post", getYourPost);

export default router;
