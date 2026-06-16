import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId()
  },
  author: {
    type: String,
    required: true
  },
  authorId: {
    type: String,
    default: null
  },
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  },
  likedBy: {
    type: [String],
    default: []
  },
  dislikedBy: {
    type: [String],
    default: []
  }
}, { _id: true });

const commentSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId()
  },
  author: {
    type: String,
    required: true
  },
  authorId: {
    type: String,
    default: null
  },
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  replies: {
    type: [replySchema],
    default: []
  },
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  },
  likedBy: {
    type: [String],
    default: []
  },
  dislikedBy: {
    type: [String],
    default: []
  }
}, { _id: true });

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Blog title is required"],
    trim: true
  },
  slug:{
     type : String,
     unique:true
  },
  slugUrdu: {
     type: String,
     unique: true
     },
  titleUrdu: { type: String, required: true },
  author: {
    type: String,
    required: [true, "Author name is required"],
    trim: true
  },
  content: {
    type: String,
    required: [true, "Blog content is required"]
  },
  contentUrdu: { type: String, required: true },
  image: {
    type: String, // Cloudinary secure_url
    required: [true, "Blog image is required"]
  },
  likeCount: {
    type: Number,
    default: 0
  },
  dislikeCount: {
    type: Number,
    default: 0
  },
  likedBy: {
    type: [String], // Array of user IDs to prevent duplicate likes
    default: []
  },
  dislikedBy: {
    type: [String], // Array of user IDs to prevent duplicate dislikes
    default: []
  },
  comments: {
    type: [commentSchema],
    default: []
  },
  commentCount: {
    type: Number,
    default: 0,
    index: true // Index for faster sorting
  },
  viewCount: {
    type: Number,
    default: 0,
    index: true // Index for faster sorting
  },
  shareCount: {
    type: Number,
    default: 0,
    index: true // Index for faster sorting
  },
  SubCategory: {
    type: [String],
    default: []
  }
}, { 
  timestamps: true 
});

const Blog = mongoose.models.detailblogs || mongoose.model("detailblogs", blogSchema);
export default Blog;