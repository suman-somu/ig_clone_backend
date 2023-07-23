const User = require("../../models/userModel.js");
const { filterPublicProfile } = require("../../utils/filter.js");

const searchProfile = async (req, res) => {
  try {
    const username = req.query.searchAccountUsername;
    const account = filterPublicProfile(
      await User.findOne({ username: username })
    );
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    console.log("Account:", account);
    return res.status(200).send({
      status: "success",
      message: "Account accessed",
      data: account,
    });
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
module.exports = { searchProfile };
