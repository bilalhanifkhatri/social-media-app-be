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
    res.status(200).json({
      message: "posts get successfully!",
      res: "success",
      data: posts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, res: "error" });
  }
};

// Get a post by ID
export const getPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found", res: "error" });
    }
    res.status(200).json({
      message: "post get successfully!",
      res: "success",
      data: post,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, res: "error" });
  }
};

// Update a post by ID
export const updatePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { userId, image, desc, likes } = req.body;
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found", res: "error" });
    }
    if (post?.userId === userId) {
      const updatedPost = await PostModel.findByIdAndUpdate(
        postId,
        { image, desc, likes },
        { new: true }
      );
      res.status(202).json({
        message: "Updated successfully",
        res: "success",
        data: updatedPost,
      });
    } else {
      res.status(403).json({
        message: "You don't have access to update this post",
        res: "error",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, res: "error" });
  }
};

// Delete a post by ID
export const deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { userId } = req.body;
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found", res: "error" });
    }
    if (post.userId === userId) {
      await post.deleteOne();
      res
        .status(200)
        .json({ message: "Post deleted successfully", res: "success" });
    } else {
      return res
        .status(403)
        .json({ message: "You don't have access", res: "error" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, res: "error" });
  }
};

// likes/dislikes a post by ID
export const likePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { userId } = req.body;
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found", res: "error" });
    }
    if (!post.likes.includes(userId)) {
      const updatedPost = await post.updateOne(
        { $push: { likes: userId } },
        { new: true }
      );
      res.status(200).json({
        message: "Post Liked successfully",
        res: "success",
        data: updatedPost,
      });
    } else {
      const updatedPost = await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json({
        message: "Post disliked successfully",
        res: "success",
        data: updatedPost,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, res: "error" });
  }
};
