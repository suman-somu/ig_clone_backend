const User = require("../../models/userModel.js");
const connectDB = require("../../config/db.js");

connectDB();

const keywords = "Su";

const searchPrediction = async (keywords) => {
  try {
    const regexPattern = new RegExp(`^${keywords}`, "i");
    const accounts = await User.find({ nameofuser: regexPattern });
    return accounts;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

searchPrediction(keywords)
  .then((accounts) => {
    console.log("Matching Accounts:", accounts);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
