const User = require("../../models/userModel.js");
const connectDB = require("../../config/db.js");
const {filterPublicProfile} = require("../../utils/filter.js");

connectDB();

const username = "sam";

const searchProfile = async (username) => {
  try {
    const account = filterPublicProfile( await User.findOne({ username: username }));
    return account;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

searchProfile(username)
  .then((account) => {
    console.log("Matching Accounts:", account);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
