const connectDB = require("../config/db");
const User = require("../models/userModel.js");

// Create a new user instance
const newUser1 = new User({
  nameofuser: "user1",
  password: "12qw!@QW",
  birthday: new Date("1990-01-01"),
  mobile: 1234567890,
  username: "johndoe",
  email: "johndoe@example.com",
  bio: "Hello, I'm John!",
  gender: "male",
});

// Create another user
const newUser2 = new User({
  nameofuser: "user2",
  password: "12qw!@QW",
  birthday: new Date("1985-05-10"),
  mobile: 9876543210,
  username: "user2",
  email: "user2@example.com",
  bio: "Hi there, I'm Jane!",
  gender: "female",
});


connectDB();

newUser1
  .save()
  .then((user) => {
    console.log("User created:", user);
  })
  .catch((error) => {
    console.error("Error creating user:", error);
  });


newUser2
  .save()
  .then((user) => {
    console.log("User created:", user);
  })
  .catch((error) => {
    console.error("Error creating user:", error);
  });
