const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  postid: {
    type: Number,
    required: true,
    unique: true,
  },
  caption: {
    type: String,
    default: "",
  },
  filepath: {
    type: [String],
    required: true,
  },
  comments: {
    type: [[String, String]],
    default: [],
  },
  likes: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Post", PostSchema);
