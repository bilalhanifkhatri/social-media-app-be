import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    image: String,
    desc: String,
    likes: [],
  },
  { timestamps: true }
);

const PostModel = mongoose.model("Posts", PostSchema);
export default PostModel;
