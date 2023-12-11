import PostModel from "../models/postModel.js";

// Create a post
export const createPost = async (req, res) => {
  try {
    const { userId, image, desc, likes } = req.body;
    const newPost = new PostModel({ userId, image, desc, likes });
    const savedPost = await newPost.save();
    res.status(201).json({
      message: "post created successfully!",
      res: "success",
      data: savedPost,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, res: "error" });
  }
};

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a post by ID
export const getPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a post by ID
export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { userId, image, desc, likes } = req.body;
    const updatedPost = await PostModel.findByIdAndUpdate(
      postId,
      { userId, image, desc, likes },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a post by ID
export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const deletedPost = await PostModel.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
