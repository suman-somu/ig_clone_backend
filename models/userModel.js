const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  nameofuser: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    validate: {
      validator: function (value) {
        // Regular expression to validate password contains atleast 1 small character, 1 capital character, 1 number, 1 special character
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return passwordRegex.test(value);
      },
      message: (props) =>
        "Password must contain at least 1 lowercase, 1 uppercase, 1 number, and 1 special character, and be at least 6 characters long!",
    },
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
    // Regular expression to validate email
    validate: {
      validator: function (value) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(value);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
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
    default: [],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
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
