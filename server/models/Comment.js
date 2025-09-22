import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    blog: {type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: true},
    
    // We replace 'name' with a direct reference to the user who wrote the comment
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    
    content: { type: String, required: true},
    isApproved: { type: Boolean, default: false},
},{timestamps: true});

const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;