import { Router } from "express";
import { createPost, getAllPost } from "../controller/post.controller.js";
import upload from "../middleware/multer.js";

const postRouter = Router();

postRouter.post('/', upload.single('image'), createPost);
postRouter.get('/', getAllPost);

export default postRouter;