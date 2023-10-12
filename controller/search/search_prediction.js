const User = require("../../models/userModel.js");
const { filterPublicProfileSearch } = require("../../utils/filter.js");

const searchPrediction = async (req, res) => {
  try {
    const { keywords, currentusername } = req.query;
    const regexPattern = new RegExp(`^.*${keywords}.*$`, "i");
    var accounts = await User.find({
      $and: [
        { username: regexPattern },
        { username: { $ne: currentusername } },
      ],
    });
    if (accounts.length === 0) {
      return res.status(200).send({
        status: "success",
        message: "No accounts found",
        data: [],
      });
    }

    accounts = filterPublicProfileSearch(accounts);
    return res.status(200).send({
      status: "success",
      message: "Accounts found",
      data: accounts,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send({
      status: "failure",
      message: "An error occurred",
      data: [],
    });
  }
};

module.exports = { searchPrediction };
