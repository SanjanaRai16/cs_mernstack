import express from 'express'
import { createPost, getAllPosts ,deletePost,getUserPosts} from '../controller/postController.js';
import authUser from '../middleware/authUser.js';
import upload from '../middleware/upload.js';


const postRouter = express.Router();

postRouter.post("/create", authUser, upload.array("media"), createPost);
postRouter.get("/all", getAllPosts);
postRouter.get("/myPosts", authUser, getUserPosts);
postRouter.delete("/delete/:id", authUser, deletePost);

export default postRouter;