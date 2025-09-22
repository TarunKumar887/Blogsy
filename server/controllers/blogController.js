import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import main from "../configs/gemini.js";

export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
    const imageFile = req.file;

    if (!title || !description || !category || !imageFile) {
      return res.json({ success: false, message: "Missing required fields" });
    }
    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs"
    });

    const optimizedImageURL = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" }
      ]
    });

    const image = optimizedImageURL;
    await Blog.create({ title, subTitle, description, category, image, isPublished });
    res.json({ success: true, message: "Blog added successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const editBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
    const imageFile = req.file;

    const updatedData = {
      title,
      subTitle,
      description,
      category,
      isPublished,
    };

    if (imageFile) {
      const fileBuffer = fs.readFileSync(imageFile.path);
      const response = await imagekit.upload({
        file: fileBuffer,
        fileName: imageFile.originalname,
        folder: "/blogs",
      });

      const optimizedImageURL = imagekit.url({
        path: response.filePath,
        transformation: [{ quality: "auto" }, { format: "webp" }, { width: "1280" }]
      });
      updatedData.image = optimizedImageURL;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(blogId, updatedData);

    if (!updatedBlog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    res.json({ success: true, message: "Blog updated successfully" });
  } catch (error) {
    console.error("Edit Blog Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    res.json({ success: true, blogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getBlogById = async (req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.json({ success: false, message: "Blog not found" });
        }

        res.json({ success: true, blog });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const deleteBlogById = async (req, res) => {
    try {
        const { id } = req.body;
        await Blog.findByIdAndDelete(id);
        await Comment.deleteMany({ blog: id });
        res.json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const togglePublish = async (req, res) => {
    try {
        const { id } = req.body;
        const blog = await Blog.findById(id);
        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.json({ success: true, message: "Blog status updated" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const addComment = async (req, res) => {
    try {
        const { blog, content } = req.body;
        const author = req.user.id; 

        if (!content) {
            return res.json({ success: false, message: "Comment content is required." });
        }

        await Comment.create({ blog, author, content });
        res.json({ success: true, message: "Comment added successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const getBlogComments = async (req, res) => {
    try {
        const { blogId } = req.body;
        const comments = await Comment.find({ blog: blogId, isApproved: true }).sort({ createdAt: -1 });
        res.json({ success: true, comments });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const generateContent = async (req, res)=>{
  try {
    const {prompt} = req.body;
    const content = await main(prompt + ' Generate a blog content for this topic in simple text format')
    res.json({success: true, content})
  } catch (error) {
    res.json({success: false, message: error.message})
  }
}

export const toggleLike = async (req, res) => {
  try {
    if (req.user.role === 'admin') {
        return res.status(403).json({ success: false, message: "Admins cannot like posts." });
    }
    const { blogId } = req.params;
    const userId = req.user.id; 
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    const likedIndex = blog.likes.indexOf(userId);
    if (likedIndex > -1) {
      blog.likes.splice(likedIndex, 1);
    } else {
      blog.likes.push(userId);
    }
    await blog.save();
    res.json({ success: true, message: "Like status updated", likes: blog.likes });
  } catch (error) {
    console.error("Toggle Like Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getLikedBlogs = async (req, res) => {
  try {
    const userId = req.user.id;
    const likedBlogs = await Blog.find({ likes: userId }).sort({ createdAt: -1 });
    res.json({ success: true, blogs: likedBlogs });
  } catch (error) {
    console.error("Get Liked Blogs Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getMyComments = async (req, res) => {
  try {
    const userId = req.user.id;
    const comments = await Comment.find({ author: userId })
      .populate('blog', 'title')
      .sort({ createdAt: -1 });
    res.json({ success: true, comments });
  } catch (error) {
    console.error("Get My Comments Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};