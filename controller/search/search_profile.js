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

const followProfile = async (req, res) => {
  try {
    const searchAccountUsername = req.query.searchAccountUsername;
    const username = req.query.username;
    const accessToken = req.query.accessToken;

    const account = await User.findOne({ username: username });
    if(!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    if(accessToken !== account.accessToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const searchAccount = await User.findOne({ username: searchAccountUsername });


    if(!searchAccount) {
      return res.status(404).json({ message: "Account to follow not found" });
    }


    if(!account.following.includes(searchAccount.username)) {
      account.following.push(searchAccount.username);
    }
    else{
      return res.status(400).json({ message: "Account already followed" });
    }

    //add account to searchaccount
    if(!searchAccount.followers.includes(account.username)) {
      searchAccount.followers.push(account.username);
    }
    else{
      return res.status(400).json({ message: "Account already followed" });
    }


    await account.save();
    await searchAccount.save();
    
    
    res.status(200).send({
      status: "success",
      message: "Account followed",
    });
  } catch (error) {
    res.status(500).send({
      status: "failure",
      message: error.message,
    });
  }
};

const unfollowProfile = async (req, res) => {
  try {
    const searchAccountUsername = req.query.searchAccountUsername;
    const username = req.query.username;
    const accessToken = req.query.accessToken;

    const account = await User.findOne({ username: username });
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    if (accessToken !== account.accessToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const searchAccount = await User.findOne({ username: searchAccountUsername });

    if (!searchAccount) {
      return res.status(404).json({ message: "Account to unfollow not found" });
    }

    if (account.following.includes(searchAccount.username)) {
      // Remove account from following
      account.following.pull(searchAccount.username);
    } else {
      return res.status(400).json({ message: "Account not followed" });
    }

    // Remove account from searchAccount's followers
    if (searchAccount.followers.includes(account.username)) {
      searchAccount.followers.pull(account.username);
    } else {
      return res.status(400).json({ message: "Account not followed" });
    }

    // Save both updated account objects
    await account.save();
    await searchAccount.save();

    res.status(200).send({
      status: "success",
      message: "Account unfollowed",
    });
  } catch (error) {
    res.status(500).send({
      status: "failure",
      message: error.message,
    });
  }
};

module.exports = { searchProfile, followProfile, unfollowProfile };
