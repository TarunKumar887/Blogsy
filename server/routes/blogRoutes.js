import express from "express";
import { 
    addBlog, 
    editBlog,
    addComment, 
    deleteBlogById, 
    generateContent, 
    getAllBlogs, 
    getBlogById, 
    getBlogComments, 
    togglePublish, 
    toggleLike, 
    getLikedBlogs,
    getMyComments 
} from "../controllers/blogController.js";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";

const blogRouter = express.Router();

// --- Specific GET routes first ---
blogRouter.get('/all', getAllBlogs);
blogRouter.get('/liked', auth, getLikedBlogs);
blogRouter.get('/my-comments', auth, getMyComments);

// --- Dynamic GET route with a parameter comes AFTER specific routes ---
blogRouter.get('/:blogId', auth, getBlogById);

// --- POST/PUT routes for modification ---
blogRouter.post("/add", upload.single('image'), auth, addBlog);
blogRouter.put("/edit/:blogId", upload.single('image'), auth, editBlog); // New route to edit a blog
blogRouter.post('/delete', auth, deleteBlogById);
blogRouter.post("/toggle-publish", auth, togglePublish);
blogRouter.post("/add-comment", auth, addComment);
blogRouter.post("/comments", getBlogComments);
blogRouter.post("/generate", auth, generateContent);
blogRouter.post("/:blogId/like", auth, toggleLike);

export default blogRouter;