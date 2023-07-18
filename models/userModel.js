const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  nameofuser: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true,
    min: 6,
  },
  birthday: {
    type: Date,
    required: true,
  },
  mobile: {
    type: Number,
  },
  username: {
    type: String,
    required: true,
    min: 3,
    max: 15,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    min: 4,
    max: 50,
    unique: true,
  },
  bio: {
    type: String,
    max: 50,
    default: "",
  },
  profilePicture: {
    type: String,
    default: "YOUR_DEFAULT_AVATAR_URL",
  },
  followers: {
    type: [Number],
    default: [],
  },
  following: {
    type: [Number],
    default: [],
  },
  posts: {
    type: [Number],
    deafult: [],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    required: true,
    default: "user",
  },
  gender: {
    type: String,
    enum: ["male", "female", "others"],
  },
  
  accessToken: {
    type: String,
  },
});

module.exports = mongoose.model("User", UserSchema);
