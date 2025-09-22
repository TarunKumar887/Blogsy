import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import User from "../models/User.js";

// This function should ideally be in a userController.js or authController.js
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "A user with this email already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    
    await newUser.save();

    res.json({ success: true, message: "User registered successfully!" });
  } catch (error) {
    console.error("Registration Error:", error);
    res.json({ success: false, message: "Error registering user." });
  }
};

// A unified login function for both Admin and regular Users
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isAdmin = email === process.env.ADMIN_EMAIL;
    if (isAdmin) {
      const isPasswordCorrect = password === process.env.ADMIN_PASSWORD;
      if (isPasswordCorrect) {
        const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET);
        return res.json({ success: true, token, role: 'admin' });
      }
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET);
    res.json({ success: true, token, role: 'user' });

  } catch (error) {
    console.error("Login Error:", error);
    res.json({ success: false, message: "Error during login." });
  }
};

export const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.json({ success: true, blogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({}).populate("blog").sort({ createdAt: -1 });
    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getDashboard = async (req, res) => {
  try {
    const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
    const blogs = await Blog.countDocuments();
    const comments = await Comment.countDocuments();
    const drafts = await Blog.countDocuments({ isPublished: false });

    // The aggregation now safely handles blogs that don't have a 'likes' field
    const likesAggregation = await Blog.aggregate([
      {
        $group: {
          _id: null,
          totalLikes: { $sum: { $size: { $ifNull: [ "$likes", [] ] } } }
        }
      }
    ]);

    const totalLikes = likesAggregation.length > 0 ? likesAggregation[0].totalLikes : 0;

    const dashboardData = { blogs, comments, drafts, recentBlogs, totalLikes };
    res.json({ success: true, dashboardData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.body; 
    await Comment.findByIdAndDelete(id);
    res.json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const approveCommentById = async (req, res) => {
  try {
    const { id } = req.body; 
    await Comment.findByIdAndUpdate(id, { isApproved: true });
    res.json({ success: true, message: "Comment approved successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};