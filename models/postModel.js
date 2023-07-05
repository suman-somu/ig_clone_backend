const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  postid: {
    type: Number,
    required: true,
    unique: true,
  },
  caption: {
    type: String,
    default: null,
  },
  filepath: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Post", PostSchema);
